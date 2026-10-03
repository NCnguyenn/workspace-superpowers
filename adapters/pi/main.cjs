'use strict';

// Desktop plugin-process notifications cannot change the agent prompt.
// The manifest registers the separate native agent extension for that purpose.
const { existsSync } = require('node:fs');
const path = require('node:path');
const bridgePath = existsSync(path.join(__dirname, 'checklist-bridge.cjs'))
  ? './checklist-bridge.cjs' : './adapters/pi/checklist-bridge.cjs';
const { createController, TOOL_NAME, toolSchema } = require(bridgePath);
let controller;
let sdk;
function main() {}

module.exports = Object.assign(main, {
  async onLoad(api = globalThis.pi) {
    if (!api?.agent?.registerTool || !api?.ui?.openPanel || !api?.session?.getLlmContext) {
      throw new Error('PI-Desktop 0.16.0 plugin SDK with agent.tool.register, ui.panel and session.read is required');
    }
    sdk = api;
    controller = createController(api);
    try {
      await api.agent.registerTool({ name: TOOL_NAME, risk: 'low', schema: toolSchema,
        description: 'Own the request-scoped session checklist in the native Workspace Checklist panel. Use create for multi-stage work, status to read stable task IDs/revision, update verified outcomes, and explicit show/hide/pause/resume/cancel/replace/reopen/omit actions. The host supplies session identity; never invent IDs. Pause preserves approvals and blockers. Completion needs evidence; approval and blocker resolution need explicit evidence. Use trace to inspect native transition receipts.',
        execute: (args, context) => controller.execute(args, context),
      });
      await api.commands.register({ id: 'workspace-checklist.show', title: 'Show Workspace Checklist',
        keywords: ['checklist', 'progress', 'workspace'], run: () => controller.show() });
    } catch (error) {
      await api.agent.unregisterTool(TOOL_NAME).catch(() => {});
      controller = undefined; sdk = undefined;
      throw error;
    }
  },
  async onPanelInvoke(channel, payload) {
    if (!controller) throw new Error('Workspace Checklist plugin is not loaded');
    return controller.panel(channel, payload);
  },
  async onUnload() {
    const api = sdk; controller = undefined; sdk = undefined;
    if (!api) return;
    await Promise.allSettled([api.agent.unregisterTool(TOOL_NAME), api.commands.unregister('workspace-checklist.show'), api.ui.closePanel()]);
  },
});
