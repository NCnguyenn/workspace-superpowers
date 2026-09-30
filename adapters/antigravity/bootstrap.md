<!-- workspace-superpowers:antigravity-bootstrap:v1 -->
## Workspace Superpowers for Antigravity

This rule is the thin bootstrap for the `workspace-superpowers` plugin.
Specialist procedure stays in the skill files. This file does not install the plugin.

Classify the current message before acting:

- **Workspace** (documents, research, office and knowledge artifacts): before the artifact operation, read `skills/using-workspace-superpowers/SKILL.md` from this plugin root, then read each selected specialist at `skills/<name>/SKILL.md`. A remembered summary is not a read.
- **Coding**: use the host coding workflow. Do not run that slice as Workspace Superpowers.
- **Simple Q&A**: answer directly when no artifact workflow is needed.
- **Mixed**: route the slices separately. The current outcome chooses the primary route.

Do not call PI-Desktop `Skill` and do not use `local.workspace-superpowers/<name>`. Those identifiers belong to another host.
Resolve links from the instruction file inside this plugin, not from the user's project directory.
Role prompts are in `roles/`. They are portable prompts relocated from source `agents/` so this plugin does not register them as Antigravity subagents. Read the role file in the main agent. Do not invent a subagent call.
Host mapping: `adapters/antigravity/tools.md`.
If a required skill or host capability is absent, state that limitation and do not claim it ran.
