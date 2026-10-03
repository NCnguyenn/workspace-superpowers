# SCL04 transcript record — BLOCKED

Scenario: [SCL04: Blocker and recovery action](../../../manual/session-checklist.md#scl04-blocker-and-recovery-action)  
Required setup: fresh session; provide the synthetic brief with missing CPU evidence; send the stated follow-up in the same session.

Status: `BLOCKED`  
Exact transcript: `UNAVAILABLE`

The operator log records response-level observations, including a remediation rerun, but not exact prompts/responses, synthetic source bytes, timestamps, host/model/session identity, native blocker state trace, package identity, or independent review.

## Required future capture

```text
Session identity: <host-provided value>
Turn 1 synthetic brief and user prompt: <verbatim>
Turn 1 assistant response: <verbatim>
Turn 2 user prompt: I cannot provide CPU measurements. Keep the CPU conclusion blocked and continue only with independent supported findings.
Turn 2 assistant response: <verbatim>
Native blocker/task-state trace: <relative path or UNAVAILABLE>
```

Response prose alone cannot establish the native owner or transition of a blocked task.
