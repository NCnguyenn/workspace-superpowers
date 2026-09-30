# Antigravity capability mapping

Target: Antigravity CLI `agy` 1.2.2, probed on Windows. These are conceptual mappings for this package. They are not a claim that a model applied them.

| Concept | Host mapping |
|---|---|
| `invoke_skill(name)` | Read `skills/<name>/SKILL.md` from this plugin root. Do not call PI-Desktop `Skill` or use `local.workspace-superpowers/<name>`. |
| Workspace turn entry | The always-on rule is `rules/AGENTS.md`. It points at `skills/using-workspace-superpowers/SKILL.md`. Read that file before Workspace artifact work, including approvals and continuations. |
| Read, list, search, write | Use the host's current file tools. This probe did not re-verify in-agent tool names. Resolve links from the instruction file. |
| `delegate(role, context)` | Read `roles/<role>.md` and perform that role in the main agent. Source role files live in `agents/`; the package relocates them so Antigravity does not treat them as registered subagents. Do not invent a subagent call. |
| Render, export, inspect Office or PDF | Not detected for this host. Say so. Do not claim Word, PDF, slide, spreadsheet, or image export from this package. |
| Research and citations | Use a host search or retrieval tool only when one is actually available and the request authorizes it. |
| Questions and approvals | Ask in the conversation. Do not assume PI-Desktop `asktool`. |

See [the detection record](capabilities.md). Installation steps are in [install.md](install.md).
