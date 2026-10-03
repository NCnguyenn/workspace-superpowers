# Workspace Superpowers for ChatGPT Desktop

This package provides the Workspace Superpowers skill catalogue and a read-only
MCP service. It supports discovery and retrieval of the 24 packaged skill
instructions; it does not itself provide unrestricted files, shell commands,
network access, credentials, or Office automation.

Use the current request to select an appropriate skill. For document, research,
office, or knowledge-artifact work, retrieve
`using-workspace-superpowers` first, then retrieve the specialists it names.
For coding requests, use ChatGPT's coding workflow. Answer a simple question
directly when no artifact workflow is needed.

A package being installed, or an MCP tool appearing in a conversation, does not
prove that every ChatGPT surface exposes it. Follow the acceptance matrix in
`adapters/chatgpt/acceptance.md` and report unavailable capabilities rather than
inventing a host tool.
