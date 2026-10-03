# Antigravity capability record

This record is what the packaging probe detected. It is not an installation record and not proof that a model followed a skill.

## Detected

| Item | State | Evidence |
|---|---|---|
| Antigravity Desktop | 2.18.1 detected locally | Windows uninstall record. The requested 2.19.1 target is not installed and remains unverified. |
| `agy` CLI | present | `agy --version` printed `1.2.2`. Binary: `C:\Users\CHI NGUYEN\AppData\Local\agy\bin\agy.exe`. |
| Plugin directory shape and host docs | documented locally | `C:\Users\CHI NGUYEN\.gemini\antigravity\builtin\skills\agy-customizations\docs` describes `plugin.json`, `skills/`, `rules/`, optional hooks and MCP configuration. |
| Skill frontmatter | documented locally | The same `skills.md` requires `name` and `description`; the installed host documentation is not a 2.19.1 runtime acceptance result. |
| Rule size | documented locally | `rules.md` caps each rule file at 24,000 bytes and says `AGENTS.md` has no frontmatter. |
| `agy plugin validate` | verified on a throwaway directory | A scratch plugin with UTF-8 `plugin.json` without a BOM and one skill exited 0 and reported `skills: 1 processed`. Adding an agent file without Antigravity frontmatter made validate report `agents: 1 processed`, so this package does not ship an `agents/` directory. |
| Import list | empty at probe time | `agy plugin list` printed `No imported plugins.` That list is not the same as files already present under `~/.gemini/config/plugins`. |

## Not detected

| Item | State | Limit |
|---|---|---|
| Plugin install/enable in Desktop | not run | The builder deliberately does not install or enable a plugin. Perform this only after the target Desktop version is present and retain the smoke-test evidence. |
| `mcp_config.json` package integration | unverified | Local documentation describes optional MCP configuration, but its exact runtime schema and launcher semantics have not been exercised in Antigravity Desktop 2.19.1. |
| Word, PDF, slides, spreadsheets, images | unverified | No Office or export probe was run for Antigravity. |
| In-agent tool names and subagent schema | unverified | `agy --help` lists CLI flags, not in-agent tools. A third-party note names `invoke_subagent`; this adapter does not require it. |
| Skill slash commands | unverified | Not exercised. |
| Model application | unverified | `plugin validate` does not run a model. |
