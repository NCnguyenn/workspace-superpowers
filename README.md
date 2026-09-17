# Workspace Superpowers

Workspace-domain counterpart of [obra/superpowers](https://github.com/obra/superpowers): an installable **skill pack** for knowledge and office work.

It is not a coding framework, not a UI plugin, and not a document-generator library. After install, workspace prompts auto-route. Do not type `/skill`.

Core lifecycle: **route → scope → read → analyze → plan → edit → review → verify → package**. Trivial work skips ceremony, never verification.

The root `package.json` `"pi"` field is distribution/discovery metadata only. Skills are portable and must not depend on it.

See `docs/workspace-superpowers-design.md`.
