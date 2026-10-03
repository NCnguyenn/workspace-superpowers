# Install and test Workspace Superpowers in ChatGPT Desktop

## Build a local package

```powershell
npm test
python scripts/test-package-chatgpt.py
python scripts/package-chatgpt.py --out dist/chatgpt
```

The generated directory is a local plugin marketplace. The build validates source
links and package bytes, but does not install a ChatGPT plugin, change ChatGPT
settings, start a server, grant Developer Mode, or establish a tunnel.

The output directory is the marketplace root. It contains `marketplace.json` and
`plugins/workspace-superpowers/`. The accompanying
`workspace-superpowers-<version>.zip` is a standalone plugin ZIP with
`plugin.json` at its archive root; it is not the marketplace file.

## Run the MCP server locally

```powershell
node adapters/mcp/server.mjs
```

The development endpoint is `http://127.0.0.1:3000/mcp`. Validate its read-only
tools/resources with MCP Inspector before connecting it to ChatGPT. ChatGPT must
reach the endpoint through an authorized HTTPS tunnel during development or a
properly deployed HTTPS endpoint; localhost alone is insufficient.

Do not place a tunnel token, ChatGPT credential, or OAuth secret in this package.
Use the selected tunnel/deployment provider's secret management. The service
makes no outgoing network call and has no credential access.

## Install the local marketplace package

1. Keep the generated output directory intact and add that directory as a local
   marketplace, for example:

   ```powershell
   codex plugin marketplace add .\dist\chatgpt
   ```

   For a repo marketplace, the equivalent file is
   `<repo>/.agents/plugins/marketplace.json`; for a personal marketplace use
   `%USERPROFILE%\.agents\plugins\marketplace.json`. Keep the generated
   `plugins/` directory beside the marketplace file because `source.path` is
   relative to that root.
2. Restart ChatGPT Desktop. Open **Plugins Directory**, select the local
   marketplace, and install `workspace-superpowers`.
3. Before MCP connection, replace the placeholder URL in the installed copy's
   `mcp.json` with an authorized HTTPS endpoint. Do not commit tunnel tokens or
   credentials.
4. Enable Developer Mode according to the account/workspace policy, add the
   HTTPS MCP connection, and review the discovered read-only tools.
5. Start a new normal conversation and use the acceptance matrix in
   [acceptance.md](acceptance.md). Repeat it separately in Work.

If the host offers ZIP upload instead of a local marketplace, upload the
generated plugin ZIP. Do not upload `marketplace.json` or the marketplace bundle
as a plugin ZIP.

ChatGPT caches a local marketplace installation. After modifying source files,
rebuild the package and restart ChatGPT Desktop; do not treat the source tree as
hot-loaded.

## Status and rollback

Local packaging and MCP Inspector validation are structural evidence. Plugin
installation, MCP discovery, normal-chat skill retrieval, and Work availability
are separate observations. If an update needs rollback, uninstall/disable the
plugin in ChatGPT Desktop and remove only the matching marketplace entry; do not
delete unrelated user configuration.
