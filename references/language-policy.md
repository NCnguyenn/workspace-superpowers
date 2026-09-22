# Deliverable Language Policy

## Default and explicit overrides

English is the default language for all newly authored content and deliverables: reports, theses, outlines, plans, documentation, skills, templates, table and figure labels, slide content, and generated or exported files. This applies whether the content is delivered in chat or saved as an artifact.

Use Vietnamese only when the user explicitly requests Vietnamese for the relevant deliverable. Apply another language only when the user explicitly requests it. Reuse an already explicit, applicable language instruction in the conversation; do not require the user to repeat it for each section or export. An override for one deliverable does not change the default for unrelated deliverables.

Do not infer the deliverable language from the language used in conversation, the prompt, source documents, or a template. A Vietnamese message asking for a report without specifying its language requests an English report under this policy. Missing language information is resolved by the English default; do not ask a language question solely because it was omitted.

## Communication and artifact content

Chat, Q&A, explanations, requirement analysis reports, progress updates, and user interaction MUST follow the user's conversational language (e.g., Vietnamese when the user speaks Vietnamese). The actual requested report, outline, plan, document, or other authored deliverable remains English unless an explicit applicable override exists. A report or outline pasted into chat is still a deliverable, not a conversational update.

Keep authored headings, captions, chart/table labels, placeholders, and notes in the selected deliverable language. Skills, references, and repository documentation are written in English by default. Do not insert Vietnamese labels into an otherwise English template merely because the request arrived in Vietnamese.

### Strict negative constraint: No interleaved bilingual text

NEVER interleave bilingual translations or explanations directly into chat blocks (e.g. forbidden: dumping `[Bản tiếng Anh nộp bài]` alongside `[Giải thích tiếng Việt]`, or alternating English paragraphs with Vietnamese explanations).
- Conversational discussion, requirement analysis presentations, questions, and explanations are presented cleanly in the user's conversational language.
- Authored deliverables (the outline, report sections, drafted content, and files) are delivered cleanly in English (unless the user explicitly requests another deliverable language).
- When delivering an English deliverable (such as an outline or drafted section in chat), present it cleanly as the authored artifact without interleaving bilingual sentence-by-sentence or paragraph-by-paragraph translations. Do not create parallel bilingual text unless the user explicitly requests a bilingual deliverable.

## Requirements, fidelity, and exports

- An explicit user request to follow a stated language requirement, including one in a supplied rubric, is a language instruction. Merely receiving non-English source material or a template is not.
- If a supplied mandatory language requirement conflicts with the English default and the user has not adopted that requirement explicitly, resolve that specific conflict before finalizing; do not silently switch languages.
- Preserve exact quotations, proper names, source titles, code, identifiers, and raw evidence when accuracy requires their original form. Explain them in the selected deliverable language where useful.
- Level-1 criterion/requirement headings preserve the exact source title, including its original language, under the [outline structure contract](outline-structure.md). Do not translate or paraphrase that protected title to satisfy the English default. Newly authored child headings retain the selected deliverable language; do not add parallel translations.
- This default is not permission to rewrite protected source content during a preservation-only operation. Honor explicit instructions to keep content unchanged. If those instructions and a requested output language conflict, clarify the conflict rather than silently translating.
- Exporting an authored report to another format retains its selected language. It does not switch to the conversation language. The source and exported artifact must agree.
- Record the selected language and the explicit override, if any, in the brief. When no override exists, record English.

## Acceptance examples

| User request or context | Required result |
|---|---|
| Vietnamese conversation; asks for a report without specifying its language | English report, including headings, captions, and generated files |
| Vietnamese input criterion; asks for an outline without specifying language | Verbatim original criterion title at level 1; English newly authored child headings and outline notes, without parallel translations |
| Explicit request to write the report in Vietnamese | Vietnamese report, with that choice retained for its revision and export |
| Explicit request to write in another named language | That language for the specified deliverable |
| Vietnamese source material without a language instruction | English newly authored analysis or report; preserve source quotations accurately |
| Existing explicit instruction to keep supplied content unchanged during conversion | Preserve the protected content; do not infer permission to translate |
| English report exported to PDF during a Vietnamese conversation | English PDF |
