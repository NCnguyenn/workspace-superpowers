# Continuity regression corpus

These are synthetic fixtures, not real project measurements, external sources,
model responses or native PI transcripts. `cases.json` supplies requests,
candidate passages and expected review observations for a human or independent
model reviewer. Source citations resolve to exact text under named headings in
the companion files. Candidate evidence must exist verbatim in its candidate.

The architecture suite checks the instruction contracts and corpus integrity:
source locators, positive/negative contrasts, coverage and review boundaries.
It does not classify arbitrary prose, execute a model or establish Behavioral
PASS. In particular, occurrence of `teacher`, `lecturer` and `professor` together
is not a failure criterion. The intended interpretation depends on the identified
people, institutions, authorship scope and quoted/source wording.

Use the manual protocol at
`tests/scenarios/manual/document-continuity-consistency.md` for actual sequential
turns. All new native cases begin PENDING. Keep source/package results, observed
model behavior, native PI tool traces and rendered DOCX results separate.

Do not silently revise a fixture's expected finding to make a test pass. Revisit
its source passage and contract first. A source profile is not an approval record
or independent verification of the synthetic observations.
