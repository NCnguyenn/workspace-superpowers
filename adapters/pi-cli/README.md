# Pi CLI adapter

The package's `pi.extensions` entry points to `.pi/extensions/superpowers.ts`;
`pi.skills` and `resources_discover` identify the portable skill directory.
Use Pi CLI's package installation flow with this repository. The PI-Desktop
`.piplug` is a separate distribution and must not be used as a Pi CLI package.

The extension registers `before_agent_start` to return a system prompt containing
the small bootstrap and absolute package/router paths. It preserves other system
instructions, refreshes its owned block and reads again after `session_start` or
`session_compact`. Missing bootstrap content produces a visible limitation.

`invoke_skill(name)` in portable guides means reading the corresponding SKILL.md
with native `read`. Other capabilities map to actually exposed tools; this adapter
does not install artifact renderers or invent a subagent tool. Specialist and
router invocation requirements remain the same; each Workspace turn re-reads the
router. The extension itself does not claim the router was already loaded.

Run `node --test tests/architecture/pi-lifecycle-adapter.test.mjs` for event-boundary
tests. They use the executable adapter with a controlled event boundary, not a
real model session. Native Pi CLI installation, tool traces and behavioral
acceptance remain unverified.
