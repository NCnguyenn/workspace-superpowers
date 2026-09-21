# Codex runtime capability probe

This adapter records a local Windows capability probe. It is evidence about the
runtime that executed it, not a portable-skill guarantee and not a claim about
Pi integration.

## Recorded environment

- Date: 2026-09-20 (Asia/Bangkok)
- Shell: Windows PowerShell 5.1.26100.9444
- Word executable present: `C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE`
- Node: `D:\nodejs\node.exe` version 24.15.0
- Default Python: `C:\msys64\ucrt64\bin\python.exe`; importing `sympy` failed with `ModuleNotFoundError`.
- `pandoc` and Conda were absent from `PATH`.
- Connected Codex document sessions: none supplied to this probe.

## Actual probe result

The corrected probe's [sandbox run](../../tests/scenarios/reports/math-project-20260920/runtime/word-probe-20260920-163558-87da96c10f0e480e90442a4b3f8244f1/result.json)
failed to create a new hidden `Word.Application` COM instance with HRESULT
`0x80070520` (`A specified logon session does not exist`). A subsequent
[outside-sandbox run](../../tests/scenarios/reports/math-project-20260920/runtime/word-probe-20260920-163612-dcb2dc7f39ec4cd4bd5339e54b346573/result.json)
timed out at the 30-second watchdog limit. It produced no DOCX or PDF fixture;
the exact stalled stage was not observable. The watchdog stopped only its own
PowerShell worker. No Word process was killed; a probe-owned Word instance may
remain if activation hung. No existing user document was opened or modified.

| Capability | State | Fidelity | Evidence / limit |
| --- | --- | --- | --- |
| Native Equation creation | unverified | none | Sandbox COM creation failed; outside-sandbox worker timed out. |
| Existing DOCX math edit, save, reopen | unverified | none | No saved fixture or round-trip evidence. |
| OMML/oMath structural check | parser self-tested only | fixture XML | Static ZIP/XML fixtures pass; no actual Word-produced fixture verified. |
| Mathematical-content comparison | parser self-tested only | known fixture semantics | Numerator, denominator, RHS, untouched equation and differing structure are checked; no Word-produced fixture verified. |
| PDF export/render | unverified | none | No PDF output. A PDF alone would still not prove visual layout. |
| Visual layout inspection | unavailable | none | No rendered image or human layout inspection occurred. |
| Clipboard/LaTeX import | unverified | none | Deliberately not assumed or exercised. |
| Exact supplied-input arithmetic | available | bounded exact arithmetic | Local `evaluate_math/1.2.0` adapter; 8/8 runtime tests. |
| Symbolic/general theorem verification | unavailable | none | No CAS/proof system provided; SymPy is not installed. |

The fixture path can only prove its own create/edit/reopen path if Word COM
becomes available. It cannot establish arbitrary-document preservation. Counts
of `oMath` or OMML tags are structural evidence only; the probe separately
compares the known fixture's OMML numerator, denominator, RHS and untouched
second equation, rejects altered supported structure, and checks the source
file hash. This remains limited semantic evidence. A successful future run is
named `fixture-passed`, never a claim that all four Word entry paths are complete.

## Exact arithmetic mapping

`evaluate_math(request)` can be implemented locally by piping one JSON object
to `python adapters/codex/evaluate_math.py`. This is an explicit adapter command,
not a claim that an MCP tool was installed or registered. Version `1.2.0`
implements `operation: evaluate`, an arithmetic `expression`, optional exact
`values`, `expected` equality and recorded `assumptions`. It supports bounded
rational arithmetic, integer powers, factorial, combinations and GCD using only
the Python standard library. It does not solve arbitrary symbolic expressions,
prove theorems, or verify units and dimensions.
Only `operation`, `expression`, `values`, `expected` and `assumptions` are
accepted. Other fields, including domain, precision and tolerance, return
unavailable before execution instead of silently changing the requested problem.
Input JSON overflow is rejected and output serialization forbids non-finite values.

The result records `requested_expression`; `executed_expression` appears only
after calculation completes. Supplied assumptions are explicitly
`assumptions_checked: false`. An un-compared result is `inconclusive`; syntax,
domain and resource-limit failures are diagnostics, not mathematical
counterexamples. See the [runtime evidence](../../tests/scenarios/reports/math-project-20260920/math-runtime/README.md)
for limits, exit codes, the 8/8 test run and the actual exact result `361/3`.
This arithmetic capability provides no native Word capability.

## Reproduce

Run the validation-only self-test:

```powershell
& 'D:\nodejs\node.exe' --test adapters\codex\word-math-probe.test.mjs
```

Run one disposable probe. It creates a unique directory under
`tests/scenarios/reports/math-project-20260920/runtime/`, refuses an existing
directory, starts a hidden Word instance only if COM permits it, and closes only
that instance and its own documents.

```powershell
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File adapters\codex\word-math-probe.ps1
```

For a caller-chosen fresh output directory:

```powershell
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File adapters\codex\word-math-probe.ps1 -OutputDirectory tests\scenarios\reports\math-project-20260920\runtime\word-probe-<fresh-id>
```

If Word COM becomes available, the probe creates two native `oMath` equations
in separate paragraphs, reopens them, changes the RHS of `(x+1)/2=3` to `4`
through its native range, preserves `y=4`, saves/reopens, inspects Word's `OMaths`
and `word/document.xml`, checks the source hash, and attempts PDF export. It never reads user
documents, credentials, clipboard contents, or the network.

The probe's 3/3 self-tests exercise XML semantic/negative fixtures, watchdog
configuration and refusal to overwrite an existing output directory. They do
not exercise Word COM or establish clipboard/visual fidelity. Clipboard and
visual layout remain mandatory separate checks for a real Word deliverable.
