# Catalogue Search Evaluation

Synthetic fixture only. All people, institutions, observations, figures and
internal notes below are invented test inputs, not real project evidence or
external citations. Revision: report-r1. Output language: English. This is an
individual report; the adopted authorial reference is `the author`.

## 1 Project context and terminology

The author evaluates the catalogue search service on a staging environment.
The implementation uses PostgreSQL and compares a baseline configuration with
an indexed configuration. The scope excludes production deployment, payments
and caching modules. Lecturer Mei assesses this report at College North. Teacher
Rao supplies classroom requirements at Partner School South. Professor Vale is
a department head at University West and has no assessment role in this project.
These are three distinct people with different institutional roles.

## 2.1 Recorded observation

The author inspected synthetic run N1, which recorded a mean latency of 412 ms
for the baseline configuration and 287 ms for the indexed configuration. Both
values concern the same staging dataset. This observation supports comparison
of those configurations under that condition; it does not establish production
performance or a causal result beyond the recorded run. The adopted labels are
`baseline configuration` and `indexed configuration`, not `cache`.

## 2.2 Limits and next contribution

CPU usage and p95 latency were not measured. Repeated trials remain planned work.
The next section, 2.3, must therefore explain how further evaluation would address
these gaps before any production recommendation can be supported.

## Appendix A Source wording and illustration

The synthetic internal note N2 uses the exact quotation, "We asked the professor
to review the lesson." That quotation describes a separate teaching example, not
the report author's voice or Lecturer Mei's title. Its source title is
`Teacher and professor feedback`; preserve that source wording in citations and
references. The author records it as terminology from N2, not an adopted role
name for the project.

Hypothetical illustration, not a measured project result: an 80% CPU reduction
would warrant investigation if a future comparable test observed it. No such
result has been observed in this report.

## References

[N1] Synthetic internal run note, supplied within this fixture, revision 1.
[N2] Teacher and professor feedback. Synthetic internal teaching note, revision 1.
