# Install Workspace Superpowers for dogfooding

This local preview targets PI-Desktop 0.15.1. Package validation does not certify
model behavior or Office rendering. Keep the original source documents intact.

## Install

1. Open PI-Desktop's **Plugins** page. Use its install-from-package action and
   select `local.workspace-superpowers-0.1.1.piplug` from the build output.
   The unpacked `local.workspace-superpowers` folder can also be selected with
   install-from-folder. Do not select the source repository root.
2. Review the requested `agent.prompt.inject` permission in PI-Desktop and grant
   it to enable the skill catalog. The host owns this permission decision.
3. Confirm Workspace Superpowers is enabled for the project being tested.
   Start a fresh conversation. If the catalog remains stale, restart PI-Desktop.
4. Confirm **23 distinct skills**, including
   `local.workspace-superpowers/using-workspace-superpowers`, are available.

## Enable automatic routing

Installing a plugin exposes skill metadata; it does not execute an `AGENTS.md`
stored inside the plugin. For a first test, copy the packaged `dogfood/` directory
to a new working directory and open that copy as the PI-Desktop project. It
already contains the bootstrap as `AGENTS.md`.

For an existing project, merge the marked block from
[bootstrap.md](bootstrap.md) into that project's existing `AGENTS.md`, preserving
its other instructions. Do not add a duplicate block. If an `AGENTS.override.md`
takes precedence, merge into the effective instruction file instead. Global
instructions under `~/.pi/agent/AGENTS.md` are optional and are never changed by
this package. See [tools.md](tools.md) for host mappings.

The bootstrap uses the normal installed plugin directory. If using PI-Desktop's
development-directory loading instead of installation, set the package root in
the bootstrap to the actual path displayed by the app.

## First real task

Follow [the dogfooding checklist](dogfood.md). Supply a copy of a real
PDF or Word document. First ask for analysis and an outline, then explicitly
authorize drafting when the outline is ready. Retain prompts, responses, source
references, and output paths. Open the final DOCX/PDF/PPTX in the target viewer.

## Update or remove

Build into a fresh output directory, then use the Plugins page's install/update
flow for the same plugin ID. Follow any host update/permission prompts. To undo,
disable or uninstall Workspace Superpowers through the Plugins page and remove
only the marked bootstrap block from projects where you added it. Your source
documents and generated reports remain in their working directories.

## Build from source

Requires Python 3.9 or later, standard library only. From the repository root:

```powershell
python scripts/test-package-pi.py
python scripts/package-pi.py
```

The default output is `dist/pi`. Existing output directories are refused; for
another build use `python scripts/package-pi.py --out dist/pi-next`. A working npm
installation can use `npm run test:package` and `npm run package:pi` instead.
Output includes an unpacked plugin, deterministic store-only `.piplug`, SHA-256
sidecar, and a file-hash inventory. Do not recompress using a default ZIP utility:
the inspected PI-Desktop installer rejects deflated entries.
