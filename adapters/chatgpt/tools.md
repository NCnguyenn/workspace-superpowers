# ChatGPT capability mapping

## Read-only MCP surface

| Operation | MCP name | Boundary |
| --- | --- | --- |
| Discover packaged skills | `list_workspace_skills` | Returns 24 skill IDs, descriptions, and SHA-256 content digests. |
| Retrieve one skill | `get_workspace_skill` | Accepts only a known lower-case hyphenated skill ID. |
| Retrieve packaged support material | `get_workspace_resource` | Accepts only Markdown below `references/` or `templates/`; traversal and symbolic links are rejected. |
| Inspect capability limits | `workspace-superpowers://capabilities` | Declares unavailable operations instead of emulating them. |

The service cannot read arbitrary files, write files, execute a shell command,
make network requests, access credentials, or perform Office automation.

## ChatGPT modes

- **Normal conversation:** Developer Mode can connect a reachable MCP endpoint
  and the desktop Plugins Directory can install a local marketplace package.
  This is pending live acceptance for the user's ChatGPT Desktop build/account.
- **Work:** Do not assume that a normal-chat plugin or MCP connection also appears
  in Work. Record a separate acceptance result; unavailable is a valid result.
- **Composer or rich panels:** Not included in this package. They need an
  independent Apps SDK/UI acceptance test before they can be claimed.
