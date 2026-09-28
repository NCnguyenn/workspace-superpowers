'use strict';

// Desktop plugin-process notifications cannot change the agent prompt.
// The manifest registers the separate native agent extension for that purpose.
function main() {}

module.exports = Object.assign(main, {
  async onLoad() {},
  async onUnload() {},
});
