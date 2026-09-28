# Synthetic Word visual fixture

Build without third-party dependencies from the repository root:

```powershell
python -B tests/fixtures/word-native-visuals/build_fixture.py "$env:TEMP/word-visual-fixture.docx"
python -B tests/fixtures/word-native-visuals/build_fixture.py --revision working-r2 "$env:TEMP/word-visual-working.docx"
python -B tests/architecture/word-visual-fidelity.test.py
```

Choose a new output path: the builder refuses to overwrite an existing file.
The test generates and reopens temporary copies; no permanent install is needed.
The default `approved-r1` case and the `working-r2` case have different revision
IDs, approval statuses, table cells, captions, media names and two-pixel payloads.
The executable test path exports and reopens both without substituting one for the
other. All values, captions and pixels are synthetic test data.
Arial, shading, spacing and caption styling are this fixture's expectations only,
not defaults for users' templates.

The checks parse actual OOXML namespaces, table cells, embedded image relationships,
PNG chunks/pixels, inline picture structure, table borders, centered captions,
source placement, requested revision/status metadata and selected formatting.
Negative mutations cover revision substitution, swapped cells/media, wrong
placement, missing/wrong borders and caption alignment even when counts stay the same.
ZIP metadata is fixed for reproducibility. This is a fixture-specific verifier,
not a general DOCX validation or conversion engine.

A hand-authored synthetic export path cannot prove that a host executed its native
export or that Word rendered the result. No Word
schema validator, layout renderer or native PI-Desktop acceptance is implied by
these tests. On a capable host, open/render the generated copy and inspect the
table, image, captions, clipping and pagination, recording that evidence separately.
