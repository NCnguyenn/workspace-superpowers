'use strict';

const START = '<!-- workspace-superpowers:runtime:begin -->';
const END = '<!-- workspace-superpowers:runtime:end -->';
const MANAGED = /<!-- workspace-superpowers:runtime:begin -->[\s\S]*?<!-- workspace-superpowers:runtime:end -->/g;

function mergeBootstrap(base, bootstrap) {
  const block = `${START}\n${bootstrap.trim()}\n${END}`;
  let replaced = false;
  const result = base.replace(MANAGED, () => {
    if (replaced) return '';
    replaced = true;
    return block;
  });
  // Only blocks owned by this runtime are replaced. Legacy project instructions,
  // including a custom plugin path or ordinary heading, remain user-owned.
  return replaced ? result : (base ? `${base}\n\n${block}` : block);
}

module.exports = { mergeBootstrap };
