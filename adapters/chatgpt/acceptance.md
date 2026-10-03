# ChatGPT Desktop acceptance matrix

Record one row for each surface and build. A package or tool-list result alone is
not a model-behavior result.

| Surface | Desktop build | Account/workspace policy | Developer Mode | Plugin installed | MCP discovered | Skill retrieved | Result/evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Normal conversation | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | Run after HTTPS MCP connection is configured. |
| Work | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | Verify independently; do not inherit normal-chat status. |

## Required checks

1. The local marketplace entry points to the generated plugin through a relative
   path inside the marketplace root, with `source: "local"` and an available
   installation policy.
2. The standalone ZIP has `plugin.json` at its archive root and contains no
   marketplace sibling file.
3. ChatGPT Desktop installs the cached plugin after restart.
4. Developer Mode discovers the configured MCP endpoint over HTTPS.
5. `list_workspace_skills` returns 24 skills and `get_workspace_skill` returns the
   router and one specialist with a matching digest.
6. Invalid skill IDs, traversal-like resource paths, and symlinked directories
   return errors without exposing filesystem content.
7. A normal conversation can use the retrieved router and specialist instructions
   without claiming unavailable host actions.
8. Work is tested as its own surface. If it does not expose the connection or
   plugin, record BLOCKED/UNSUPPORTED and do not route around that limitation.
