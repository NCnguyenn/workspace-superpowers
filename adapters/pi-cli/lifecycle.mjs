import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const BEGIN = '<!-- workspace-superpowers:pi-cli-bootstrap:begin -->';
const END = '<!-- workspace-superpowers:pi-cli-bootstrap:end -->';
const MISSING_MARKER = '<!-- workspace-superpowers:pi-bootstrap-unavailable:v1 -->';
const OWNED_BLOCK = /^<!-- workspace-superpowers:pi-cli-bootstrap:begin -->\r?\n[\s\S]*?\r?\n<!-- workspace-superpowers:pi-cli-bootstrap:end -->/m;
const registered = new WeakSet();

export function createPiLifecycle(pi, { packageRoot, readBootstrap = readFileSync }) {
  if (registered.has(pi)) return;
  registered.add(pi);
  const skillsDir = resolve(packageRoot, 'skills');
  const bootstrapPath = resolve(packageRoot, 'adapters/pi-cli/bootstrap.md');
  const routerPath = resolve(skillsDir, 'using-workspace-superpowers/SKILL.md');
  let cachedBootstrap;

  pi.on('resources_discover', async () => ({ skillPaths: [skillsDir] }));
  pi.on('session_start', async () => { cachedBootstrap = undefined; });
  pi.on('session_compact', async () => { cachedBootstrap = undefined; });

  pi.on('before_agent_start', async (event) => {
    const base = typeof event?.systemPrompt === 'string' ? event.systemPrompt : '';

    if (cachedBootstrap === undefined) {
      try {
        const template = readBootstrap(bootstrapPath, 'utf8').trim();
        cachedBootstrap = template
          ? template.replaceAll('{{ROUTER_PATH}}', routerPath).replaceAll('{{PACKAGE_ROOT}}', packageRoot)
          : null;
      } catch {
        cachedBootstrap = null;
      }
    }

    const body = cachedBootstrap || `${MISSING_MARKER}
Workspace Superpowers bootstrap unavailable at ${bootstrapPath}. Tell the user the Pi CLI lifecycle instructions could not be loaded; do not claim those instructions ran.`;
    const addition = `${BEGIN}\n${body}\n${END}`;
    const existing = base.match(OWNED_BLOCK)?.[0];
    if (existing === addition) return;
    if (existing) return { systemPrompt: base.replace(OWNED_BLOCK, () => addition) };
    return { systemPrompt: base ? `${addition}\n\n${base}` : addition };
  });
}
