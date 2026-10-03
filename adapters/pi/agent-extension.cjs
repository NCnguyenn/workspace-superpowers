'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const { mergeBootstrap } = require('./bootstrap-runtime.cjs');
const { HOST_TOOL_NAME } = require('./checklist-bridge.cjs');
const registered = new WeakSet();

// Packaged as .js: PI-Desktop's native extension loader does not accept .cjs.
module.exports = function workspaceBootstrap(pi) {
  if (!pi || typeof pi.on !== 'function') {
    throw new Error('Workspace Superpowers requires the native agent extension API.');
  }
  if (registered.has(pi)) return;
  const bootstrap = readFileSync(path.join(__dirname, 'bootstrap.md'), 'utf8').trim();
  if (!bootstrap) throw new Error('Workspace Superpowers bootstrap is empty.');
  const packageRoot = path.resolve(__dirname, '../..');
  const content = `${bootstrap}\n\nPackage root: ${packageRoot}\n`
    + `Resolve skill references inside that root, not the working project.\n`;

  // This result-bearing event is emitted before each real native agent turn.
  // System prompts rebuilt after compact are handled without conversation state.
  pi.on('before_agent_start', (event) => {
    const base = typeof event?.systemPrompt === 'string' ? event.systemPrompt : '';
    const systemPrompt = mergeBootstrap(base, content);
    return systemPrompt === base ? undefined : { systemPrompt };
  });
  // The native owner must not compete with the built-in four-state mirror.
  // Leave TodoWrite available as a fallback when the plugin tool was not granted.
  pi.on('tool_call', (event) => {
    if (event?.toolName !== 'TodoWrite') return;
    const available = pi.getAllTools?.().some(tool => tool.name === HOST_TOOL_NAME);
    if (available) return { block: true, reason: 'Use plugin_local_workspace_superpowers_workspace_checklist: workspace_checklist owns this workflow and its native panel. Do not create a competing TodoWrite list.' };
  });
  registered.add(pi);
};

// PI-Desktop's sidecar loader resolves CommonJS extensions through their
// default export. Keep the direct CommonJS export for local tests and older
// loaders, while exposing the same function for the native loader.
module.exports.default = module.exports;
