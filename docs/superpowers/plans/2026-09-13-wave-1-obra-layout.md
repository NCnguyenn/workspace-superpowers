# Wave 1 — Obra-layout foundation (read / analyze / edit)

> **For agentic workers:** Use superpowers:executing-plans (this wave is small; subagent-driven-development is optional). Track with checkboxes.

**Status:** Wave 1 Architecture, Scope, Tests, Skill split, and Spec synchronization are APPROVED. Ready to implement.

**Goal:** Give the repo the same skill-pack shape as [obra/superpowers](https://github.com/obra/superpowers), then ship only the first working cluster: router + read + analyze + edit + verify, and update the design spec in the same wave to record the approved inspection split and keep specification and implementation synchronized.

**Architecture:** Skills live in a flat namespace `skills/<name>/SKILL.md` (plus supporting files *inside that folder*, like obra). No `adapters/`, `agents/`, or 23-skill dump in this wave. Harness folders (`.pi`, `.claude-plugin`) come later.

**Tech Stack:** Markdown skills; Node.js `node:test` (zero extra deps).

**Spec:** `docs/workspace-superpowers-design.md` still wins on *invariants* (portable skills, no harness tool names in `skills/`, inspect → edit → verify, no citation fabrication). This wave **splits** spec §21 `inspecting-artifacts` into `reading-artifacts` + `analyzing-artifacts`. Amending §21 (and related mentions of `inspecting-artifacts`) is a **Done criterion**, not a later note.

## Locked decisions (do not reopen in this wave)

1. **Name:** `reading-artifacts`, not `reading-documents`. Generic input-reading for any existing file (document, PDF, deck, workbook, image, rubric, template). Folder, frontmatter `name`, and catalog id must match.
2. **Router fallback:** specialist missing → try a valid lower-level capability/fallback → if the task still cannot complete safely, stop and disclose the limitation. Do **not** stop only because a specialist folder is absent.
3. **Edit trigger:** `editing-documents` fires on any **substantive modification** of an existing text/document artifact (including full redesign). The preserve-list only says what must *not* change; it is not the reason the skill loads.
4. **Routing-contract tests** (string presence, not prose quality):
   - router body mentions `reading-artifacts`, `analyzing-artifacts`, `editing-documents`, `verifying-artifacts`;
   - `editing-documents` mentions `reading-artifacts`, `analyzing-artifacts`, and `verifying-artifacts`;
   - `verifying-artifacts` contains the exact sentence `Command success is not artifact success.`
5. **Spec amend is in-wave.** Wave 1 is not done while §21 still lists a single `inspecting-artifacts` lifecycle skill.
6. **Root `package.json` `"pi"` is distribution/discovery metadata only.** It does not make skills Pi-specific and is not part of the portable skill contract. No skill may depend on this field. Future harness packaging may use its own manifest without changing `skills/`.

Distinguish: `skills/` is portable. `"pi"` in `package.json` is distribution metadata. Pi APIs or tool names in `SKILL.md` are forbidden.

## Global Constraints

- Product is a skill pack, not a UI plugin and not a coding framework.
- `skills/**` never names a Pi/Claude/Codex/Antigravity tool, MCP server, or permission string.
- Every `SKILL.md`: YAML `name` + `description` starting with `Use when…`; description does not summarise the procedure.
- Heavy notes go in `skills/<name>/references/*.md`, not in the router.
- `AGENTS.md` ≤ 80 lines; classify only; no DOCX/APA procedures.
- Wave 1 ships **exactly 5 skills** listed below. Do not add PDF/slides/Excel yet.

---

## Target tree

```
workspace-superpowers/
├── AGENTS.md
├── README.md
├── LICENSE
├── package.json
├── docs/workspace-superpowers-design.md
├── skills/
│   ├── using-workspace-superpowers/SKILL.md
│   ├── reading-artifacts/SKILL.md
│   ├── analyzing-artifacts/SKILL.md
│   │   └── references/artifact-inspection.md
│   ├── editing-documents/SKILL.md
│   └── verifying-artifacts/SKILL.md
└── tests/
    ├── architecture/helpers.mjs
    ├── architecture/skill-contract.test.mjs
    ├── architecture/layer-purity.test.mjs
    ├── architecture/wave1-catalog.test.mjs
    └── architecture/routing-contract.test.mjs
```

Obra also has `.pi/`, `.claude-plugin/`, `hooks/`. **Out of Wave 1.**

---

### Task 1: Repo skeleton + invariant tests

**Files:**
- Create: `package.json`
- Create: `AGENTS.md`
- Create: `README.md` (short: what it is, not coding, no `/skill`)
- Create: `LICENSE` (MIT)
- Create: `tests/architecture/helpers.mjs`
- Create: `tests/architecture/skill-contract.test.mjs`
- Create: `tests/architecture/layer-purity.test.mjs`
- Create: `tests/architecture/wave1-catalog.test.mjs`
- Create: `tests/architecture/routing-contract.test.mjs`

**Produces:** `npm test` as the gate for Tasks 2–5.

- [ ] **Step 1: `package.json`**

```json
{
  "name": "workspace-superpowers",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "Workspace-domain skill pack counterpart of obra/superpowers",
  "keywords": ["pi-package", "skills"],
  "pi": { "skills": ["./skills"] },
  "scripts": {
    "test": "node --test tests/architecture/*.test.mjs"
  }
}
```

The `"pi"` field is distribution/discovery metadata only. Skills must not read or depend on it.

- [ ] **Step 2: `AGENTS.md`** — thin classifier (coding → Superpowers; Q&A → answer; workspace → `using-workspace-superpowers`; mixed → primary router). ≤ 80 lines. No format procedures.

- [ ] **Step 3: Tests**

`wave1-catalog.test.mjs` asserts exactly these 5 directories exist, each with `SKILL.md`:

`using-workspace-superpowers`, `reading-artifacts`, `analyzing-artifacts`, `editing-documents`, `verifying-artifacts`

`skill-contract.test.mjs`: every `SKILL.md` has frontmatter, `description` starts with `Use when`, `name` matches folder.

`layer-purity.test.mjs`: files under `skills/` must not match `agent.prompt.inject`, `mcp_`, `plugin_pi_`, `TodoWrite`.

`routing-contract.test.mjs` (skip while `WS_ALLOW_PARTIAL=1`; required after Task 4):

- `skills/using-workspace-superpowers/SKILL.md` contains all four names: `reading-artifacts`, `analyzing-artifacts`, `editing-documents`, `verifying-artifacts`
- `skills/editing-documents/SKILL.md` contains `reading-artifacts`, `analyzing-artifacts`, and `verifying-artifacts`
- `skills/verifying-artifacts/SKILL.md` contains `Command success is not artifact success.`

Until skills exist, run with `$env:WS_ALLOW_PARTIAL='1'` and skip catalog + routing-contract. After Task 4, both must pass without skip.

- [ ] **Step 4: Run** `node --test tests/architecture/*.test.mjs` — catalog/routing skip expected; other tests pass on empty `skills/`.

- [ ] **Step 5: Commit** `test: add wave-1 architecture and routing-contract tests`

---

### Task 2: Router skill

**Files:**
- Create: `skills/using-workspace-superpowers/SKILL.md`

- [ ] **Step 1: Write the skill**

```yaml
name: using-workspace-superpowers
description: Use when starting any workspace, document, research, office, or mixed knowledge-work request — before clarifying questions, planning, or touching files.
```

Body (keep short):

1. Load this before acting.
2. Existing file → `reading-artifacts` then `analyzing-artifacts` before any edit.
3. Any substantive change to an existing text/document artifact → `editing-documents` (including full redesign).
4. Before claiming done → `verifying-artifacts`.
5. Coding → Superpowers, not here.
6. Interview only if a missing fact would change the deliverable (typo-fix = no interview).

**Fallback (locked):** if a named specialist is missing, use a valid lower-level capability that still completes the job safely; if none exists, stop and disclose the limitation. Do not halt solely because the specialist folder is absent.

- [ ] **Step 2: Run skill-contract + layer-purity. Expected: PASS.**

- [ ] **Step 3: Commit** `feat: add using-workspace-superpowers router`

---

### Task 3: Đọc + phân tích

**Files:**
- Create: `skills/reading-artifacts/SKILL.md`
- Create: `skills/analyzing-artifacts/SKILL.md`
- Create: `skills/analyzing-artifacts/references/artifact-inspection.md`

Do **not** merge these into one giant `inspecting-artifacts`.

- [ ] **Step 1: `reading-artifacts`** (generic input-reading)

```yaml
name: reading-artifacts
description: Use when an existing artifact — document, PDF, deck, workbook, image, rubric, template, or other file — must be opened and its accessible content or representation read before any analysis or edit.
```

Procedure: Open the real artifact and read the representation appropriate to its type: text, pages, sheets, cells, pixels, metadata, layers, or other available structure. Reading raw bytes alone does not constitute understanding the artifact. Do not interpret yet. Do not edit. Fallback: if the file cannot be opened, stop — never guess contents.

- [ ] **Step 2: `analyzing-artifacts`**

```yaml
name: analyzing-artifacts
description: Use when a file that has already been read must be understood — structure, layout, headings, tables, what must be preserved, and what the user asked to change.
```

Procedure: structure + content + layout → requested changes → preserve-list. Per-type inspection fields (spec §10) live in `references/artifact-inspection.md`, not in `SKILL.md`.

- [ ] **Step 3: Run tests with `WS_ALLOW_PARTIAL=1`. Expected: PASS.**

- [ ] **Step 4: Commit** `feat: add reading-artifacts and analyzing-artifacts`

---

### Task 4: Chỉnh sửa + verify

**Files:**
- Create: `skills/editing-documents/SKILL.md`
- Create: `skills/verifying-artifacts/SKILL.md`

- [ ] **Step 1: `editing-documents`**

```yaml
name: editing-documents
description: Use when making a substantive modification to an existing text or document artifact — insert, delete, rewrite, restructure, or full redesign — not only when formatting must be preserved.
```

Hard rules:

- Trigger on any substantive edit of an existing document, including “redesign the whole file”.
- Must have run `reading-artifacts` then `analyzing-artifacts` first.
- The preserve-list from analyzing only names what must **not** change; it does not gate whether this skill loads.
- Then `verifying-artifacts`.
- Fallback: if in-file edit is unavailable, emit a structured change list — never claim the file changed.

- [ ] **Step 2: `verifying-artifacts`**

```yaml
name: verifying-artifacts
description: Use when any artifact has been created, edited, converted, or exported and success is about to be claimed.
```

Hard rules: reopen the real file; the body **must** contain the exact sentence `Command success is not artifact success.`; if render/visual check is unavailable, say so.

- [ ] **Step 3: Run full suite without skip**

```powershell
Remove-Item Env:WS_ALLOW_PARTIAL -ErrorAction SilentlyContinue
node --test tests/architecture/*.test.mjs
```

Expected: ALL PASS (exactly 5 skills + routing-contract).

- [ ] **Step 4: Commit** `feat: add editing-documents and verifying-artifacts`

---

### Task 5: Amend the design spec (required, not later)

**Files:**
- Modify: `docs/workspace-superpowers-design.md`

Wave 1 is **not complete** until the spec matches the five shipped skills.

- [ ] **Step 1: Update §21 (v1 skill set)** — replace lifecycle `inspecting-artifacts` with `reading-artifacts` and `analyzing-artifacts`. Keep the other v1 names unless they are explicitly out of this wave (do not invent the rest of the catalog here; only fix the inspect split and any Wave 1 name clashes).
- [ ] **Step 2: Update every other mention of `inspecting-artifacts` that describes the *shipped* lifecycle** (at least §6.3, §7 lifecycle, §8.5, §23 DOCX/typo rows) so they route `reading-artifacts` → `analyzing-artifacts` instead of one inspect skill. Do not rewrite Parts 1–4 beyond that name/flow fix.
- [ ] **Step 3: Run `npm test`. Expected: PASS.** Spec is docs; tests must still be green.
- [ ] **Step 4: Commit** `docs: split inspecting-artifacts into reading-artifacts and analyzing-artifacts`

---

## Done when

- Tree matches the target (obra `skills/<name>/SKILL.md`, `package.json` `pi.skills`).
- 5 skills, all `Use when…`, no harness leaks.
- Routing-contract tests green (router names all four; edit depends on read/analyze/verify; verify has the command≠artifact sentence).
- `npm test` green without `WS_ALLOW_PARTIAL`.
- `docs/workspace-superpowers-design.md` §21 (and inspect-lifecycle mentions) match the shipped skills.

## Explicitly later (not this plan)

PDF / slides / Excel / citations / Pi plugin zip / stub adapters / the remaining catalog.
Behavioral / pressure tests are the next *testing* wave, not a Wave 1 retrofit.
See [`roadmap.md`](./roadmap.md).
