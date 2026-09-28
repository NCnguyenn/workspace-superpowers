import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

function revision(path) {
  if (!existsSync(path)) return null;
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function failure(role, reason, saved, pending, error = null) {
  return {
    ok: false,
    failedAt: role,
    reason,
    saved,
    unsaved: pending.map((item) => ({ role: item.role, path: item.path })),
    error,
    recovery: {
      createTracker: false,
      action: 'Reconcile the saved and unsaved paths from the actual artifacts before resuming.',
    },
  };
}

export function saveTrackingCheckpoint({ deliverable, context = null, plan } = {}) {
  if (!deliverable?.path || typeof deliverable.content !== 'string') {
    return { ok: false, error: 'deliverable path and content are required' };
  }
  if (!plan?.path || typeof plan.content !== 'string') {
    return { ok: false, error: 'plan path and content are required' };
  }

  const skipped = [];
  const targets = [{ role: 'deliverable', ...deliverable }];
  if (context?.affected) {
    targets.push({ role: 'context', ...context });
  } else if (context) {
    skipped.push({ role: 'context', reason: 'absent-or-unaffected' });
  }
  targets.push({ role: 'plan', ...plan });

  const saved = [];
  for (let index = 0; index < targets.length; index += 1) {
    const target = targets[index];
    const currentRevision = revision(target.path);
    if (currentRevision !== (target.expectedRevision ?? null)) {
      return failure(target.role, 'revision-conflict', saved, targets.slice(index),
        `expected ${target.expectedRevision ?? 'absent'}, found ${currentRevision ?? 'absent'}`);
    }
    try {
      writeFileSync(target.path, target.content, {
        encoding: 'utf8',
        flag: currentRevision === null ? 'wx' : 'w',
      });
      if (readFileSync(target.path, 'utf8') !== target.content) {
        return failure(target.role, 'write-verification-failed', saved, targets.slice(index), 'reopened bytes differ from requested content');
      }
      saved.push({ role: target.role, path: target.path, revision: revision(target.path), reopened: true });
    } catch (error) {
      return failure(target.role, 'write-failed', saved, targets.slice(index),
        error instanceof Error ? error.message : String(error));
    }
  }

  return {
    ok: true,
    saved,
    skipped,
    recovery: { createTracker: false, action: null },
  };
}
