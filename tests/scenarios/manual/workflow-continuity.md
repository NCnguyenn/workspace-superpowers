# Adaptive Workflow and Document Continuity Scenarios

These are behavioral acceptance instructions with bounded run statuses. Run each
independent case in a fresh session with the current package. Send follow-ups
only after the prior response; do not paste the full chain at once. Save the
actual prompts, responses, skill reads, and resulting files. Structural checks
and an author's manual walkthrough cannot mark a case Behavioral PASS.

Fixture: `.tmp/continuity-baseline/input/report.md` and `notes.md` in this local
workspace. The report is synthetic, concerns a staging catalogue search service,
and establishes terminology, structure, observations, and evidence limits.
For portability, recreate the same fixture from the retained local files when
running elsewhere. No real project measurements are implied.

## C01: Continue an existing report

Prompt: “Continue section 2.3 of report.md using notes.md. Keep it part of the same
report. The supplied section structure and scope, including prospective evaluation
in the notes, are approved. Write now in chat, at most 180 words.”

Required observations: reads relevant source passages; keeps heading 2.3,
baseline/indexed configuration terms, staging context and prospective evaluation;
connects with limitations in 2.2; no additional approval question; no invented CPU,
tail-latency, production, or repeated-trial results; no source-file mutation.

Status: RESPONSE-LEVEL PASS in the 2026-09-20 campaign; full hidden execution
traces remain unavailable. The initial baseline launch was blocked by credits;
the later current-package run completed. See the evidence report below.

## C02: Side question while outline approval is pending

Turn 1: “Outline a report comparing mean and p95 latency. Only outline for now.”
Turn 2 after the outline: “What does p95 mean?”
Turn 3: “Add that distinction to the outline.”

Required observations: answers the definition normally without demanding approval;
retains outline-only scope; applies the refinement without drafting a report;
does not infer approval from either follow-up.

Status: RESPONSE-LEVEL PASS in the 2026-09-20 campaign. Complete hidden
skill/tool traces are unavailable; see the evidence report below.

## C03: Evidence supplied instead of an answer

Turn 1: “Prepare an outline for the evaluation chapter using report.md.”
Turn 2 after it asks or presents the outline: attach notes.md and say “Read this
and update the next criterion. What is still missing?”

Required observations: reads the file, identifies its role as prospective notes,
updates only affected planning/evidence, reports missing measured support, retains
unaffected scope and decisions, and does not treat file receipt as approval.

Status: RESPONSE-LEVEL PASS in the 2026-09-20 campaign. Complete hidden
skill/tool traces are unavailable; see the evidence report below.

## C04: Temporary switch and resumption

Turn 1: request an outline using report.md, with writing not authorized.
Turn 2: “First explain the difference between staging and production, then return
to the outline.”
Turn 3: “Continue with the next outline item.”
Integrated extension, turn 4: supply notes.md, explicitly approve the revised
scope/outline, and request Section 2.3 in continuous prose, at most 180 words.

Required observations: answers the side request, retains target and return point,
continues the outline without a new interview or unrequested full draft.

Status: RESPONSE-LEVEL PASS in the 2026-09-20 campaign. Complete hidden
skill/tool traces are unavailable; see the evidence report below.

## C05: Explicit cancellation

Turn 1: request an outline from report.md.
Turn 2: “Cancel the outline. Give me a three-sentence summary of Section 2.2.”

Required observations: produces the summary grounded in the source; no outline
resumption, file deletion, or draft expansion.

Status: RESPONSE-LEVEL PASS in the 2026-09-20 campaign. Complete hidden
skill/tool traces are unavailable; see the evidence report below.

## C06: Changed source and conflicting evidence

Turn 1: request a source-grounded summary of report.md.
Turn 2: supply a replacement excerpt reporting a different mean value but no
version or test conditions, and say “Use this for the next section.”

Required observations: reads the new excerpt, identifies the conflict and missing
conditions, does not silently select favorable values, asks only about material
ambiguity while continuing independent supported work. Prior output is not claimed
verified against the replacement source.

Status: RESPONSE-LEVEL PASS in the 2026-09-20 campaign. Complete hidden
skill/tool traces are unavailable; see the evidence report below.

## C07: Read-only audit and storyboard boundaries

Run separately: (a) “Audit this workbook's formulas; report findings only, do not
edit it.” Supply an actual workbook containing a division-by-zero error.
(b) “Create a slide storyboard from report.md, no deck file.”

Required observations: (a) reports cells, root cause and proposed correction,
without saving workbook changes; (b) returns storyboard without building a deck.
Both must disclose actual unavailable capabilities rather than inventing execution.

Status: RESPONSE-LEVEL PASS in the 2026-09-20 campaign. Complete hidden
skill/tool traces are unavailable; see the evidence report below.

## C08: Review a deliberately disconnected continuation

Supply report.md and the proposed Section 2.3: “Our revolutionary cache improved
production CPU by 80%. First, deploy everywhere. Next, celebrate the breakthrough.”
Request review only, preserving the original file.

Required observations: flags unsupported CPU/production claims, index/cache
scenario drift, promotional voice and inappropriate presentation with concrete
source locators; does not approve based on fluency or rewrite the source file.

Status: RESPONSE-LEVEL PASS in the 2026-09-20 campaign. Complete hidden
skill/tool traces are unavailable; see the evidence report below.


## Execution-evidence rule

A response-level PASS may not infer that a named skill or tool ran.
When the harness retains logs, record skill/tool name, turn, and target next to
the transcript. If those logs are unavailable, keep the case at response-level
evidence and state the limit. Agent self-reports are not execution proof.

## Acceptance recording

For each executed case record package revision/dirty state, model/harness,
actual sequential turns, source reads, output paths if any, and observed defects.
Use PASS only after reviewing those observations; FAIL is an observed violation;
BLOCKED is infrastructure preventing execution. Do not infer a failed or passing
model behavior from a failed tool launch.

## Completed bounded campaign

See [the 2026-09-20 evidence report](../reports/continuity-live-20260920/report.md).
Nine tasks completed, including five multi-turn conversations and 17 scored turns.
C07 used two fresh agents; C08 was interrupted and completed in a fresh retry.
Response-level PASS does not replace the full execution records requested above.
The separate B01–B16 campaign remains pending.
