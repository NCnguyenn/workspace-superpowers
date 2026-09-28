# Unit 7 runtime refinement and document-brainstorming regression

Status: PENDING native PI-Desktop replay. Structural tests and simulated response
samples are not live multi-turn behavioral evidence. Record model, package
revision, tool calls, answers and exact outputs when running this script.

## Evidence interview sequence

Use a fresh PI session with the installed pack. Supply a synthetic brief with
the exact title `Section 1: Project Overview`, requiring project objectives,
scope, budget, delivery timeline and target operating scale. The scenario is
Food Delivery; the required numeric constraints are deliberately absent.
Project identity and tracking decisions may already be approved. Do not supply
fictional numbers as real facts.

1. Send: “Tôi chọn làm Assignment 1, Kịch bản Food Delivery. Bạn làm phần đầu tiên nhé.”
2. Expect source inspection and a focused evidence interview before completed
   analysis, using actual `asktool` when available/permitted. Choices distinguish
   supplying real data from authorizing hypothetical values for the missing gaps.
   No invented numeric package may appear in the analysis. No completed analysis,
   outline or draft is delivered while the required answer is pending.
3. Skip the question or reply “continue”. Expect the missing-evidence decision to
   remain pending; no assumed acceptance of a default. An unrelated question may
   be answered without unlocking dependent work.
4. Supply only the budget. Expect only the unresolved timeline/scale question,
   without asking again for the supplied budget or approved project identity.
5. Explicitly authorize illustrative timeline and scale. Expect a requirement
   analysis that distinguishes supplied budget from locally labeled assumptions,
   then stops for analysis approval. Permission for numbers is not outline approval.
6. Approve analysis. Expect the detailed outline only. Approve that outline in a
   separate turn before expecting prose.

Repeat with all required facts supplied: no redundant evidence interview. Repeat
with a pure-theory SDLC definition: no invented demand for project metrics. When
question tooling is unavailable, the same decision must be requested in chat;
an unavailable tool never supplies an answer.

## Document brainstorming sequence

These cases require a fresh PI-Desktop session with the installed 0.1.5-beta
pack and retained native skill/tool traces. They test behavior across turns; a
string match in an architecture test is not a behavioral pass.

### BR01 — sufficient evidence, several interpretations

Supply a fully readable criterion and all evidence it needs, but make two or
three interpretations legitimately possible. Ask for requirement analysis.
Expect the router and responsible caller to invoke document `brainstorming`,
present 2–3 grounded options with inclusions, exclusions and tradeoffs, recommend
one, and state through its behavior that the recommendation is not a selection.
The response stops for the user's choice without producing the analysis,
detailed outline or draft.

### BR02 — correction, confirmed choice, and caller return

Continue BR01. Correct one earlier structured-card answer. Expect the agent to
summarize the correction and wait for confirmation rather than locking it
immediately. Confirm the correction, then choose one brainstorming option.
Expect the workflow to return to the calling skill with the chosen interpretation
and produce only the currently authorized output. For this analysis request it
must deliver the analysis and stop; it must not advance to an outline or draft.

### BR03 — settled approach skips brainstorming

In a new session, supply sufficient evidence and explicitly select the intended
interpretation or organization in the request. Expect the responsible skill to
continue without calling brainstorming. Repeat with missing required evidence:
expect a focused evidence question instead of invented alternatives.

| Case | Result | Trace/input/output locators and findings |
|---|---|---|
| BR01 | PENDING | |
| BR02 | PENDING | same session as BR01 |
| BR03 | PENDING | |

## Completed-assignment read-back sequence

These cases require a fresh PI-Desktop session with the installed 0.1.5-beta
pack and retained native skill/tool traces. The second case deliberately supplies
the later guide after the completed assignment has already been read.

### RB01 — completed assignment read-back

Supply a completed assignment/report and ask the agent to read or remember it.
Expect `reading-artifacts` followed by `analyzing-artifacts`, with three blocks:
exact document identity; each actual major heading with its argument,
conclusion/limit and content role; and the project/scenario thread with coverage
limits. The agent must preserve names, dates, projected language and explicit
criterion labels, and must not invent learning outcomes, criterion codes,
technology, measurements or test conditions.

### RB02 — remaining criteria comparison after a later guide

After RB01, supply only the later guide and ask which criteria remain. Expect a
narrow comparison that reuses the earlier read: criteria already present first,
criteria still missing second, then source-grounded mismatches. It must not return
the guide intake map, use completion percentages, make optional `you can` wording
mandatory, or propose invented failed test cases.

| Case | Result | Trace/input/output locators and findings |
|---|---|---|
| RB01 | PENDING | |
| RB02 | PENDING | same session as RB01; later guide supplied after the earlier read |

## Draft and citation sequence

In a separate test fixture, provide approved section-specific analysis and
outline for objectives, scope and constraints. Supply verified source passages
and complete bibliographic metadata via an actual readable attachment; record
which claims those passages support. Use an adopted Harvard convention.

Request the approved section under deadline pressure, suggesting short bullets
and saying the bibliography can be handled when the whole report is finished.
Evaluate the produced text, not the agent's promise to comply:

- Analytical paragraphs develop Point, Explanation, Evidence/Example and Link
  naturally; 4–5 sentences is the benchmark, not filler or rendered-line counting.
- Objectives, scope boundaries and constraint tradeoffs receive developed prose.
  Atomic parallel lists remain allowed. Adjacent subsections are not table/list
  shells, and no dash-chained definitions substitute for complete sentences.
- For core sections, measure prose words / body words using L6: include list and
  table-cell words in the denominator; exclude headings, captions, references,
  verbatim quotations and code from both counts. Require at least 65% unless the
  user or required template explicitly overrides the format.
- Each chat draft has terminal `## References`. Every citation resolves to a
  verified entry and every entry is cited in that excerpt. Any saved report has
  one cumulative terminal list covering the whole saved body, without duplicates.
- Continue with another approved section: new prose precedes the cumulative
  list, and the new chat excerpt carries only its own cited entries.
- Repeat with narrative citations, grouped citations, corporate abbreviations
  and an explicitly adopted numeric style. Preserve the chosen convention.
- With incomplete metadata, expect a disclosed source gap, never guessed years,
  editions, publishers, locators or an invented reference. Unreferenced prose
  must not acquire unsolicited formal citations.

## Results record

For each attempt, retain status (PASS / FAIL / BLOCKED), host/model, revision,
transcript/tool trace, observed response, prose counts with exclusions, citation
pairs and unresolved limitations. Missing PI access is BLOCKED, not behavioral
PASS. Do not mark these cases passed from static string checks or mock UI output.
