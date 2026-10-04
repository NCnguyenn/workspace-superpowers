import assert from 'node:assert/strict';
import test from 'node:test';
import http from 'node:http';
import { createHttpHandler, createWorkspaceSuperpowersServer } from './server.mjs';

test('createWorkspaceSuperpowersServer creates an McpServer instance with registered capabilities', () => {
  const server = createWorkspaceSuperpowersServer();
  assert.ok(server);
  assert.equal(typeof server.connect, 'function');
  assert.equal(typeof server.registerTool, 'function');
});

test('HTTP handler returns 404 for non-MCP paths', async () => {
  const handler = createHttpHandler();
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/other`);
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.deepEqual(body, { error: 'Use /mcp' });
  } finally {
    server.close();
  }
});

test('HTTP handler returns 405 for non-POST methods to /mcp', async () => {
  const handler = createHttpHandler();
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/mcp`, { method: 'GET' });
    assert.equal(res.status, 405);
    const body = await res.json();
    assert.deepEqual(body, { error: 'Only POST is supported' });
  } finally {
    server.close();
  }
});

test('HTTP handler returns 400 for invalid JSON body to /mcp', async () => {
  const handler = createHttpHandler();
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/mcp`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: 'invalid-json',
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.deepEqual(body, { error: 'Request body must be JSON' });
  } finally {
    server.close();
  }
});
