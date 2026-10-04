# Operator-supplied installation UI — 0.1.7-beta

Source: image attached by the operator in the current chat on 2026-10-03.
Retained image: [10-install-0.1.7-beta.png](10-install-0.1.7-beta.png).
The image was copied without editing and verified byte-for-byte by SHA-256.
No desktop capture or UI automation was performed for this observation.

## Visible observations

- Plugin name: Workspace Superpowers (Local).
- Plugin identity/version label: `local.workspace-superpowers · v0.1.7-beta`.
- Scope selector label: `Everywhere`.
- Capability labels: `Panel`, `Agent extension`, `Skills`.
- Agent extension label: `Enabled, loads on next prompt`.
- Permission labels: `Run code inside the agent`, `Adjust agent instructions`,
  `Add tools for the agent`, and `+ 2 more`.

## Evidence boundary

These pixels establish the host UI's displayed package version, scope label,
capabilities and extension enablement indication. The two collapsed permissions
are not individually visible. No installed filesystem path, package hash,
host-version label, effective five-permission grant record, native tool call,
session identity or checklist transition is proven by this screenshot.

Gate 8 now has partial operator-supplied UI evidence for the new candidate;
complete runtime permission/enablement acceptance remains pending. The next
observation is a fresh Agent chat invoking the native checklist tool and panel.
