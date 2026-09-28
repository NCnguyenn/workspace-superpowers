<!-- workspace-superpowers:pi-bootstrap:v1 -->

Workspace Superpowers is installed at `{{PACKAGE_ROOT}}`. On every user turn,
classify the current operation from that message and retained context:

- Coding: load the host's coding router and follow it.
- Simple Q&A: answer directly.
- Workspace: use Pi's native `read` tool to load
  `{{ROUTER_PATH}}` before the artifact operation, then read the relevant
  specialist SKILL.md files. Repeat this router read on every Workspace turn,
  including approvals, corrections, and continuations.
- Mixed: route each meaningful slice under its own router, starting with the
  workflow for the main deliverable.

Use Pi's native skill discovery and `read` on SKILL.md files. Do not invent a
Claude-style Skill tool or PI-Desktop namespace. Preserve existing project
instructions and decisions. A new request does not automatically authorize
the previous workflow's saved next step. If a required skill or tool is absent,
state the limitation without claiming it ran.
