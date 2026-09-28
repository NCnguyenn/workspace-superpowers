"""Build a reproducible synthetic DOCX; no real project evidence or export engine."""

import argparse
from pathlib import Path
import struct
import zipfile
import zlib
from copy import deepcopy
from xml.sax.saxutils import escape


REVISION_CASES = {
    "approved-r1": {
        "revision_id": "approved-r1",
        "status": "approved",
        "cells": [["Label", "Value"], ["Synthetic test row", "Test only"]],
        "media": "word/media/image1.png",
        "pixels": b"\x00\xff\x00\x00\x00\x00\xff",
        "figure_caption": "Figure 1. Synthetic red and blue pixels",
    },
    "working-r2": {
        "revision_id": "working-r2",
        "status": "working/unapproved",
        "cells": [["Label", "Value"], ["Working draft row", "Unapproved value"]],
        "media": "word/media/image2.png",
        "pixels": b"\x00\x00\xff\x00\xff\xff\x00",
        "figure_caption": "Figure 1. Working green and yellow pixels",
    },
}


def revision_case(revision_id):
    """Return an isolated expected revision record; unknown IDs never fall back."""
    if revision_id not in REVISION_CASES:
        raise ValueError(f"unknown requested revision: {revision_id}")
    return deepcopy(REVISION_CASES[revision_id])


def png_fixture(pixels=None):
    """Two RGB test pixels using the standard PNG chunk format."""
    pixels = pixels or REVISION_CASES["approved-r1"]["pixels"]
    def chunk(kind, data):
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data))
    return (b"\x89PNG\r\n\x1a\n"
            + chunk(b"IHDR", struct.pack(">IIBBBBB", 2, 1, 8, 2, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(pixels))
            + chunk(b"IEND", b""))


def write_fixture(target: Path, revision=None) -> None:
    revision = revision_case("approved-r1") if revision is None else deepcopy(revision)
    row_label, row_value = map(escape, revision["cells"][1])
    figure_caption = escape(revision["figure_caption"])
    media_target = revision["media"].removeprefix("word/")
    target.parent.mkdir(parents=True, exist_ok=True)
    document = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>
<w:p><w:pPr><w:pStyle w:val="SyntheticBody"/></w:pPr><w:r><w:t>Lead paragraph for the synthetic table.</w:t></w:r></w:p>
<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="8"/><w:left w:val="single" w:sz="8"/><w:bottom w:val="single" w:sz="8"/><w:right w:val="single" w:sz="8"/><w:insideH w:val="single" w:sz="8"/><w:insideV w:val="single" w:sz="8"/></w:tblBorders></w:tblPr><w:tblGrid><w:gridCol w:w="4320"/><w:gridCol w:w="4320"/></w:tblGrid><w:tr><w:trPr><w:tblHeader/></w:trPr><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/><w:shd w:val="clear" w:fill="D9EAF7"/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Label</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/><w:shd w:val="clear" w:fill="D9EAF7"/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Value</w:t></w:r></w:p></w:tc></w:tr><w:tr><w:tc><w:p><w:r><w:t>{row_label}</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t>{row_value}</w:t></w:r></w:p></w:tc></w:tr></w:tbl>
<w:p><w:pPr><w:pStyle w:val="Caption"/><w:jc w:val="center"/></w:pPr><w:r><w:t>Table 1. Synthetic values</w:t></w:r></w:p>
<w:p><w:r><w:t>Source: synthetic fixture data.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="SyntheticBody"/></w:pPr><w:r><w:t>Lead paragraph for the synthetic figure.</w:t></w:r></w:p>
<w:p><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="914400" cy="457200"/><wp:docPr id="1" name="Synthetic figure" descr="Two synthetic test pixels; not project evidence"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="0" name="image1.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdImage"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="914400" cy="457200"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Caption"/><w:jc w:val="center"/></w:pPr><w:r><w:t>{figure_caption}</w:t></w:r></w:p>
<w:p><w:r><w:t>Source: original synthetic fixture; not project evidence.</w:t></w:r></w:p>
<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>'''
    rels = f'''<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdImage" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="{media_target}"/><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'''
    root_rels = '''<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdDocument" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rIdCustom" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties" Target="docProps/custom.xml"/></Relationships>'''
    styles = '''<?xml version="1.0" encoding="UTF-8"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="SyntheticBody"><w:name w:val="Synthetic body"/><w:pPr><w:spacing w:after="120" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Caption"><w:name w:val="Caption"/><w:basedOn w:val="SyntheticBody"/><w:rPr><w:i/></w:rPr></w:style></w:styles>'''
    custom = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/custom-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><property fmtid="{{D5CDD505-2E9C-101B-9397-08002B2CF9AE}}" pid="2" name="RequestedRevision"><vt:lpwstr>{escape(revision["revision_id"])}</vt:lpwstr></property><property fmtid="{{D5CDD505-2E9C-101B-9397-08002B2CF9AE}}" pid="3" name="ContentStatus"><vt:lpwstr>{escape(revision["status"])}</vt:lpwstr></property></Properties>'''
    content_types = '''<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/custom.xml" ContentType="application/vnd.openxmlformats-officedocument.custom-properties+xml"/></Types>'''
    parts = {
        "[Content_Types].xml": content_types,
        "_rels/.rels": root_rels,
        "word/document.xml": document,
        "word/_rels/document.xml.rels": rels,
        "word/styles.xml": styles,
        "docProps/custom.xml": custom,
        revision["media"]: png_fixture(revision["pixels"]),
    }
    with zipfile.ZipFile(target, "x", compression=zipfile.ZIP_STORED) as package:
        for name, data in parts.items():
            package.writestr(zipfile.ZipInfo(name, (2026, 1, 1, 0, 0, 0)), data)


def export_and_verify(revision_id, target, verifier):
    """Exercise the selected synthetic revision through build then reopened verification."""
    revision = revision_case(revision_id)
    write_fixture(target, revision)
    verifier(target, revision)
    return {"output": str(target), "revision_id": revision_id, "status": revision["status"]}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", type=Path, help="New DOCX path; existing files are never overwritten")
    parser.add_argument("--revision", choices=sorted(REVISION_CASES), default="approved-r1")
    args = parser.parse_args()
    write_fixture(args.target, revision_case(args.revision))
