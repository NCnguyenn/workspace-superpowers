import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { createPiLifecycle } from "../../adapters/pi-cli/lifecycle.mjs";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export default function workspaceSuperpowersPiExtension(pi: ExtensionAPI) {
  createPiLifecycle(pi, { packageRoot });
}
