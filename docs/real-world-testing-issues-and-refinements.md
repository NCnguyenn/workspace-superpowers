# Real-World Testing Audit: SDLC Unit 7 Simulation & Refinement Plan

**Document ID:** `docs/real-world-testing-issues-and-refinements.md`\
**Date:** September 23, 2026\
**Target Audience:** Codex, Core Engine Developers, and Skill Maintainers\
**Subject:** Analysis of Runtime Behavioral Discrepancies and Concrete Fixes for `workspace-superpowers`

---

## 1. Executive Summary

During an end-to-end simulation of Pearson BTEC HND Computing (Unit 7: Software Development Lifecycles - Assignment 1: Software Development Plan), the agent demonstrated strong adherence to several foundational protocols:
- **Zero Silent File Creation:** Paused to interview the user regarding project identity, scope, scenario, language, and directory structure before touching the filesystem.
- **Stop Gate Discipline:** Executed Stop 1 (Requirement Analysis) and Stop 2 (Detailed Outline) consecutively with natural chat transitions, avoiding robotic tags like `[STOP 1]` or `[STOP 2]`.
- **Full In-Chat Delivery:** Delivered the complete drafted text of Section 1 directly in chat while updating `work-plan.md` in the background.

However, detailed inspection revealed **four critical behavioral regressions / gaps** against repository contracts (`criteria-writing-contract.md`, `academic-writing-style.md`, and `citing-sources.md`). This document synthesizes these four issues, examines root causes, and specifies exact remediation steps for Codex and engine developers.

---

## 2. Detailed Issue Breakdown

### Issue 1: Premature Data Generation without Pre-Analysis Evidence Interview
* **Violated Contracts:**
  - `references/criteria-writing-contract.md` (§4 Invariants, line 150): *"Never invent project names, consulting roles, business context, budgets (e.g. '$15,000'), SLAs, latency/performance numbers (e.g. '2.5s'), user counts, or other operational metrics without interviewing and confirming with the user. If unstated in source documents or prompt, ask the user or mark as a blocking gap. Never fabricate project facts."*
  - `skills/scoping-the-brief/SKILL.md` (Evidence Register & Missing Evidence Protocol).
* **Observed Flaw:**
  When analyzing Section 1 (Project Overview), the agent identified that the Food Delivery scenario lacked concrete parameters (budget, timeline, restaurant count, concurrency, DAU). Instead of pausing to interview the user *before* formulating the analysis, the agent unilaterally fabricated a benchmark package:
  - Budget: `$35,000 USD`
  - Timeline: `24 weeks`
  - Scale: `100 restaurant partners`, `5,000–10,000 DAU`, `500 peak concurrency`
  The agent then embedded these fabricated numbers directly into the Stop 1 analysis text, asking only at the very end: *"Do you want to adjust these parameters?"*
* **Impact:**
  The user is presented with a *fait accompli* (an already completed fact) rather than being consulted on project reality. This violates the core tenet that AI must not invent evidence or project constraints behind the user's back.
* **Expected Protocol & Host UI Tooling:**
  1. Upon identifying missing empirical constraints required for downstream feasibility/risk sections, the agent MUST trigger an **Evidence Scoping Gate** *before* finalizing Stop 1 analysis.
  2. On hosts supporting structured question interfaces (e.g., PI-Desktop's native `asktool` modal, as captured in runtime telemetry):
     - Present an interactive card:
       - **Question:** *"The project scenario requires baseline operational parameters (budget, delivery timeline, target scale). Do you have specific figures from your coursework or scenario brief?"*
       - **Option 1:** *"I have specific data (I will provide budget, timeline, and scale in chat)."*
       - **Option 2 (Recommended):** *"I do not have data; generate a standardized BTEC benchmark scenario ($35k budget, 24 weeks, 100 partners) as authorized illustrative data."*
  3. Only when Option 2 is chosen (or real data is supplied) does the agent set `evidence_readiness = illustrative_authorized` and proceed to render the Stop 1 Requirement Analysis.

---

### Issue 2: Paragraph Depth Deficit & Syntactic Clause-Chaining via Hyphens
* **Violated Contracts:**
  - `references/academic-writing-style.md` (Rule P1–P3, S1–S3).
  - `skills/writing-academic-prose/SKILL.md` (Paragraphs P1–P3).
* **Observed Flaw:**
  - Several narrative paragraphs in Section 1 were truncated to 2–3 short sentences (stubs).
  - The text exhibited journalistic or executive-summary phrasing, chaining complex clauses with em-dashes (`—`) rather than crafting grammatically complete, cohesive sentences:
    * *Example from draft:* `"...and deploy FoodConnect—a scalable, web-based on-demand food ordering and delivery management platform."`
* **Impact:**
  Reduces academic depth. Pearson BTEC Distinction criteria require rigorous, critical discourse that develops arguments rather than summarizing them in fragmented statements.
* **Expected Protocol:**
  - Enforce the **PEEL Framework** (Point, Explanation, Evidence/Example, Link) for all analytical paragraphs.
  - Benchmark analytical paragraphs at **4 to 5 fully developed sentences** (not mechanical filler, but complete logical development).
  - Eliminate casual hyphen/dash chaining (`—`) where formal subordinate clauses or coordinating conjunctions belong.

---

### Issue 3: Hanging In-Text Citations without Terminal References List
* **Violated Contracts:**
  - `skills/citing-sources/SKILL.md` (Lines 35 & 72):
    * *"Bidirectional completeness: Every citation in the body text must match an entry in the reference list. Every entry in the reference list must be cited in the text."*
    * *"Common mistakes: Citing a reference in the text that does not exist in the final reference list (or vice versa)."*
  - `references/citation-styles.md` (Harvard formatting specification).
* **Observed Flaw:**
  The drafted text embedded formal in-text Harvard citations:
  - `(Sommerville, 2016)` in Section 1.1.2.
  - `(PMI, 2023)` in Section 1.2.1.
  However, the agent concluded the turn **without generating a `## References` section** at the end of the delivered draft or in `Food_Delivery_Platform_SDP/SDP_Report.md`.
* **Impact:**
  Academic assessors mark orphan / hanging citations as non-compliant or potential plagiarism because the source cannot be verified without full bibliographic metadata (author, title, edition, publisher, place of publication).
* **Expected Protocol:**
  Whenever `drafting-prose` or `writing-academic-prose` introduces in-text citations, it must append a localized or cumulative `## References` section in Harvard format:
  ```markdown
  ## References
  - Project Management Institute (PMI) (2023) *A Guide to the Project Management Body of Knowledge (PMBOK Guide)*. 7th edn. Newtown Square: Project Management Institute.
  - Sommerville, I. (2016) *Software Engineering*. 10th edn. Boston: Pearson Education.
  ```

---

### Issue 4: Severe List & Table Overuse ("Bullet-itis" / Narrative Dilution)
* **Violated Contracts:**
  - `references/academic-writing-style.md` (Rule L1 & L6):
    * *"L1 — Prose: Developing an argument, explaining a mechanism, interpreting evidence, or connecting causes and limits. Do not reduce that reasoning to bullet fragments."*
    * *"L6 — Report body: Write report and assignment bodies in developed paragraphs by default... An outline expanded into bullet stacks or numbered mini-answers is not finished analytical prose."*
* **Observed Flaw:**
  In Section 1, prose narrative made up less than **30%** of the word count:
  - Section 1.2.1: 5 enumerated items (Objective 1 to 5).
  - Section 1.2.2: 1 introductory line followed by a 5-row table (Table 1.2).
  - Section 1.3.1: 5 bullet points.
  - Section 1.3.2: 4 bullet points.
  - Section 1.3.3: 4 bullet points.
  - Section 1.3: Concluded with another 4-row table (Table 1.3).
* **Impact:**
  The deliverable resembles a slide deck transcript or a requirements checklist rather than an academic Software Development Plan. Assessor feedback on BTEC reports with excessive bullets is universally negative regarding evaluative depth.
* **Expected Protocol:**
  - Use bullet points strictly for truly parallel, atomic items (e.g., technical stack items).
  - Convert objectives, scope justification, and project constraints into cohesive analytical paragraphs that explain *why* each boundary exists, how constraints interrelate, and how trade-offs are managed.
  - Tables should serve as high-density visual summaries that accompany—not replace—detailed evaluative prose.

---

## 3. Remediation Architecture for Codex

To resolve these discrepancies across the skill pack, Codex should implement the following targeted modifications:

```
workspace-superpowers/
├── references/
│   ├── criteria-writing-contract.md  <-- Add explicit "Evidence Interview Pre-Gate" rule
│   └── academic-writing-style.md     <-- Tighten L1/L6 enforcement & anti-dash prose rules
├── skills/
│   ├── scoping-the-brief/SKILL.md    <-- Mandate asktool/question prompt when metrics missing
│   ├── writing-academic-prose/SKILL.md <-- Require PEEL 4-5 line paragraphs & prose over bullets
│   └── citing-sources/SKILL.md       <-- Enforce automated bidirectional reference list appending
└── adapters/pi/
    └── bootstrap.md                  <-- Update asktool guidance: permit structured evidence interview
```

### Actionable Code & Rule Changes

#### A. In `references/criteria-writing-contract.md`:
Clarify that missing factual metrics (budget, duration, scale) cannot be arbitrarily defaulted inside the Stop 1 analysis card. Require an explicit pre-analysis question:
> *"When a vocational scenario requires factual bounds (budget, timeline, concurrency, business scale) not specified in the prompt or rubric, the agent MUST NOT invent defaults within the analysis card. It must initiate an evidence clarification interview (via interactive modal if supported, or targeted chat question) to ask if real data exists or to obtain explicit authorization for illustrative benchmarks."*

#### B. In `adapters/pi/bootstrap.md`:
Refine the negative constraint on `asktool`:
> *"Reserve `asktool` for: (1) upfront evidence clarification when project metrics are missing, (2) selecting between branching technical paths, or (3) explicit user request for interactive cards. Do NOT use `asktool` merely to block the reading of delivered drafts or long-form outlines."*

#### C. In `skills/citing-sources/SKILL.md` & `skills/drafting-prose/SKILL.md`:
Add a mandatory post-drafting check:
> *"If any in-text citation `(Author, Year)` exists in the generated text, verify that a corresponding `## References` section exists at the bottom of the drafted section/document before completing the turn."*

#### D. In `references/academic-writing-style.md`:
Reinforce Rule L6 and add a prose-to-list ratio guideline:
> *"For core report sections, discursive prose must comprise at least 65% of the total section word count. Tables and bullet points must not form the sole content of adjacent subsections."*

---

## 4. Verification Scenario for Codex

To confirm that the fixes are working, Codex should execute a regression trial with the following prompt:
1. **User input:** *"Tôi chọn làm Assignment 1, Kịch bản Food Delivery. Bạn làm phần đầu tiên nhé."*
2. **Success Criteria:**
   - [ ] Agent pauses and detects missing project scale/budget.
   - [ ] Agent triggers an interactive question card (`asktool` on PI-Desktop or chat fallback) asking if the user has data or wants standard illustrative defaults.
   - [ ] Upon user consent, agent delivers Stop 1 Requirement Analysis with authorized benchmarks.
   - [ ] After outline approval, drafted Section 1 contains 4–5 sentence PEEL paragraphs, minimal bullet points, no dash-chained definitions, and a complete `## References` section at the end.
