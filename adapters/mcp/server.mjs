import http from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { capabilityRecord, DEFAULT_PACKAGE_ROOT, getSkill, getStaticContent, listSkills } from './catalog.mjs';

function getPackageVersion(packageRoot) {
  try {
    const pkg = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8'));
    return pkg.version ?? '0.1.7-beta';
  } catch {
    return '0.1.7-beta';
  }
}

function result(value) {
  return {
    content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
    structuredContent: value,
  };
}

function errorResult(error) {
  return { content: [{ type: 'text', text: error.message }], isError: true };
}

export function createWorkspaceSuperpowersServer(packageRoot = DEFAULT_PACKAGE_ROOT) {
  const version = getPackageVersion(packageRoot);
  const server = new McpServer({ name: 'workspace-superpowers', version });
  server.registerResource('workspace-capabilities', 'workspace-superpowers://capabilities', {
    description: 'Read-only capability and security boundary for this packaged skill service.',
    mimeType: 'application/json',
  }, async () => ({
    contents: [{
      uri: 'workspace-superpowers://capabilities',
      mimeType: 'application/json',
      text: JSON.stringify(capabilityRecord(packageRoot), null, 2),
    }],
  }));
  server.registerResource('workspace-skill-catalogue', 'workspace-superpowers://skills', {
    description: 'The packaged Workspace Superpowers skill catalogue with content digests.',
    mimeType: 'application/json',
  }, async () => ({
    contents: [{
      uri: 'workspace-superpowers://skills',
      mimeType: 'application/json',
      text: JSON.stringify({ skills: listSkills(packageRoot) }, null, 2),
    }],
  }));
  server.registerTool('list_workspace_skills', {
    description: 'List the read-only Workspace Superpowers skills packaged by this server.',
    outputSchema: { skills: z.array(z.object({ id: z.string(), description: z.string(), sha256: z.string() })) },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async () => result({ skills: listSkills(packageRoot) }));
  server.registerTool('get_workspace_skill', {
    description: 'Retrieve one exact packaged Workspace Superpowers SKILL.md by its catalogue ID.',
    inputSchema: { id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async ({ id }) => {
    try {
      return result(getSkill(id, packageRoot));
    } catch (error) {
      return errorResult(error);
    }
  });
  server.registerTool('get_workspace_resource', {
    description: 'Retrieve a packaged Markdown reference or template from an explicit read-only allowlist.',
    inputSchema: {
      area: z.enum(['references', 'templates']),
      path: z.string().min(1).max(240),
    },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async ({ area, path }) => {
    try {
      return result(getStaticContent(area, path, packageRoot));
    } catch (error) {
      return errorResult(error);
    }
  });
  return server;
}

export function createHttpHandler(packageRoot = DEFAULT_PACKAGE_ROOT) {
  return async (request, response) => {
    if (request.url !== '/mcp') {
      response.writeHead(404, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ error: 'Use /mcp' }));
      return;
    }
    if (request.method !== 'POST') {
      response.writeHead(405, { Allow: 'POST', 'content-type': 'application/json' });
      response.end(JSON.stringify({ error: 'Only POST is supported' }));
      return;
    }
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      response.writeHead(400, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ error: 'Request body must be JSON' }));
      return;
    }
    const server = createWorkspaceSuperpowersServer(packageRoot);
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    try {
      await server.connect(transport);
      await transport.handleRequest(request, response, body);
    } catch (error) {
      if (!response.headersSent) {
        response.writeHead(500, { 'content-type': 'application/json' });
        response.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: error.message }, id: null }));
      }
    } finally {
      response.once('close', () => Promise.allSettled([transport.close(), server.close()]));
    }
  };
}

export function startServer({ host = '127.0.0.1', port = 3000, packageRoot = DEFAULT_PACKAGE_ROOT } = {}) {
  const server = http.createServer(createHttpHandler(packageRoot));
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => resolve(server));
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number.parseInt(process.env.PORT ?? '3000', 10);
  startServer({ port }).then((server) => {
    const address = server.address();
    console.log(`Workspace Superpowers MCP server listening at http://127.0.0.1:${address.port}/mcp`);
  }).catch((error) => {
    console.error(`Unable to start Workspace Superpowers MCP server: ${error.message}`);
    process.exitCode = 1;
  });
}
