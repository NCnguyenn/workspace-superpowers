'use strict';

// Desktop plugin-process notifications cannot change the agent prompt.
// The manifest registers the separate native agent extension for that purpose.
// TodoWrite execution and the built-in chat checklist belong to the host.
// Loading/unloading this plugin must not register tools, commands or panels.
function main() {}

module.exports = Object.assign(main, {
  async onLoad() {},
  async onUnload() {},
});
