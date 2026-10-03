# SCL03 transcript record — BLOCKED

Scenario: [SCL03: Approval waiting, side question, hide/show](../../../manual/session-checklist.md#scl03-approval-waiting-side-question-hideshow)  
Required setup: continue the exact SCL02 session; send the side question, hide instruction, and show instruction one at a time.

Status: `BLOCKED`  
Exact transcript: `UNAVAILABLE`

The operator log summarizes response-level side-question and hide/show behavior, but has no exact same-session transcript, host correlation/request identity, action payload, return path, state snapshot, plugin attribution, or independent review.

## Required future capture

```text
SCL02 session identity: <same host-provided value>
Turn 3 user/assistant: <verbatim side question pair>
Turn 4 user/assistant: <verbatim hide pair>
Turn 5 user/assistant: <verbatim show pair>
Native action and state traces: <relative paths or UNAVAILABLE>
```

A conversational acknowledgement is not evidence of a native hide/show control or callback.
