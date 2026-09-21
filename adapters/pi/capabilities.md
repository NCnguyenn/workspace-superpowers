# Pi Desktop runtime capability record

Date: 2026-09-20. Host: PI-Desktop agent shell on Windows, Word 16.0.

## Word native Equation

| Capability | State | Evidence |
|---|---|---|
| Word COM in the interactive agent shell | verified | `New-Object Word.Application` returned version 16.0 in 0.8s. |
| Create two native `oMath` equations, including a fraction | verified | `tests/fixtures/word-native-equations/source-native-equation.docx` contains `m:oMath` / `m:f` with texts `x+1`, `2`, `=3`, `y=4`. No `a:blip` image. |
| Edit, save, reopen | verified | Same session edited the first equation RHS to `4` and saved `edited-native-equation.docx`. Reopen count remained 2 native Equations. |
| Nested `powershell.exe -File` / hidden worker | failed | Codex sandbox COM `0x80070520`; later hidden/nested workers timed out and left `/Automation -Embedding` Word processes. Do not use that worker for this host. |
| Office MCP Equation insert | unverified | Paragraph/table/image APIs only; not used as the Equation engine. |

Operator script for an interactive shell (not a nested worker): `adapters/pi/word-equation-roundtrip.ps1` (same body as the successful in-process min probe).

## Project survey

| Capability | State | Evidence |
|---|---|---|
| Inspect-only folder survey | verified | `adapters/pi/project-survey.mjs` plus `adapters/pi/project-survey.test.mjs` (2/2). |
| One derived Markdown context file | verified | Writes/updates `project-context.md` only. |
| Refuse tests/builds | verified | `runTests: true` and CLI `--run-tests` exit nonzero and write nothing. |
| Skip vendor trees and secret-like files | verified | `node_modules` skipped; `config/secrets.example` contents not copied. |

## Arithmetic

Existing `adapters/codex/evaluate_math.py` remains the bounded exact-arithmetic adapter (8/8). It is not Word Equation support.
