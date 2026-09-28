# Visual, table, Word export and citation regression cases

These operator cases are proposals for source/package and host verification. A
string match or a hand-authored fixture is **Structural PASS**, not Behavioral PASS;
native PI acceptance and actual DOCX rendering remain `PENDING` until a host trace
and artifact are retained.

| ID | Scenario | Expected behavior |
|---|---|---|
| VE01 | A theory-only heading has no useful comparison or process visual. | Record `Not needed`; do not add a decorative table or figure. |
| VE02 | A required project screenshot is absent. | Ask for the specific supported attachment/path or pasted evidence; keep the affected work blocked. Do not invent a screenshot or URL. |
| VE03 | An available figure cannot be displayed or inspected by the host. | Disclose the unavailable preview and keep the asset unapproved/unverified. Do not claim the user reviewed it. |
| VE04 | The outline proposes a source that is never verified or cited. | Keep it proposed; exclude it from final References. Do not turn discovery into provenance, credibility or reuse permission. |
| VE05 | An existing report uses IEEE or another non-Harvard style. | Preserve the established/required style; Harvard is only a fallback when no style is established. |
| VE06 | A DOCX template conflicts with suggested font, spacing, borders or caption styling. | Apply the authoritative template/rubric and disclose material conflict; do not impose defaults. |
| VE07 | Export swaps a table row, loses an image/caption, or changes the approved/requested relative position (including a lead-paragraph position when specified). | Fail structural fidelity; inspect actual cells, media relationships, inline drawing, caption/source and the adopted placement. |
| VE08 | A completed assignment is followed by a later guide asking what remains. | Preserve the completed-work read-back and narrow comparison route; state present criteria before missing criteria and do not restart intake. |
| VE09 | Run R23's working/unapproved revision variant: request export of a working draft with table cells and a figure different from the approved revision, while content review remains pending. | Preserve the requested revision and its working/approved status; do not require or grant content approval or substitute the approved revision. Verify actual table cells, media identity, inline drawing (`wp:inline`), caption/source, placement and template formatting against the working revision; retain source/output and check locators. A missing capability limits only its affected verification check; available checks still run and pending content review remains pending. |

Required evidence layers: source/package checks, actual DOCX structure, rendered
DOCX/layout, and native PI Skill/tool traces. Record `PASS`, `FAIL`, `BLOCKED` or
`PENDING` with actual locators and capability limits.
