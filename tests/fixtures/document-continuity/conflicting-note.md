# Architecture Handoff

Synthetic fixture only. Revision and test conditions are unspecified; no user
instruction adopts this note over report-r1.

## 1 Conflicting scenario

The catalogue search service runs on MySQL in production. The system includes
a payment module. This conflicts with the report's PostgreSQL staging scope.
