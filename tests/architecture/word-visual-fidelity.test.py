#!/usr/bin/env python3
"""Fixture-specific OOXML checks, not an Office renderer or native export test."""

import importlib.util
import argparse
import struct
import tempfile
import unittest
import xml.etree.ElementTree as ET
import zipfile
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BUILDER = ROOT / "tests/fixtures/word-native-visuals/build_fixture.py"
NS = {
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "pic": "http://schemas.openxmlformats.org/drawingml/2006/picture",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
    "ct": "http://schemas.openxmlformats.org/package/2006/content-types",
}


def attr(node, name):
    prefix, local = name.split(":")
    return None if node is None else node.get(f"{{{NS[prefix]}}}{local}")


def text_of(node):
    return "".join(node.itertext()) if node is not None else ""


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def enabled(node):
    return node is not None and attr(node, "w:val") in (None, "1", "true", "on")


def check_fixture(target, expected=None):
    """Compare the reopened fixture against its fixed synthetic acceptance data."""
    expected = expected or {
        "revision_id": "approved-r1",
        "status": "approved",
        "cells": [["Label", "Value"], ["Synthetic test row", "Test only"]],
        "media": "word/media/image1.png",
        "pixels": b"\x00\xff\x00\x00\x00\x00\xff",
        "figure_caption": "Figure 1. Synthetic red and blue pixels",
    }
    with zipfile.ZipFile(target) as package:
        require(package.testzip() is None, "ZIP integrity")
        doc = ET.fromstring(package.read("word/document.xml"))
        custom = ET.fromstring(package.read("docProps/custom.xml"))
        custom_ns = {
            "cp": "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
            "vt": "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
        }
        props = {node.get("name"): text_of(node) for node in custom.findall("cp:property", custom_ns)}
        require(props.get("RequestedRevision") == expected["revision_id"], "revision identity differs")
        require(props.get("ContentStatus") == expected["status"], "revision status differs")
        # The fixed fixture permits only header bold as a direct run property,
        # and style selection as a paragraph property. Do not silently accept a
        # direct override merely because the expected named style still exists.
        for properties, allowed in (("w:rPr", {"b"}), ("w:pPr", {"pStyle", "jc"})):
            for node in doc.findall(f".//{properties}", NS):
                require(all(child.tag in {f"{{{NS['w']}}}{name}" for name in allowed} for child in node),
                        "unexpected direct formatting")
        body = doc.find("w:body", NS)
        tables = body.findall("w:tbl", NS)
        require(len(tables) == 1, "native table missing")
        cells = [[text_of(cell) for cell in row.findall("w:tc", NS)]
                 for row in tables[0].findall("w:tr", NS)]
        require(cells == expected["cells"],
                "table cells differ")
        borders = tables[0].find("w:tblPr/w:tblBorders", NS)
        require(borders is not None, "table borders missing")
        for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
            border = borders.find(f"w:{edge}", NS)
            require(border is not None and attr(border, "w:val") == "single"
                    and attr(border, "w:sz") == "8", "table borders differ")
        for cell in tables[0].findall("w:tr", NS)[0].findall("w:tc", NS):
            require(attr(cell.find("w:tcPr/w:shd", NS), "w:fill") == "D9EAF7",
                    "header shading differs")
            require(enabled(cell.find("w:p/w:r/w:rPr/w:b", NS)),
                    "header bold missing")

        children = list(body)
        require(len(children) == 9, "body element count differs")
        require(text_of(children[0]) == "Lead paragraph for the synthetic table.", "table lead")
        require(children[1] is tables[0], "table placement differs")
        require(text_of(children[2]) == "Table 1. Synthetic values", "table caption missing")
        require(text_of(children[3]) == "Source: synthetic fixture data.", "table source missing")
        require(text_of(children[4]) == "Lead paragraph for the synthetic figure.", "figure lead")
        inline = children[5].find("w:r/w:drawing/wp:inline", NS)
        require(inline is not None, "inline image or placement missing")
        require(inline.find("wp:extent", NS).attrib == {"cx": "914400", "cy": "457200"},
                "image dimensions differ")
        picture = inline.find("a:graphic/a:graphicData/pic:pic", NS)
        require(picture is not None, "picture structure missing")
        blip = picture.find("pic:blipFill/a:blip", NS)
        image_id = attr(blip, "r:embed")
        require(image_id is not None, "embedded relationship missing")
        rels = ET.fromstring(package.read("word/_rels/document.xml.rels"))
        by_id = {rel.get("Id"): rel for rel in rels}
        image_rel = by_id.get(image_id)
        require(image_rel is not None and image_rel.get("Type") == NS["r"] + "/image",
                "image relationship missing or wrong type")
        require(image_rel.get("TargetMode", "Internal") == "Internal", "external image")
        expected_target = expected["media"].removeprefix("word/")
        require(image_rel.get("Target") == expected_target, "image target differs")
        require(expected["media"] in package.namelist(), "embedded media missing")
        png = package.read(expected["media"])
        require(png[:8] == b"\x89PNG\r\n\x1a\n", "invalid PNG")
        chunks, offset = {}, 8
        while offset < len(png):
            length = struct.unpack(">I", png[offset:offset + 4])[0]
            kind = png[offset + 4:offset + 8]
            data = png[offset + 8:offset + 8 + length]
            crc = struct.unpack(">I", png[offset + 8 + length:offset + 12 + length])[0]
            require(zlib.crc32(kind + data) == crc, "PNG CRC differs")
            chunks[kind] = data
            offset += length + 12
        require(chunks[b"IHDR"] == struct.pack(">IIBBBBB", 2, 1, 8, 2, 0, 0, 0), "PNG dimensions")
        require(zlib.decompress(chunks[b"IDAT"]) == expected["pixels"],
                "image pixels differ")
        require(b"IEND" in chunks, "PNG end missing")
        require(text_of(children[6]) == expected["figure_caption"], "figure caption missing")
        require(text_of(children[7]) == "Source: original synthetic fixture; not project evidence.",
                "figure source missing")
        for index in (2, 6):
            require(attr(children[index].find("w:pPr/w:pStyle", NS), "w:val") == "Caption",
                    "caption style differs")
            require(attr(children[index].find("w:pPr/w:jc", NS), "w:val") == "center",
                    "caption alignment differs")
        for index in (0, 4):
            require(attr(children[index].find("w:pPr/w:pStyle", NS), "w:val") == "SyntheticBody",
                    "body style differs")
        styles = ET.fromstring(package.read("word/styles.xml"))
        body_style = styles.find("w:style[@w:styleId='SyntheticBody']", NS)
        require(attr(body_style.find("w:rPr/w:rFonts", NS), "w:ascii") == "Arial", "body font differs")
        require(attr(body_style.find("w:rPr/w:sz", NS), "w:val") == "22", "body size differs")
        require(attr(body_style.find("w:pPr/w:spacing", NS), "w:line") == "240", "spacing differs")
        caption_style = styles.find("w:style[@w:styleId='Caption']", NS)
        require(attr(caption_style.find("w:basedOn", NS), "w:val") == "SyntheticBody", "caption inheritance")
        require(enabled(caption_style.find("w:rPr/w:i", NS)), "caption italic missing")
        margins = body.find("w:sectPr/w:pgMar", NS)
        require(all(attr(margins, f"w:{edge}") == "1440" for edge in ("top", "bottom", "left", "right")),
                "page margins differ")
        require(any(rel.get("Type") == NS["r"] + "/styles" and rel.get("Target") == "styles.xml"
                    for rel in rels), "styles relationship missing")
        root_rels = ET.fromstring(package.read("_rels/.rels"))
        require(any(rel.get("Type") == NS["r"] + "/officeDocument" and rel.get("Target") == "word/document.xml"
                    for rel in root_rels), "root document relationship missing")
        types = ET.fromstring(package.read("[Content_Types].xml"))
        require(types.find("ct:Default[@Extension='rels']", NS).get("ContentType") ==
                "application/vnd.openxmlformats-package.relationships+xml", "relationship content type")


class WordVisualFidelityTest(unittest.TestCase):
    def setUp(self):
        spec = importlib.util.spec_from_file_location("word_visual_fixture", BUILDER)
        builder = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(builder)
        self.builder = builder
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.target = Path(temp.name) / "visual-fidelity.docx"
        builder.write_fixture(self.target)

    def mutate(self, member, transform):
        with zipfile.ZipFile(self.target) as package:
            parts = {name: package.read(name) for name in package.namelist()}
        parts[member] = transform(parts[member])
        with zipfile.ZipFile(self.target, "w") as package:
            for name, data in parts.items():
                package.writestr(name, data)

    def test_valid_native_fixture(self):
        check_fixture(self.target)

    def test_two_requested_revisions_export_and_verify_independently(self):
        approved = self.builder.revision_case("approved-r1")
        working = self.builder.revision_case("working-r2")
        approved_path = self.target.with_name("approved.docx")
        working_path = self.target.with_name("working.docx")
        self.builder.export_and_verify(approved["revision_id"], approved_path, check_fixture)
        self.builder.export_and_verify(working["revision_id"], working_path, check_fixture)
        self.assertEqual(approved["status"], "approved")
        self.assertEqual(working["status"], "working/unapproved")
        self.assertNotEqual(approved["cells"], working["cells"])
        self.assertNotEqual(approved["pixels"], working["pixels"])

    def test_approved_substitution_for_working_request_is_rejected(self):
        working = self.builder.revision_case("working-r2")
        with self.assertRaisesRegex(AssertionError, "revision identity differs"):
            check_fixture(self.target, working)

    def test_working_substitution_for_approved_request_is_rejected(self):
        working_path = self.target.with_name("working-substitute.docx")
        self.builder.write_fixture(working_path, self.builder.revision_case("working-r2"))
        with self.assertRaisesRegex(AssertionError, "revision identity differs"):
            check_fixture(working_path, self.builder.revision_case("approved-r1"))

    def test_status_tamper_is_rejected_independently(self):
        self.mutate("docProps/custom.xml", lambda b: b.replace(b">approved<", b">working/unapproved<"))
        with self.assertRaisesRegex(AssertionError, "revision status differs"):
            check_fixture(self.target)

    def test_reproducible_fixture(self):
        second = self.target.with_name("second.docx")
        self.builder.write_fixture(second)
        self.assertEqual(self.target.read_bytes(), second.read_bytes())

    def test_missing_media(self):
        with zipfile.ZipFile(self.target) as package:
            parts = {name: package.read(name) for name in package.namelist()
                     if name != "word/media/image1.png"}
        with zipfile.ZipFile(self.target, "w") as package:
            for name, data in parts.items():
                package.writestr(name, data)
        with self.assertRaisesRegex(AssertionError, "embedded media missing"):
            check_fixture(self.target)

    def test_external_image_rejected(self):
        self.mutate("word/_rels/document.xml.rels",
                    lambda b: b.replace(b'Target="media/image1.png"',
                                        b'Target="media/image1.png" TargetMode="External"'))
        with self.assertRaisesRegex(AssertionError, "external image"):
            check_fixture(self.target)

    def test_wrong_table_cell(self):
        self.mutate("word/document.xml", lambda b: b.replace(b"Test only", b"Invented value"))
        with self.assertRaisesRegex(AssertionError, "table cells differ"):
            check_fixture(self.target)

    def test_missing_table(self):
        def remove(data):
            doc = ET.fromstring(data)
            body = doc.find("w:body", NS)
            body.remove(body.find("w:tbl", NS))
            return ET.tostring(doc)
        self.mutate("word/document.xml", remove)
        with self.assertRaisesRegex(AssertionError, "native table missing"):
            check_fixture(self.target)

    def test_wrong_image_relationship(self):
        self.mutate("word/_rels/document.xml.rels", lambda b: b.replace(b'rIdImage', b'rIdOther'))
        with self.assertRaisesRegex(AssertionError, "image relationship missing"):
            check_fixture(self.target)

    def test_wrong_image_payload(self):
        self.mutate("word/media/image1.png", lambda b: b"not a PNG")
        with self.assertRaisesRegex(AssertionError, "invalid PNG"):
            check_fixture(self.target)

    def test_missing_caption(self):
        self.mutate("word/document.xml", lambda b: b.replace(b"Figure 1. Synthetic red and blue pixels", b""))
        with self.assertRaisesRegex(AssertionError, "figure caption missing"):
            check_fixture(self.target)

    def test_wrong_placement_with_same_counts(self):
        def swap(data):
            doc = ET.fromstring(data)
            body = doc.find("w:body", NS)
            drawing = body[5]
            body.remove(drawing)
            body.insert(4, drawing)
            return ET.tostring(doc)
        self.mutate("word/document.xml", swap)
        with self.assertRaisesRegex(AssertionError, "figure lead"):
            check_fixture(self.target)

    def test_wrong_header_formatting(self):
        self.mutate("word/document.xml", lambda b: b.replace(b"D9EAF7", b"FFFFFF"))
        with self.assertRaisesRegex(AssertionError, "header shading differs"):
            check_fixture(self.target)

    def test_missing_table_borders(self):
        self.mutate("word/document.xml", lambda b: b.replace(
            b'<w:tblBorders><w:top w:val="single" w:sz="8"/><w:left w:val="single" w:sz="8"/><w:bottom w:val="single" w:sz="8"/><w:right w:val="single" w:sz="8"/><w:insideH w:val="single" w:sz="8"/><w:insideV w:val="single" w:sz="8"/></w:tblBorders>', b''))
        with self.assertRaisesRegex(AssertionError, "table borders missing"):
            check_fixture(self.target)

    def test_wrong_table_border(self):
        self.mutate("word/document.xml", lambda b: b.replace(
            b'<w:top w:val="single" w:sz="8"/>', b'<w:top w:val="nil" w:sz="8"/>'))
        with self.assertRaisesRegex(AssertionError, "table borders differ"):
            check_fixture(self.target)

    def test_caption_must_be_centered_when_template_requires_it(self):
        self.mutate("word/document.xml", lambda b: b.replace(
            b'<w:jc w:val="center"/>', b'<w:jc w:val="left"/>', 1))
        with self.assertRaisesRegex(AssertionError, "caption alignment differs"):
            check_fixture(self.target)

    def test_figure_caption_alignment_is_checked_independently(self):
        def change_second_alignment(data):
            first = data.find(b'<w:jc w:val="center"/>')
            second = data.find(b'<w:jc w:val="center"/>', first + 1)
            return data[:second] + data[second:].replace(
                b'<w:jc w:val="center"/>', b'<w:jc w:val="right"/>', 1)
        self.mutate("word/document.xml", change_second_alignment)
        with self.assertRaisesRegex(AssertionError, "caption alignment differs"):
            check_fixture(self.target)

    def test_missing_figure_caption_alignment_is_rejected(self):
        def remove_second_alignment(data):
            first = data.find(b'<w:jc w:val="center"/>')
            second = data.find(b'<w:jc w:val="center"/>', first + 1)
            marker = b'<w:jc w:val="center"/>'
            return data[:second] + data[second + len(marker):]
        self.mutate("word/document.xml", remove_second_alignment)
        with self.assertRaisesRegex(AssertionError, "caption alignment differs"):
            check_fixture(self.target)

    def test_swapped_media_between_revisions_is_rejected(self):
        working = self.builder.revision_case("working-r2")
        working_path = self.target.with_name("working-media-swap.docx")
        self.builder.write_fixture(working_path, working)
        with zipfile.ZipFile(self.target) as approved_package:
            approved_png = approved_package.read("word/media/image1.png")
        with zipfile.ZipFile(working_path) as package:
            parts = {name: package.read(name) for name in package.namelist()}
        parts[working["media"]] = approved_png
        with zipfile.ZipFile(working_path, "w") as package:
            for name, data in parts.items():
                package.writestr(name, data)
        with self.assertRaisesRegex(AssertionError, "image pixels differ"):
            check_fixture(working_path, working)

    def test_swapped_table_cells_between_revisions_are_rejected(self):
        working = self.builder.revision_case("working-r2")
        working_path = self.target.with_name("working-cells-swap.docx")
        self.builder.write_fixture(working_path, working)
        self.target.unlink()
        approved = self.builder.revision_case("approved-r1")
        approved_path = self.target
        self.builder.write_fixture(approved_path, approved)
        with zipfile.ZipFile(approved_path) as package:
            approved_doc = ET.fromstring(package.read("word/document.xml"))
        approved_table = approved_doc.find("w:body/w:tbl", NS)

        def swap_table(data):
            doc = ET.fromstring(data)
            body = doc.find("w:body", NS)
            table = body.find("w:tbl", NS)
            index = list(body).index(table)
            body.remove(table)
            body.insert(index, approved_table)
            return ET.tostring(doc)

        self.target = working_path
        self.mutate("word/document.xml", swap_table)
        with self.assertRaisesRegex(AssertionError, "table cells differ"):
            check_fixture(working_path, working)

    def test_template_font_changed(self):
        self.mutate("word/styles.xml", lambda b: b.replace(b"Arial", b"Calibri"))
        with self.assertRaisesRegex(AssertionError, "body font differs"):
            check_fixture(self.target)

    def test_direct_font_override(self):
        self.mutate("word/document.xml", lambda b: b.replace(
            b'<w:r><w:t>Lead paragraph for the synthetic table.',
            b'<w:r><w:rPr><w:rFonts w:ascii="Calibri"/><w:sz w:val="44"/></w:rPr>'
            b'<w:t>Lead paragraph for the synthetic table.'))
        with self.assertRaisesRegex(AssertionError, "unexpected direct formatting"):
            check_fixture(self.target)

    def test_disabled_bold(self):
        self.mutate("word/document.xml", lambda b: b.replace(b'<w:b/>', b'<w:b w:val="0"/>'))
        with self.assertRaisesRegex(AssertionError, "header bold missing"):
            check_fixture(self.target)

    def test_disabled_italic(self):
        self.mutate("word/styles.xml", lambda b: b.replace(b'<w:i/>', b'<w:i w:val="false"/>'))
        with self.assertRaisesRegex(AssertionError, "caption italic missing"):
            check_fixture(self.target)

    def test_missing_attribution(self):
        self.mutate("word/document.xml", lambda b: b.replace(b"Source: synthetic fixture data.", b""))
        with self.assertRaisesRegex(AssertionError, "table source missing"):
            check_fixture(self.target)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument("--check", type=Path)
    parser.add_argument("--revision")
    args, remaining = parser.parse_known_args()
    if args.check:
        spec = importlib.util.spec_from_file_location("word_visual_fixture", BUILDER)
        builder = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(builder)
        check_fixture(args.check, builder.revision_case(args.revision or "approved-r1"))
        print(f"verified {args.check} ({args.revision or 'approved-r1'})")
    else:
        unittest.main(argv=[__file__, *remaining], verbosity=2)
