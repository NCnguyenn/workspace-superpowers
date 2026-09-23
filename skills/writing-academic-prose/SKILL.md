---
name: writing-academic-prose
description: Use when authoring scholarly, analytical, or thesis prose requiring rigorous claim-evidence integration, calibrated epistemic hedging, and natural academic cadence.
---

# Writing Academic Prose

Specialist for scholarly and thesis prose: claim, warrant, evidence, interpretation, and calibrated certainty. Write like a capable final-year student in the discipline, not like a template.

Honor the [workflow continuity contract](../../references/workflow-continuity.md)
and the [document continuity contract](../../references/document-continuity.md).
Ground a continuation in actual neighboring passages and the source profile.
Keep the argument, terminology, register, and presentation coherent across
sections; adapt tense and paragraph form to the section's function. Generic
academic phrasing alone does not establish continuity with the user's document.

Apply the [academic writing style guide](../../references/academic-writing-style.md) by rule ID. Honor the [criteria-writing contract](../../references/criteria-writing-contract.md) for evidence and authorization. Honor the [language policy](../../references/language-policy.md) for output language.

## When to use

Analytical chapters, literature discussion, thesis sections, or other scholarly prose that must integrate claims with evidence and hedge beyond the data.

## When not to use

Report sections whose main job is separating method from measured results (`writing-reports`). Mechanical wording or format edits. Citation-only formatting (`citing-sources`).

## Style obligations

Cite these rule IDs in self-check and in review findings. Do not force every paragraph into the same sentence count.

| Group | IDs | Obligation |
|---|---|---|
| Paragraphs | P1–P3 | Use PEEL (Point, Explanation, Evidence/Example, Link); develop analytical paragraphs to a 4–5-sentence benchmark without filler. Inspect short stubs for missing support or interpretation. |
| Lists | L1–L6 | Core analytical sections need at least 65% discursive prose under L6's counting scope and format exceptions. Bullets hold atomic parallel items; tables accompany reasoning. Explain objectives, scope and constraint tradeoffs in paragraphs. |
| Register | R1–R4 | Name subject, action, conditions, and result; stay in scope; calibrate certainty; use plain academic language. |
| Evidence | E1–E4 | Trace claims; handle gaps through the contract; synthesize; reconcile numbers with source artifacts. |
| Cadence | S1–S3 | Vary sentence shape by function; replace casual dash-chained definitions with complete sentences or grammatical clauses. Word-count bands and burstiness scores are not acceptance tests. |
| Endings | C1–C3 | Cut empty subsection finales; keep a closing sentence only when it adds a result, limit, or needed transition. |
| Phrasing | F1 | Remove clichés that replace substance; do not run a banned-word lottery. |
| Language | V1–V3 | Apply Vietnamese or another language only on explicit request; keep the same evidence and integrity standards. |
| Integrity | I1–I3 | Do not fake errors or personal experience; report observable defects by rule ID; style review cannot approve missing evidence. |

## Prerequisite and anti-hallucination constraints

Never invent project names (e.g. fictitious apps/companies like "SpeedyBite"), consulting roles, business context, budgets, SLAs, latency targets, or operational metrics without explicit confirmation. If unstated, ask the user or mark as a blocking gap.

Conversational interaction follows the user's conversational language (e.g. Vietnamese); authored deliverables default to English without dumping interleaved bilingual text in chat.

## Procedure

1. Develop each analytical paragraph through PEEL (P1–P3), starting with its point and explaining why it matters within the approved argument.
2. Support it with identified evidence (E1). If the support is missing, stop the assertion and follow the contract protocol (E2).
3. Interpret only as far as the data allow (R3). Correlation is not causation.
4. Prefer developed paragraphs over bullet stacks (L1/L6). Check the 65% prose floor and adjacent subsections for list/table-only coverage. Use a list only when L2 or L3 applies; do not add filler to meet the floor.
5. Stop when the point is complete (C2). Do not applaud the topic.
6. If citations are required or present, invoke `citing-sources` before handoff to complete the terminal `## References` list and bidirectional audit for chat and any saved report. Return the section to `drafting-prose` for `reviewing-work` with these checks completed.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — brief, outline, sources, and the style guide.
- `write_file(path, content)` / `edit_document(file, change)` — compose scholarly prose.
- `read_reference_documentation(query)` — optional; library or standard documentation named in the brief.
- `invoke_skill(name)` — load `citing-sources` when formal citations are required or present.

## Dependencies

- Selected by `drafting-prose` after contract prerequisites are met.
- May be combined with `writing-reports` on a project or thesis report, by section.
- Precedes `reviewing-work`. Requires `citing-sources` when formal citations are required or present; reuse a completed citation check for the same revision rather than duplicating it.

## Fallback

If a source cannot be opened, record the gap and write only what remaining evidence supports. Do not invent a citation, locator, or result.

## Common mistakes

- Padding a stub paragraph to hit four sentences without adding meaning (P2).
- Replacing an argument with a bullet outline (L1).
- Overclaiming from a narrow sample (R3, EX4).
- Closing a subsection with “this plays a pivotal role” (C1, F1).
- Inserting typos to appear human (I1).
- Inventing fictitious project names, consulting roles, SLAs, budgets, or operational metrics.
- Interleaving bilingual translations in chat responses.
