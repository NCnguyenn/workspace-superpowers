'use strict';

async function routeRevisionExport(request, dependencies) {
  if (!request || typeof request.requestedRevisionId !== 'string') {
    throw new TypeError('requestedRevisionId is required');
  }
  const { resolveRevision, exportRevision, verifyExport } = dependencies || {};
  if (![resolveRevision, exportRevision, verifyExport].every((fn) => typeof fn === 'function')) {
    throw new TypeError('revision resolver, exporter and verifier are required');
  }

  const resolved = await resolveRevision(request.requestedRevisionId);
  if (!resolved || resolved.revisionId !== request.requestedRevisionId
      || typeof resolved.status !== 'string' || resolved.status.length === 0) {
    throw new Error(`requested revision is unavailable: ${request.requestedRevisionId}`);
  }
  const expected = Object.freeze({
    revisionId: resolved.revisionId,
    status: resolved.status,
    cells: Array.isArray(resolved.cells) ? resolved.cells.map((row) => Array.isArray(row) ? [...row] : row) : resolved.cells,
    mediaId: resolved.mediaId,
  });

  const output = await exportRevision(expected);
  if (!output || typeof output.outputId !== 'string' || output.outputId.length === 0
      || output.sourceRevisionId !== expected.revisionId
      || output.sourceStatus !== expected.status) {
    throw new Error('adapter substituted requested revision or status');
  }

  const verification = await verifyExport(output, expected);
  if (!verification || verification.verified !== true
      || verification.outputId !== output.outputId
      || verification.sourceRevisionId !== expected.revisionId
      || verification.sourceStatus !== expected.status) {
    throw new Error('verification result lost requested revision identity or status');
  }

  return {
    requestedRevisionId: expected.revisionId,
    requestedStatus: expected.status,
    outputId: output.outputId,
    verified: true,
  };
}

module.exports = { routeRevisionExport };
