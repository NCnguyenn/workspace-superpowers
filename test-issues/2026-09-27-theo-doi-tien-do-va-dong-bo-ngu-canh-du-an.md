# Issue record and improvement direction: AI-managed report progress and project context

- **Recorded on:** 27 September 2026 (2026-09-27), Asia/Bangkok (UTC+07:00).
- **Record:** `test-issues/2026-09-27-theo-doi-tien-do-va-dong-bo-ngu-canh-du-an.md`.
- **Source:** User feedback, the supplied Anti proposal, and the subsequent discussion consolidating both proposals.
- **Status:** At the 27 September recording stage, this was an accepted direction only. The implementation update below supersedes that historical status with source-contract and package verification results; native runtime cases remain pending.
- **Authorized action for the recording stage:** Create one issue document in the existing `test-issues` directory. That original recording scope did not authorize a new tracking workspace, code changes, plugin build, or project modification; the later implementation update records the separately completed authorized implementation work.
- **Release target:** Not assigned. Do not infer an implemented release from the dates or targets in earlier issue records.
- **Document language:** English under the workspace's default authored-document policy; identifiers and source filenames are preserved.

## 1. Problem and intended outcome

The user reports that the current workflow asks reasonably clear questions before creating a project folder, but the resulting Markdown records are difficult to understand and too numerous. The desired outcome is an assistant that manages the records itself while the user communicates through ordinary chat. The user should not have to maintain filenames, status fields, decision registers, or synchronization notes.

The progress record must act as a working outline of the entire assignment, report, essay, or thesis. It should show what each part contributes, what has actually been completed, the conclusions already established, and what should happen next. A second record is appropriate only when the writing depends on a concrete project or product. That record should describe the project and the evidence available from it.

Neither an initial outline nor an early project description can be assumed final. The user may revise completed sections, change scope, reorder work, replace a project, or edit documents outside the conversation. The assistant must identify these changes, assess their consequences, and keep the relevant records aligned without inventing facts or requiring repeated permission for routine bookkeeping.

### 1.1 Issues to address

| ID | Recorded problem or design risk | Required improvement |
|---|---|---|
| TRACK-01 | Too many overlapping files can contain different versions of the plan, progress, and decisions. | Use at most two management Markdown files per report workspace, with distinct responsibilities and stable paths. |
| TRACK-02 | A technically dense record is hard for a person to read. | Put current position, next action, blockers, and the overall outline first. Keep provenance details compact and close to the claims they support. |
| TRACK-03 | An early outline may become a rigid instruction even after the user changes direction. | Treat the outline as a revisable plan. Reconcile current intent and actual work before following a saved next action. |
| TRACK-04 | Completed content and saved progress can disagree. | Reinspect the affected document and update summaries, status, and locators from what actually exists. |
| TRACK-05 | Project facts can be confused with intentions, descriptions, or future implementation. | Distinguish planned, user-described, source-inspected, runtime-observed, and tested information. |
| TRACK-06 | Changing one section can leave related sections, figures, or conclusions inconsistent. | Track dependencies and propagate review requirements only to affected items. |
| TRACK-07 | A comparison, question, or brainstorming suggestion can be mistaken for approval. | Classify prompt intent and preserve proposal, decision, authorization, and approval as different states. |
| TRACK-08 | Repeated confirmations can turn automatic tracking into administrative work for the user. | Reuse setup consent and clear instructions; ask only about unresolved decisions or actions outside the authorized scope. |
| TRACK-09 | A project may not exist yet or may lack the evidence required for a section. | Keep independent work moving; record specific evidence gaps without creating fictional project facts. |
| TRACK-10 | Claims of automatic memory or synchronization can exceed actual access. | Record inspection coverage and freshness; detect external changes when sources are accessible and checked, without promising background monitoring. |
| TRACK-11 | Tests and UI interaction may be described as read-only even when they modify data. | Separate observation from execution and mutation; define permitted environments and effects before running them. |
| TRACK-12 | Partial saves or concurrent edits can leave the report and records inconsistent. | Use a single persistent writer, reread saved changes, and recover explicitly from interrupted updates. |

These are user-reported problems and improvement requirements, not a claim that every failure was reproduced during this recording task.

## 2. Existing evidence and historical status

The current repository already contains relevant mechanisms. This work should consolidate and tighten them rather than introduce a parallel lifecycle.

| Inspected source | Current evidence | Implication for implementation |
|---|---|---|
| [Work-tracking contract](../references/work-tracking.md) | Describes bounded discovery, matching existing plans, revision-aware decisions, a single writer, and checkpoint recovery. | Preserve these controls while simplifying the user-facing record and making change handling operational. |
| [Work-plan template](../templates/work-plan.md) | Includes identity, sources, requirements, work items, artifacts, exports, questions, decisions, and checks. | Reduce fragmentation and visible administrative overhead; do not discard necessary traceability. |
| [Workflow continuity](../references/workflow-continuity.md) | Distinguishes questions, corrections, temporary switches, replacement, pause, and resume. | Make these distinctions directly govern record updates and authorization. |
| [Project grounding](../references/project-grounding.md) | Separates descriptions, inspected source, and observed behavior; restricts survey writes and execution. | Align placement and test permissions with the proposed two-record model. |
| [Document continuity](../references/document-continuity.md) | Requires contextual, terminological, and evidence continuity across sections. | Connect those checks to item dependencies and change propagation. |
| [Document brainstorming](../skills/brainstorming/SKILL.md) | A document-specific brainstorming skill currently exists. | The new integration work must reuse and test it; do not describe the current source tree as missing this skill. |
| [PI bootstrap](../adapters/pi/bootstrap.md) and scoping/router references | Current text already routes open document choices to brainstorming. | Existing references are evidence of routing instructions, not proof that the proposed end-to-end behavior works. |

### 2.1 Relationship to earlier issue records

- [23 September record](2026-09-23-ghi-nhan-van-de.md): historically recorded missing document brainstorming, shallow outlines, intake problems, prose defects, and missing citations.
- [24 September record](2026-09-24-doc-bai-da-lam.md): reports closure of the seven earlier issues in `v0.1.5-beta`, while recording new failures in reading completed work and comparing it against a later guide. This is a historical report, not a new release verification.
- [27 September visuals, tables, Word, and citations proposal](2026-09-27-dinh-huong-nang-cap-visuals-tables-word-citations.md): supplies planned requirements for early visual review, evidence provenance, and export fidelity.
- [27 September voice and continuity proposal](2026-09-27-tinh-nhat-quan-van-phong-xung-ho-va-mach-noi-bao-cao.md): supplies planned requirements for stable terminology, contextual bridges, and review before delivery.

The user referred to brainstorming as previously recorded but not yet available. Source inspection now shows the skill exists. Preserve the older record as historical evidence and describe the remaining work as integration and behavioral verification, not creation of a second brainstorming skill. No installed-host or packaged-release parity is established by this inspection.

## 3. Record architecture and creation decisions

### 3.1 Two management records at most

| Record | Owns | Must not become |
|---|---|---|
| `work-plan.md` | Whole-report outline, requirement coverage, content summaries, progress, decisions, dependencies, current target, and next action. | A duplicate of the full report, a second project specification, or an instruction overriding the current request. |
| `project-context.md` | Project identity and location, observed implementation, evidence, readiness, versions, coverage, conflicts, and authorized survey boundaries. | A second report progress tracker or a source of invented implementation facts. |

The Anti proposal uses `report-plan.md`. Prefer the existing canonical name `work-plan.md` for new records to preserve discovery compatibility. Reuse an already adopted equivalent rather than creating a duplicate merely to enforce a filename. If naming changes later, update the canonical locator and all consumers together.

Keep the records in the dedicated report workspace alongside its deliverables. A code repository may be elsewhere and referenced by path or repository URL. Do not copy the source tree or place a new context record inside it by default.

This proposed placement differs from the current project-grounding allowance for a designated context file inside the source project. Reconcile the contract, templates, adapters, and existing-record discovery before rollout. Do not create two context records while migrating an existing setup.

The two-file limit concerns management records. User inputs, the report itself, images, logs, and requested exports are separate artifacts. Do not create extra Markdown trackers, private agent logs, or per-session summaries. Where a report is itself Markdown, it remains a deliverable, not a third management record.

### 3.2 When to create or reuse a record

| Situation | Assistant behavior |
|---|---|
| A simple question, isolated edit, or one-off export | Do not create tracking records merely because files are involved. |
| Sustained report work with no adopted tracking | Read supplied requirements first, establish unsettled identity fields, propose the dedicated folder and applicable record paths, and obtain setup consent once. |
| The user explicitly requests a record at a clear path with sufficient context | Use that authorization; do not repeat the same setup question. |
| A matching adopted plan already exists | Reuse it and its recorded decisions; verify its current target before continuing. |
| No concrete project has been selected | Create only the authorized work plan; mark project-dependent items as waiting. Do not create an empty or fictional project profile. |
| A concrete project is identified but incomplete | Create context when useful and authorized; record known inputs, maturity, and gaps without waiting for a finished product. |
| Only a user description is available | Label it user-provided and unverified. Do not invent paths, schemas, screenshots, or working features. |
| A project appears later | Create its context under existing setup consent if that consent already covers the conditional second record; otherwise obtain only the missing location/scope authorization. |
| Several plausible records or replacement documents exist | Resolve their identities and intended roles before choosing. Do not select by newest timestamp alone. |

Initial consent authorizes routine maintenance within its stated scope. It does not approve every future outline, authorize arbitrary rewrites, or permit project implementation changes.

## 4. A readable whole-report work plan

The plan should explain the work to a person before presenting administrative details. Use ordinary headings and concise summaries. Omit irrelevant fields rather than leaving pages of placeholders. Do not force every item into a very wide table.

### 4.1 Recommended information order

1. **Where we are:** Current section, last completed action, next action, and actual blockers.
2. **What this work must deliver:** Purpose, scope, authoritative brief, submission constraints, and applicable user decisions.
3. **Whole-report outline and progress:** Stable item identity, actual heading, criterion mapping where justified, purpose, and status.
4. **Completed-content summaries:** Main argument or conclusion, decisions established, report location/version, and what later sections inherit.
5. **Upcoming work and dependencies:** Evidence needed, prerequisite sections, and the next permissible action.
6. **Recent changes and unresolved decisions:** Short reasons, affected items, and exact scope of recorded approvals.

Compact revision and source details belong with the relevant item or in a small reference area within this same file. Avoid parallel registers repeating the same decision in several places.

### 4.2 Different depth for different distances

| Part of the plan | Required depth |
|---|---|
| Whole report | Known sections, purpose, requirement coverage, and relationships. Preserve uncertain organization as provisional. |
| Work about to begin | Concrete intended argument, evidence requirements, unresolved decisions, and next action. |
| Completed work | Concise substantive summary, actual location, verification limits, and applicable user approval. |
| Distant or evidence-dependent work | Purpose and known prerequisites; do not invent detailed arguments or results. |
| Reopened work | What changed, why, what remains valid, and the specific revision required. |

A whole-report outline is not the detailed outline approval for each criterion. Preserve the existing separate analysis, detailed-outline, and draft decisions. Do not mark a heading complete merely because its outline exists.

### 4.3 Progress and readiness must remain distinguishable

Use readable states such as not started, in progress, awaiting review, approved, needs review, and revision in progress. Record evidence gaps and verification limits separately so that an approved incomplete draft cannot masquerade as a fully evidenced final section.

An approval belongs to the section and version actually reviewed. A section delivered in chat but not saved into the working report must say so. If the chat text is no longer recoverable, do not fabricate the missing draft from its summary.

Stable item identities survive heading changes, reordering, merging, or splitting. Preserve the mapping from old items to new locations and from actual content to authoritative criteria. Do not invent P/M/D labels from memory when the source does not establish them.

## 5. Prompt understanding and confirmation boundaries

The assistant must interpret the current message in context before changing a decision. Detecting an alternative is not accepting it. A proposal may be recorded as an unresolved option without replacing the current approved direction.

| Prompt intent | Example | Permitted response and record effect |
|---|---|---|
| Question | “Would MongoDB fit better?” | Explain suitability. Keep the adopted technology unchanged. |
| Comparison or analysis | “Compare MySQL and MongoDB for this project.” | Compare against known requirements and evidence. Do not switch the project or report decision. |
| Brainstorming | “What other ways could we organize this chapter?” | Present suitable options and tradeoffs. Record a pending choice only if useful; do not adopt the recommended option automatically. |
| Hypothetical | “If we removed login, what would change?” | Analyze consequences as hypothetical. Do not remove login or mark dependent work obsolete. |
| Clear decision | “Use MongoDB for the revised design.” | Record the new design decision and identify affected content. Do not claim the implementation has migrated. |
| Clear revision request | “Rewrite this section and synchronize the related discussion.” | Revise within that authorized scope, honoring applicable unresolved writing approvals and evidence needs. |
| Change of order | “Do testing first today.” | Change the next task if prerequisites allow; do not assume the overall outline has been rejected. |
| New file | “Here is another version.” | Read it and determine its role. Ask only if replacement versus reference status is materially ambiguous. |
| Short approval | “OK.” | Apply only to an unambiguous pending proposal and version. Do not use it as blanket approval for several unresolved choices. |
| Praise or acknowledgment | “That idea is useful.” | Do not infer a technology change, file creation, or implementation instruction solely from praise. |
| Cancellation or deletion request | “Remove this section.” | Identify requirement/dependency consequences. Preserve artifacts/history appropriately; clarify only unresolved deletion or scope implications. |
| Unrelated question | A side question during drafting | Answer it without erasing progress or treating it as approval of a pending outline. |

When a change is clear and already authorized, report its material effects and proceed without asking the same permission again. Ask when the target, choice, consequences, or authority is genuinely unresolved. A pending decision blocks only its dependent action.

## 6. Three-way linkage: report, progress record, and project context

The three artifacts must be connected through relevant sections, decisions, source evidence, and versions. A change in any one triggers an impact check across the other applicable artifacts. It does not require mechanically rewriting all three, nor does it authorize changing source code to make a report claim true.

### 6.1 What each source establishes

| Source | Establishes |
|---|---|
| Current user instruction | Intended action, decision, and authorized scope. |
| Adopted assignment brief or requirements | Obligations the deliverable must satisfy. |
| Actual report content | What has been written, including contradictions or gaps. |
| Project source, runtime observations, and test evidence | What is implemented or observed under identified conditions. |
| Work plan and project context | Derived summaries, links, decisions, and inspection state; not replacements for primary evidence. |

Conflicting sources are recorded with their provenance and scope. A new instruction can change an intended design but cannot retroactively change measured results. A newer file is not automatically an approved replacement.

### 6.2 Change propagation matrix

| Change origin | Work-plan effect | Project-context effect | Report effect |
|---|---|---|---|
| Report argument or conclusion changes | Refresh summary, dependencies, next steps, and affected approval status. | Recheck project claims if used; record changed interpretation or evidence need without altering observed facts. | Review dependent paragraphs, figures, tables, and conclusions within authorization. |
| Outline or scope changes | Update item mapping, requirement coverage, and upcoming work. | Update relevant evidence needs and section links if affected. | Identify content to move, revise, add, or retire; do not silently rewrite unrelated approved sections. |
| Actual project implementation changes | Mark dependent items for review and identify new evidence requirements. | Reinspect changed sources and update observed state with version and limits. | Reassess descriptions, results, and conclusions against the report's intended project version. |
| User changes intended technology | Record the adopted design decision and affected items. | Keep intended technology separate from current implementation. | Update the authorized design discussion; do not claim migration without evidence. |
| A screenshot or test result changes | Update its dependent items and readiness. | Record source/version/environment and superseded evidence relationship. | Recheck captions, references to the evidence, result tables, and dependent conclusions. |
| Wording or formatting changes without a substantive effect | Refresh locators/version where necessary. | No factual update if no project claim is affected. | Preserve substantive approvals where meaning is unchanged; verify the edited artifact. |

Where an artifact is unaffected, retain it unchanged. Where an update is needed but not authorized or not supported, mark the dependency as pending instead of pretending synchronization is complete. Project context may be absent when no project exists; do not create it just to satisfy this matrix.

### 6.3 Reopening completed content

1. Preserve the prior approval and its actual version or recoverable version-history locator.
2. Record the new request and what it changes.
3. Mark the affected working item as needing review or revision.
4. Inspect dependent sections before deciding which require substantive edits.
5. Keep unaffected decisions, approvals, evidence, and completed items intact.
6. Update the current summary after the authorized revision has actually been made.
7. Obtain only the applicable approval for the changed content; never transfer old approval to a substantively different version.

“Needs review” means an impact must be assessed; it does not mean the section is already proven wrong. A proposed change must not erase the fact that earlier work was completed under an earlier valid decision.

### 6.4 Illustrative change scenario

Suppose a report's design and test discussion use MySQL. The user first asks whether MongoDB would be better. The assistant compares alternatives and retains the existing decision. If the user then explicitly adopts MongoDB for the revised design, the assistant identifies the technology rationale, data model, and relevant test discussion as affected; an unrelated DNS theory section remains unchanged.

The plan records the new design choice. The project context continues to say that the inspected implementation uses MySQL until contrary evidence is verified. Existing MySQL test results retain their original version and conditions. The assistant revises only authorized content and explains which further evidence is needed. This example is a workflow illustration, not a claim about an actual user project.

## 7. Project readiness and survey permissions

### 7.1 Evidence levels

Record whether each important claim comes from a user description, approved plan, inspected code/schema, observed UI/runtime behavior, or an executed test. Keep the original source locator, relevant revision, environment, date of observation, and coverage limits where applicable.

Code existence does not prove correct runtime behavior. A screenshot does not prove a complete workflow. A README does not prove tests passed. A passing test supports the tested conditions, not all environments. Do not reuse evidence from an older version as a result for a new one.

### 7.2 Incomplete or unavailable projects

- With no project, continue independent theory or requirement work and name the dependent sections that must wait.
- With a partial project, record actual readiness feature by feature rather than inventing a percentage of completion.
- With missing results, prepare a test plan only when that is useful and authorized; do not count it as execution evidence.
- Missing automated test code does not establish that manual testing is impossible.
- With an inaccessible source, retain prior evidence as historical and mark current verification unavailable.
- If a project is replaced, preserve which report content and evidence concern the previous project, then remap only the authorized current scope.
- A snapshot-based report may intentionally describe an older project version. Ask which baseline is intended only when the request does not resolve that choice.

### 7.3 Permitted observation and controlled execution

The proposed assistant may read code and database structure, inspect an application, run authorized tests, interact in a permitted test environment, and capture screenshots for the report. It must not modify application code, configuration, schema, production data, or Git state under report-survey authority.

Tests, startup scripts, builds, and UI actions can create files or records. Inspect their effects and prerequisites before execution. Establish a standing permission boundary for named environments and expected temporary/test outputs where useful, so routine authorized evidence collection does not require repeated confirmation. Existing permission applies only within that boundary; installation, migrations, destructive actions, or additional writes remain separate decisions.

Do not store passwords, tokens, or secret account details in the Markdown records. Record the test account role and approved access mechanism without embedding credentials. Store screenshots and logs in authorized report output locations, linked from the context record.

Software investigation continues through the Coding router with these bounds. A generic coding instruction to fix, build, install, or test must not expand the report survey into an implementation task.

## 8. Assistant operation and self-checking

### 8.1 On a relevant request or resumption

1. Interpret the current message using retained context; determine whether it is discussion, a decision, a revision, a new input, or a continuation.
2. Discover or reuse the adopted work-plan path. Read current position before unrelated sources.
3. Inspect the actual report passages and project sources needed for this operation. Reuse unchanged evidence only when its relevant content and identity remain available.
4. Compare actual state with saved summaries and identify discrepancies.
5. Explain material consequences briefly. Resolve only decisions that are genuinely missing.
6. Perform the authorized work and update the applicable records at a meaningful checkpoint.
7. Reopen saved portions and check their agreement with each other and the real artifacts.
8. Return the requested result with the current next step and any unresolved dependency.

Do not reread the entire project or rewrite both records after every casual message. Meaningful triggers include an adopted decision, revised or approved section, changed source, new evidence, export, or handoff. Routine bookkeeping should not dominate the conversation.

### 8.2 Short resumption summary

Retain Anti's short orientation idea: what is done, what comes next, and what changed or is blocked. Use it when the user resumes a tracked work item after a gap or when it resolves uncertainty. It is an informational summary, not a mandatory confirmation card.

If the user already asks to revise a specific section, begin that authorized work after the relevant checks. Do not force them to approve a generic previous next step. Do not greet every unrelated question with a report-status summary.

### 8.3 External changes and limits

The assistant detects external changes when it can access and inspect the relevant source. It does not continuously monitor files between turns unless a separate, explicitly established capability provides that service. Record the last checked version and coverage; do not claim automatic discovery of inaccessible changes.

A commit identifier alone does not identify uncommitted content. Use relevant file differences or other available revision evidence. Different local and deployed versions must remain distinguishable. When multiple interpretations remain, preserve the conflict and ask a narrow question rather than silently choosing a favorable source.

### 8.4 Single-writer updates and interruption recovery

All participating skills and agents use the same adopted records. Readers and reviewers return findings; the designated editor performs persistent updates. Before writing, check whether another actor has changed the target since it was read. Preserve unrelated user notes and changes.

Save and verify the actual deliverable first when it is being edited, then update the affected project observations and work-plan checkpoint in a defined sequence. Link them through the same change description or revision reference inside the existing records. Check that the combined saved state is consistent before calling it synchronized.

This is a recoverable sequence, not a promise that multiple file writes are atomic. If one write fails, identify the saved and unsaved parts. On relevant resumption, reconcile from real artifacts and evidence before continuing. Do not generate a third recovery tracker or claim a saved report from a plan entry alone.

## 9. Integration with skills, rules, templates, and agents

The following table assigns proposed responsibilities. It does not assert that the integration has already been implemented or tested. Shared rules should have one canonical owner and be referenced by consumers to avoid contradictory copies.

| Component | Required integration |
|---|---|
| `AGENTS.md`, `adapters/pi/bootstrap.md`, host routing | Keep classification, setup authorization, bounded discovery, and current-prompt routing consistent. A continuation does not automatically advance the previous stage. |
| `skills/using-workspace-superpowers/SKILL.md` | Select the current operation, recover the adopted records, and coordinate handoffs; do not author content or create a parallel state system inside the router. |
| `references/work-tracking.md` | Own the two-record model, creation/reuse policy, readable progress semantics, revision-scoped approvals, checkpoints, and recovery. |
| `references/workflow-continuity.md` | Own the prompt-intent distinctions, change-of-order behavior, temporary switches, and bounded propagation of change. |
| `references/project-grounding.md` | Own evidence provenance, readiness, source versions, permissions, record placement, and conflicts between intention and implementation. |
| `references/document-continuity.md` | Connect prior conclusions, terminology, voice, scenario, and adjacent prose to the affected work items. |
| `references/criteria-writing-contract.md`, `references/outline-structure.md` | Keep master planning separate from criterion analysis/outline/draft approvals and evidence readiness. Apply changed decisions only to their actual scope. |
| `references/guided-questions.md`, `references/language-policy.md` | Keep questions natural and necessary; preserve language decisions without inferring approval from a card, silence, or discussion. |
| `templates/work-plan.md` | Put human-readable orientation and whole-report progress first; consolidate duplicate registers and retain compact source/decision/version traceability. |
| `templates/brief.md`, `templates/outline.md`, `templates/deliverable-contract.md` | Treat these as reusable structures, not mandatory additional files for every report. Persist applicable information in the adopted records unless separately requested as a deliverable. |
| `skills/scoping-the-brief/SKILL.md` | Resolve only material unknowns, distinguish setup consent from content approval, and reuse settled identity fields. |
| `skills/reading-artifacts/SKILL.md` | Return actual headings, relevant passages, source revisions, and unread limits; read changed content before relying on old summaries. |
| `skills/analyzing-artifacts/SKILL.md` | Compare records with actual content, distinguish facts from proposals, identify dependencies, and report concrete remaining work. |
| `skills/brainstorming/SKILL.md` | Offer alternatives when a genuine choice remains; recommendation is not adoption. After a choice, hand the decision and affected scope back to the appropriate specialist. |
| `skills/planning-work/SKILL.md` | Own the whole-report outline, item relationships, provisional distant work, and revised next actions. Do not treat the initial outline as immutable. |
| `skills/drafting-prose/SKILL.md`, `skills/writing-reports/SKILL.md`, `skills/writing-academic-prose/SKILL.md` | Consume current approved scope, relevant evidence, and adjacent prose; return actual content changes and limitations for tracking. Do not self-approve or create another tracker. |
| `skills/editing-documents/SKILL.md` | Persist authorized changes as the single writer; preserve approved baselines and user edits, then request verification. |
| `skills/working-with-visuals/SKILL.md` | Bind each proposed or approved figure to its source, report item, asset version, and readiness; distinguish project screenshots from theoretical illustrations. |
| `skills/researching-sources/SKILL.md`, `skills/citing-sources/SKILL.md` | Return checked sources and claim mappings; changed sources trigger affected citation and argument checks without starting unrequested research. |
| `skills/converting-artifacts/SKILL.md`, `skills/formatting-layout/SKILL.md` | Preserve approved content, figures, tables, and template requirements in exports; report source/export identity and verification needs back to the shared plan. |
| `skills/reviewing-work/SKILL.md` | Check requirement coverage, continuity, evidence, and changed-section effects before delivery. Review findings are not user decisions. |
| `skills/verifying-artifacts/SKILL.md` | Reopen the report and changed records, validate their links and version relationships, and identify incomplete synchronization. |
| `skills/packaging-deliverables/SKILL.md` | Report actual verified outputs and export currency; do not create a new progress or handoff file as a packaging side effect. |
| `agents/inspector.md`, `agents/drafter.md` | Receive the same canonical record paths and bounded source context; return evidence/drafts without maintaining private state files. |
| `agents/reviewer-requirement.md`, `agents/reviewer-coherence.md`, `agents/reviewer-prose.md`, `agents/reviewer-citation.md` | Check only assigned dimensions while carrying section/version/decision identity; return findings to the editor rather than silently modifying records. |
| `agents/verifier.md`, `agents/packager.md` | Verify and report the actual final artifacts and consistent checkpoint, including limitations and interrupted updates. |
| `agents/researcher.md`, `agents/formatter.md`, `agents/reviewer-visual.md` | Return sources, formatting results, and visual findings with item and artifact identity; do not create separate evidence trackers or treat an uninspected image as verified. |

No new dedicated memory agent or background service is required for this proposal. Existing roles need a shared, consistently enforced handoff contract.

### 9.1 Connection to the previously recorded improvements

**Reading completed assignments and gap analysis:** Use the 24 September record's read-back requirements. Preserve actual headings, arguments, scenario transitions, and the distinction between content already present and content still missing. Do not populate progress from a grading-grid label or an invented percentage. A later guide comparison must answer the user's remaining-work question rather than restart an unrelated intake flow.

**Brainstorming and outline quality:** Reuse the existing document brainstorming skill. Track candidate organizations as proposals, then record the user's actual choice. Detailed outlines retain the established preview-depth requirement where applicable; distant master-plan items do not need invented detail to meet it.

**Visuals, tables, citations, and Word:** Link each required visual/table/source to the report item and actual evidence or asset. Distinguish planned, available, inspected, approved, embedded, and verified states where relevant. Replacing a figure or source triggers checks of captions, citations, associated claims, and affected exports. The presence of a planned figure in the work plan does not prove it was embedded in Word.

**Voice and document continuity:** Keep the adopted terminology and narrative perspective in the plan's concise continuity notes. Read adjacent passages before continuing. A user-authorized terminology change triggers a scoped consistency review; do not overwrite accurate source quotations or different real-world roles simply to satisfy a keyword rule.

**Mathematics and other artifact types:** Preserve existing domain verification obligations when relevant, including native Word equations, spreadsheet checks, or slide evidence. Tracking readiness must not replace the specialist's actual checks or introduce those domains when the request does not need them.

## 10. Proposed implementation order

1. Consolidate the shared rules for prompt intent, record creation, responsibilities, evidence, and change propagation. Resolve source-project versus report-workspace placement explicitly.
2. Simplify the canonical work-plan template and define a compact project-context structure without introducing additional mandatory management files.
3. Update routing, planning, reading, analysis, editing, review, verification, and agent handoffs together so that they use the same records and meanings.
4. Connect the earlier reading, brainstorming, continuity, visuals, citations, and Word improvements to item dependencies and evidence state.
5. Add contract-level checks for required integration, then run behavioral scenarios on the target host. Text presence alone is insufficient evidence of correct behavior.
6. Reconcile existing records when adopting the new model. Preserve valid decisions, approved content, source links, and user notes. Do not delete old records solely to make the count equal two.
7. Build or package only under a later implementation request and verify the installed behavior separately from source-tree changes.

For existing setups, choose one canonical plan and one applicable context record, consolidate required information, verify links, and retire superseded management records only with appropriate authority and recoverability. Do not create an extra migration tracker.

## 11. Acceptance scenarios for future verification

These are proposed tests, not executed or passing results.

| ID | Scenario | Expected behavior |
|---|---|---|
| SYNC-01 | Start a long report without a project. | Establish setup consent once; create only the plan and identify project-dependent work. |
| SYNC-02 | Ask one conceptual question. | Answer it without creating a plan or project context. |
| SYNC-03 | Resume with a matching existing plan. | Reuse the canonical path and decisions; inspect relevant current sources. |
| SYNC-04 | Ask whether another technology would be better. | Compare without changing the adopted decision or implementation facts. |
| SYNC-05 | Ask for several chapter organizations. | Brainstorm options; recommendation does not become approval. |
| SYNC-06 | Explicitly adopt a new design technology. | Record the decision, identify affected sections, and preserve the distinction from implemented technology. |
| SYNC-07 | Explicitly authorize synchronizing related sections. | Revise within that scope without repeating the same permission request; preserve applicable unresolved content approvals. |
| SYNC-08 | Request a hypothetical removal. | Explain consequences without actually removing content or invalidating approvals. |
| SYNC-09 | Change only the order of work. | Update the next task, not the approved structure or unrelated completed items. |
| SYNC-10 | Revise a previously approved section. | Keep the old approval tied to its version; mark only affected current/dependent content for review. |
| SYNC-11 | Rename, move, merge, or split a section. | Preserve stable identity and criterion mapping; update locators without duplicating progress. |
| SYNC-12 | Remove content satisfying a mandatory criterion. | Explain the coverage gap; do not mark the report fully complete. |
| SYNC-13 | Edit the report outside chat. | Detect relevant differences on inspection and reconcile summaries without inventing approval. |
| SYNC-14 | Modify source files without a new commit. | Consider relevant uncommitted changes; do not treat commit equality as unchanged evidence. |
| SYNC-15 | Use an older project version intentionally. | Preserve its evidence baseline and do not silently replace it with newer project facts. |
| SYNC-16 | Introduce a project after planning. | Create/reuse the conditional context record within setup authority; link only relevant items. |
| SYNC-17 | Require real results from an incomplete feature. | Identify the gap and continue independent work; a test plan is not recorded as executed results. |
| SYNC-18 | No automated test code exists. | Check permitted alternatives before declaring testing impossible. |
| SYNC-19 | A startup/test command writes data or requires installation. | Check standing authority and effects; do not execute under a false read-only assumption. |
| SYNC-20 | Receive new evidence replacing a figure or result. | Reassess dependent claims, captions, references, and affected exports; keep provenance. |
| SYNC-21 | Change a selected document voice or term. | Review affected prose and continuity without changing unrelated project facts. |
| SYNC-22 | A subagent completes an assigned draft. | Return content and gaps to the shared workflow; create no private tracker and infer no approval. |
| SYNC-23 | Another actor changes a record before save. | Reconcile the current revision and preserve unrelated changes rather than overwriting them. |
| SYNC-24 | The report saves but a record update fails. | Report the split result and recover on resumption; do not claim full synchronization. |
| SYNC-25 | The project or previous chat content is inaccessible. | State the exact gap; do not claim current verification or reconstruct missing prose as the original. |
| SYNC-26 | A user asks a clear action after a long gap. | Provide only useful orientation and proceed with the authorized action, without a mandatory generic confirmation. |
| SYNC-27 | Multiple old trackers are present. | Reconcile identities and content before consolidation; preserve history and avoid an extra tracker. |
| SYNC-28 | An incomplete draft has been approved. | Preserve that approval and the unresolved evidence gap separately; do not label the criterion fully satisfied. |
| SYNC-29 | Routine work completes after initial tracking consent. | Update and verify records automatically; do not ask the user to maintain Markdown. |
| SYNC-30 | Current source contains brainstorming but an old issue says it was missing. | Report the historical distinction and test integration; do not create a duplicate skill or assert installed behavior. |

## 12. Completion boundaries for this issue record

At the original 27 September recording stage, this document only recorded the reported issues, accepted direction, proposed responsibilities, and future acceptance scenarios. No scenario was marked passed, and that recording task did not change the report workflow, source code, skill pack, templates, rules, agents, or adapters. The implementation update below supersedes that historical source/package status while retaining the native acceptance boundary.

Future implementation is complete only when the records remain readable, prompt intent is respected, change propagation is bounded and evidence-based, interrupted updates are recoverable, and the relevant behavioral scenarios have actual verification results on the target host.

## Implementation update — 28 September 2026

This issue is implemented at the source-contract and package-test level. The
canonical model is now limited to two management records: `work-plan.md` owns
the whole-report outline, progress, decisions, dependencies and next action;
`project-context.md` owns project identity and inspected project evidence. The
work plan and context record have separate responsibilities, stable identities,
revision- and scope-bound approvals, bounded propagation, and recoverable
single-writer checkpoints. The work-plan template starts with the current
position, deliverable/scope, whole-report outline and progress, completed
summaries, upcoming work and dependencies, and recent changes/decisions.

No concrete user project or authorized source-project setup exists for this
repository task, so no new `project-context.md` was created. The placement rule
now records report-workspace versus source-project placement and reuses one
designated context only when a concrete project and authority exist. The only
copy found under `.tmp/work-tracking-execution/project-context.md` is an older
ignored test fixture; it was not adopted or changed.

Files updated for this implementation, alongside pre-existing working-tree
changes, are:

- `references/work-tracking.md`
- `references/workflow-continuity.md`
- `references/project-grounding.md`
- `templates/work-plan.md`
- `skills/using-workspace-superpowers/SKILL.md`
- `skills/scoping-the-brief/SKILL.md`
- `skills/reading-artifacts/SKILL.md`
- `skills/analyzing-artifacts/SKILL.md`
- `skills/planning-work/SKILL.md`
- `skills/editing-documents/SKILL.md`
- `skills/reviewing-work/SKILL.md`
- `skills/verifying-artifacts/SKILL.md`
- `adapters/pi/bootstrap.md`
- `adapters/pi/routing-trial.md`
- `tests/architecture/project-tracking-synchronization.test.mjs`
- `tests/scenarios/manual/project-tracking-synchronization.md`

The focused architecture test was intentionally RED before implementation
(12 tests, 0 passed, exit 1) and is now green (12/12, exit 0). The required
regressions also pass: `real-world-refinements` 17/17, `continuity-links` 3/3,
`criteria-writing` 18/18, `criterion-gates` 9/9, `question-delivery` 7/7,
and `visual-export-citations` 6/6. The aggregate `node tests/run.mjs` result is
176/176 passed, exit 0. `python scripts/test-package-pi.py` is 5/5 passed,
exit 0. `git diff --check` exits 0.

Source and packaged checks therefore pass on branch `v0.1.5-beta` with package
version `0.1.5-beta`. SYNC-01 through SYNC-30 remain `PENDING` because no native
PI-Desktop replay or retained runtime traces were run. No background monitoring
is claimed. No rendered DOCX/PDF artifact was produced or inspected for this
issue, so rendered fidelity remains unverified; the existing visual, Word and
citation limitations are preserved.

The earlier closure record `test-issues/2026-09-24-doc-bai-da-lam.md` and the
earlier visuals/tables/Word/citations closure remain preserved; this update does
not reopen or rewrite them.

## Follow-up remediation — 28 September 2026

An independent source/package review identified two required corrections in the
implementation above and one related checkpoint gap. They are now addressed in
the working tree without changing the branch, package version or earlier issue
closures.

### Placement and survey boundary

- New `project-context.md` records default to the approved report workspace or
  another authorized output location.
- An existing adopted source-project context is reusable only at its exact
  recorded authorized path. A new source-project path is allowed only when the
  user explicitly authorizes that exact placement; this does not grant other
  repository writes.
- Survey authority alone cannot choose a new source-project path. The raw
  `adapters/pi/project-survey.mjs` utility is restricted in the adapter guidance
  to disposable fixtures or an exact explicitly authorized path; normal survey
  persistence uses the reader/analyzer/editor handoff and preserves curated
  context identity. A survey-only context update does not create a work plan.

### Single-state work plan

`templates/work-plan.md` now has one `Where We Are / Resume Here` orientation and
one readable whole-report item register made of compact per-item blocks. Each item
separates progress, evidence readiness, content locator, remaining dependencies,
approval references and verification references. Completed summaries and upcoming
work link to those records instead of maintaining a second status or next-action
copy. Legacy plans may be adopted through their equivalent sections and are
consolidated under existing editing authority rather than receiving duplicate
registers.

### Checkpoint transaction and recovery

The canonical checkpoint sequence is now: inspect current revisions before each
write; save and reopen the deliverable; update/reopen an affected authorized
context (first creation requires its own authorized placement/scope); update/reopen the plan checkpoint
last; then reread every touched record. All touched management records carry the
same change reference and source/output revisions. Absent or unaffected context
is intentionally skipped and is never created for transaction symmetry. Report,
context and plan failures retain exact saved/unsaved portions for reconciliation;
no recovery tracker is created.

The verifier, editor, reader, verifier role, PI adapter guidance and manual
operator scenarios now use this same order and boundary. The architecture test
suite contains explicit regressions for new/default placement, adopted context
reuse, exact placement override, single-state progress, per-write conflict
checks, absent context and each partial-save result. The manual SYNC cases remain
`PENDING` until native PI-Desktop transcripts and tool traces exist.

### Fresh verification

All commands below were run after the follow-up edits and exited 0:

| Check | Result |
|---|---:|
| `node --test tests/architecture/project-tracking-synchronization.test.mjs` | 14/14 |
| `node tests/run.mjs` | 178/178 |
| `python scripts/test-package-pi.py` | 5/5 |
| `python -B tests/architecture/word-visual-fidelity.test.py` | 16/16 |
| `git diff --check` | pass (only normal LF/CRLF warnings) |

An independent read-only review of the contracts, template, consumers and manual
scenario definitions found no remaining source/package blocker. It also reran
the focused suite (14/14); its scenario review was a desk review, not native host
execution. The source/package remediation is **APPROVED** within this scope. Native
PI-Desktop execution, continuous monitoring and rendered DOCX/PDF fidelity remain
`PENDING`/`UNVERIFIED`; no transcript, native Skill/tool trace or rendered
artifact was created in this session. The branch remains `v0.1.5-beta`, package
version remains `0.1.5-beta`, and the earlier closure hashes remain unchanged.

## S4 blocker remediation — 28 September 2026

The raw PI project survey had one remaining source/package blocker: omitting its
context argument wrote `<source-root>/project-context.md`, and repeated calls
could replace an adopted context. The adapter now separates inspection from
persistence. A survey with no authorized output is read-only; a new context
defaults only to an explicitly authorized report workspace; an adopted context
is returned as an editor handoff and is never refreshed by the raw writer; and a
new source-project path is accepted only when that exact path has explicit
placement authorization. Unsafe context names, traversal and source-root output
defaults are rejected before any write. Secret filtering and the no-tests guard
remain intact. Adopted contexts must carry the same exact authorized path and
placement metadata; a mismatched identity is rejected.

Checkpoint persistence is covered by the new
`adapters/pi/tracking-checkpoint.mjs` helper. It checks the expected revision
immediately before every write, saves in deliverable → affected context → plan
order, reopens and verifies the bytes after each save, skips an absent or
unaffected context, and returns exact saved/unsaved paths for deliverable,
context or plan failures. It never creates a recovery tracker. `AGENTS.md`,
`adapters/pi/bootstrap.md`, `references/work-tracking.md`,
`adapters/pi/tools.md`, `references/project-grounding.md` and the PI capability
record now use the same single `work-plan.md` progress model and survey boundary;
`progress.md` is not a second management record.

Fresh focused verification after this remediation:

| Check | Result |
|---|---:|
| `node --test adapters/pi/project-survey.test.mjs` | 15/15 PASS, including report-workspace default, adopted exact context, explicit source override, unauthorized root rejection, read-only skip, and secret/test guards |
| `node --test tests/architecture/project-tracking-synchronization.test.mjs` | 15/15 PASS, including governance, placement, conflict-before-every-write and report/context/plan partial-save recovery assertions |
| Combined focused run | 30/30 PASS |

The existing native PI-Desktop, background-monitoring and rendered-artifact
limitations remain unchanged and `SYNC-01`–`SYNC-30` remain `PENDING`. The
consolidated five-record compilation was not yet refreshed at this intermediate
checkpoint; the final post-integration update below supersedes the intermediate
aggregate and records the workspace-wide result.

### Final post-integration verification — 28 September 2026

After S3 remediation stabilized, the final checks were rerun on branch
`v0.1.5-beta`, package `0.1.5-beta`, without native PI-Desktop execution:

| Command | Result | Exit |
|---|---:|---:|
| `node --test adapters/pi/project-survey.test.mjs` | 15/15 PASS | 0 |
| `node --test tests/architecture/project-tracking-synchronization.test.mjs` | 15/15 PASS | 0 |
| Combined S4 focused run | 30/30 PASS | 0 |
| `node tests/run.mjs` | 196/196 PASS | 0 |
| `python scripts/test-package-pi.py` | 5/5 PASS | 0 |
| `git diff --check` | pass; only LF/CRLF normalization warnings | 0 |

This supersedes the earlier 178/178 intermediate aggregate. SYNC-01–SYNC-30,
native PI-Desktop transcripts/tool traces and rendered DOCX/PDF remain
`PENDING`/`UNVERIFIED`.

## Independent native acceptance attempt — 28/09/2026

The source/package approval remains unchanged. The requested `SYNC-01`–
`SYNC-30` replay was blocked because this Codex tool catalog exposed no native
`Skill` tool and Codex Document Control returned no connected document session.
The installed `local.workspace-superpowers` plugin is `0.1.4-beta`, not the
audited `0.1.5-beta` package. No current native transcript, Skill/tool trace,
model/package revision, changed path or host output was produced.

| Native cases | PASS | FAIL | BLOCKED | Issue-level status |
|---|---:|---:|---:|---|
| SYNC-01–SYNC-30 (30 cases) | 0 | 0 | 30 | `PENDING — native verification` |

The issue remains `APPROVED — source/package`; no synchronization case is
promoted to PASS from executable local fixtures or static contract checks.
