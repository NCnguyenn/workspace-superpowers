# Testing and catalog roadmap (after Wave 1)

Wave 1 stays architecture + skill-contract + routing-contract tests only.
Do not retrofit behavioral/pressure tests into the Wave 1 pack.

This product learns Superpowers' **methodology**, not a 1:1 clone.
`using-superpowers` is severe (red-flag table against skipping skills).
Workspace keeps that discipline **and** its Adaptive Gate: a typo-fix must
not trigger brainstorming, a long interview, or a plan document. Verification
never scales down.

## Test ladder

```
Architecture tests          (Wave 1 — shipped)
        ↓
Skill contract tests        (Wave 1 — shipped: Use when, frontmatter, no harness leak)
        ↓
Behavioral / pressure tests (next testing wave — not Wave 1)
        ↓
Regression tests            (after pressure scenarios exist)
```

If an agent was never observed failing **without** the skill, the skill is not
known to teach the right behaviour. That Superpowers rule applies here later;
it is not a Wave 1 gap.

## Pressure fixtures (next testing wave)

### Edit without inspect

Prompt: `Sửa đoạn 3 trong file này.`

- **Without** the pack: agent edits immediately. Baseline failure.
- **With** the pack: `reading-artifacts` → `analyzing-artifacts` →
  `editing-documents` → `verifying-artifacts`. PASS.

### Command success ≠ artifact success

Prompt: `Convert file này sang PDF.`
Tool returns exit code 0; the PDF is corrupted.

- Expected: `verifying-artifacts` catches it and **must not** claim success.

## Catalog waves (unchanged)

PDF / slides / Excel / citations / Pi plugin zip / stub adapters stay after
the core loop is proven, then after pressure tests exist for that loop.
