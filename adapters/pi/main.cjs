'use strict';

const fs = require('node:fs');
const path = require('node:path');

const SENTINEL = '<!-- workspace-superpowers:begin -->';
const BACKUP_SENTINEL = '## Workspace Superpowers';
const ROUTING_BLOCK = /<!-- workspace-superpowers:routing:begin -->[\s\S]*?<!-- workspace-superpowers:routing:end -->/;
const INVOCATION_BLOCK = /<!-- workspace-superpowers:skill-invocation:begin -->[\s\S]*?<!-- workspace-superpowers:skill-invocation:end -->/;

const hookedInstances = new WeakSet();

function loadBootstrapPrompt() {
  const candidates = [
    path.join(__dirname, 'adapters', 'pi', 'bootstrap.md'),
    path.join(__dirname, 'bootstrap.md'),
    path.join(__dirname, 'dogfood', 'AGENTS.md'),
    path.join(__dirname, '..', 'bootstrap.md'),
    path.join(__dirname, '..', 'adapters', 'pi', 'bootstrap.md'),
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        const content = fs.readFileSync(candidate, 'utf8').trim();
        if (content) return content;
      }
    } catch {
      // ignore read failures
    }
  }
  return '';
}

function hookPi(piInstance) {
  if (!piInstance || (typeof piInstance !== 'object' && typeof piInstance !== 'function')) return;
  if (hookedInstances.has(piInstance)) return;
  hookedInstances.add(piInstance);

  const hook = async (event) => {
    try {
      const base = typeof event?.systemPrompt === 'string' ? event.systemPrompt : '';
      const bootstrap = loadBootstrapPrompt();
      if (!bootstrap) return undefined;
      let injected;
      if (base.includes(SENTINEL) || base.includes(BACKUP_SENTINEL)
          || ROUTING_BLOCK.test(base) || INVOCATION_BLOCK.test(base)) {
        // Refresh routing and stage contracts independently. An old project
        // bootstrap or a current stage block must not suppress new routing.
        // Preserve surrounding project instructions and custom plugin paths.
        injected = base;
        for (const pattern of [ROUTING_BLOCK, INVOCATION_BLOCK]) {
          const required = bootstrap.match(pattern)?.[0];
          if (!required) continue;
          const existing = injected.match(pattern)?.[0];
          if (existing === required) continue;
          if (existing) {
            injected = injected.replace(pattern, () => required);
          } else if (pattern === ROUTING_BLOCK && INVOCATION_BLOCK.test(injected)) {
            injected = injected.replace(INVOCATION_BLOCK, (stage) => `${required}\n\n${stage}`);
          } else {
            injected = `${injected.replace(/\s+$/, '')}\n\n${required}\n`;
          }
        }
        if (injected === base) return undefined;
      } else {
        injected = base
          ? `${base.replace(/\s+$/, '')}\n\n${bootstrap}\n`
          : `${bootstrap}\n`;
      }
      try {
        if (event && typeof event === 'object') {
          event.systemPrompt = injected;
        }
      } catch {
        // ignore if systemPrompt is getter-only
      }
      return { systemPrompt: injected };
    } catch {
      return undefined;
    }
  };

  if (typeof piInstance.on === 'function') {
    piInstance.on('before_agent_start', hook);
  } else if (piInstance.events && typeof piInstance.events.on === 'function') {
    piInstance.events.on('before_agent_start', hook);
  }
}

async function onLoad(context) {
  const p = (typeof pi !== 'undefined' ? pi : null) || (context && context.pi ? context.pi : context);
  hookPi(p);
}

async function onUnload() {}

function init(p) {
  const target = (typeof pi !== 'undefined' ? pi : null) || (p && p.pi ? p.pi : p);
  hookPi(target);
}

module.exports = Object.assign(init, {
  onLoad,
  onUnload,
  default: init,
});
