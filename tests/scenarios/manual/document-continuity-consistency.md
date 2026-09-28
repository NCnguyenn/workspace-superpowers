# Manual scenarios: document-continuity consistency (DC01–DC15)

These cases are behavioral acceptance instructions. Run each case in a fresh
session with the current package, using the fixture corpus under
`tests/fixtures/document-continuity/`. Send sequential turns separately and
retain actual prompts, responses, skill reads/tool traces, and any output files.
The fixture prose is synthetic and does not represent a real project, measurement,
citation or model response.

A static architecture PASS below means only that the contract and case data are
present and locators resolve. It is **not a Behavioral PASS**. Behavioral status
requires actual sequential turns and retained evidence. An agent's self-report
does not prove a skill call; retain the actual tool trace or record that it was
unavailable. Native PI-Desktop, rendered DOCX, and source/package checks are
separate evidence classes.

The continuation cases require analysis approval and detailed-outline approval
where the requested operation requires them. They must retain the existing
post-draft review and wait after a delivered draft. The continuity profile is
not a new approval gate. Completed-work read-back remains read-only and must not
trigger style enforcement or continuation drafting.

| Case | Prompt / setup | Required observation | Status |
|---|---|---|---|
| DC01 | Supply `source-report.md` and ask to review the proposed professor substitution for Lecturer Mei. | Flags the same-role substitution with source location; does not silently rewrite unrelated prose. | PENDING |
| DC02 | Supply the minimal-pair lecturer sentence and ask for review only. | Preserves the adopted assessor term. | PENDING |
| DC03 | Supply the distinct-role passage, quotation and [N2] reference. | Preserves teacher/lecturer/professor because people, institutions, quotation and source title are distinct; no naive co-occurrence failure. | PENDING |
| DC04 | Continue the individual report with an unexplained “We” sentence. | Surfaces scoped authorial-person drift. | PENDING |
| DC05 | Use `group-report.md` and propose an “I” sentence. | Surfaces conversion from established group voice; does not force a global individual voice. | PENDING |
| DC06 | Propose Section 2.3 with production, payment, Redis, cache and an 80% CPU result. | Flags scenario/technology/module drift, unsupported metric and indexed-configuration rename; does not invent a correction. | PENDING |
| DC07 | Supply `conflicting-note.md` after `source-report.md`; ask for analysis without choosing a scenario. | Retains both source locators and unresolved conflict; does not silently select MySQL or PostgreSQL. | PENDING |
| DC08 | Ask whether the generic “Furthermore, database technology…” opening connects to Section 2.2. | Flags the absent actual seam bridge despite the connector keyword. | PENDING |
| DC09 | Ask whether the two-sentence CPU/p95 opening connects to Section 2.2. | Preserves the complete short transition; does not require four or five sentences. | PENDING |
| DC10 | Ask for review of the complete lead sentence plus CPU/p95/repeated-trials list. | Flags the qualitative lead-and-list defect; does not treat list items as developed PEEL prose. | PENDING |
| DC11 | Ask only to read and remember `source-report.md`; explicitly prohibit continuation and revision. | Returns source-grounded read-back, then stops without intake map, style enforcement or draft. | PENDING |
| DC12 | Ask for continuity findings while explicitly withholding analysis/outline approval and new measurements. | Keeps profile, approval and verification states separate; does not start drafting. | PENDING |
| DC13 | Ask whether the Appendix A hypothetical 80% CPU reduction can appear as a conclusion. | Flags promotion of illustrative material to measured result. | PENDING |
| DC14 | Ask for tense/person review of past observation, current limit and prospective method. | Preserves tense-by-function and the established individual voice. | PENDING |
| DC15 | Ask for authorial-person review of the own sentence “We evaluate … (N1)”; the citation is not a quotation. | Flags the unexplained person shift even though the sentence contains an in-text citation. | PENDING |

For each run record package revision/dirty state, model/harness, turn order,
source reads, output paths (if any), observed findings and unavailable
capabilities. A missing native trace or render is BLOCKED/UNVERIFIED for that
evidence class, never PASS. Do not edit earlier source sections to hide a seam
finding; report the authorized correction and recheck only affected content.
