# Antigravity Desktop plugin package

This package targets the locally observed Antigravity Desktop plugin contract.
The detected installation is 2.18.1; it is **not** a claim that the package has
been accepted by the requested 2.19.1 build. Before installing in 2.19.1, run:

```powershell
python scripts/probe-antigravity-desktop.py
```

The probe is read-only: it reports registered Desktop versions, the `agy` CLI,
and bundled plugin-contract documents. It does not alter a plugin, desktop app,
or user configuration.

Build a directory plugin. This command does not install it and does not copy it into the Antigravity config.

```powershell
python scripts/package-antigravity.py --out dist/antigravity
agy plugin validate dist/antigravity/workspace-superpowers
```

The build also runs `agy plugin validate` on the new directory and writes that result into `build-record.json`. Validation checks the directory. It does not enable the plugin.

Do not run `agy plugin install` as part of this build. That subcommand installs. A token after `install` is a target, not a help flag.

The installable unit is the `workspace-superpowers` directory. The zip beside it is only a transport copy of the same files, with `plugin.json` at the archive root.

The generated plugin sets `"disabled": true` so a later manual copy does not activate until someone enables it. Enabling or installing is a separate decision. This repository build does not make that decision.

Host mapping: [tools.md](tools.md). Detection limits: [capabilities.md](capabilities.md).
