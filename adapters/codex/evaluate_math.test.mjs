import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const runtime = join(process.cwd(), 'adapters', 'codex', 'evaluate_math.py');
const python = process.env.PYTHON || 'python';

function runRaw(input, expectedExit = 0) {
  assert.equal(existsSync(runtime), true, 'evaluate_math runtime must exist');
  const child = spawnSync(python, [runtime], {
    input, encoding: 'utf8', timeout: 10_000,
  });
  assert.equal(child.status, expectedExit, child.stderr);
  return JSON.parse(child.stdout);
}

function run(request, expectedExit = 0) {
  return runRaw(JSON.stringify(request), expectedExit);
}

test('evaluates exact decimal and rational arithmetic with an expected comparison', () => {
  const response = run({
    operation: 'evaluate', expression: 'price * 1.25 + 1/6 + 0.1 + 0.2',
    values: { price: '2/3' }, assumptions: ['price is rational'], expected: '13/10',
  });
  assert.equal(response.availability, 'available');
  assert.equal(response.outcome, 'pass');
  assert.equal(response.result.exact, '13/10');
  assert.equal(response.method, 'bounded_exact_fraction_ast');
  assert.deepEqual(response.inputs, { price: '2/3' });
  assert.equal(response.requested_expression, 'price * 1.25 + 1/6 + 0.1 + 0.2');
  assert.equal(response.executed_expression, response.requested_expression);
  assert.equal(response.assumptions_checked, false);
});

test('supports bounded discrete integer operations', () => {
  const response = run({
    operation: 'evaluate', expression: 'factorial(5) + comb(5, 2) + gcd(18, 24)',
    expected: 136,
  });
  assert.equal(response.outcome, 'pass');
  assert.equal(response.result.exact, '136');
});

test('completed calculations without a comparison remain inconclusive evidence', () => {
  const response = run({ operation: 'evaluate', expression: '1 / 3' });
  assert.equal(response.outcome, 'inconclusive');
  assert.equal(response.result.exact, '1/3');
  assert.match(response.limitations.join(' '), /not.*proof/i);
});

test('reports mismatch, domains, unavailable operations, and malicious syntax safely', () => {
  assert.equal(run({ operation: 'evaluate', expression: '2 + 2', expected: 5 }, 1).outcome, 'fail');
  assert.match(run({ operation: 'evaluate', expression: 'factorial(-1)' }, 3).diagnostic, /non-negative integer/i);
  assert.match(run({ operation: 'evaluate', expression: 'gcd(-2, 4)' }, 3).diagnostic, /non-negative integer/i);
  assert.equal(run({ operation: 'simplify', expression: 'x + x' }, 2).availability, 'unavailable');
  for (const expression of [
    '__import__("os").system("whoami")', 'x.__class__', '[1][0]', 'unknown(2)', 'True + 1',
  ]) {
    const response = run({ operation: 'evaluate', expression }, 3);
    assert.equal(response.outcome, 'fail', expression);
    assert.equal(response.result, undefined, expression);
    assert.equal(response.executed_expression, undefined, expression);
  }
});

test('rejects resource-expensive literals, intermediate results, and exponents before returning a result', () => {
  for (const [expression, diagnostic] of [
    ['2 ** 1001', /exponent/i],
    ['(2 ** 1000) ** 1000', /result.*limit/i],
    ['1e999999999', /decimal.*limit/i],
    ['1e-999999999', /decimal.*limit/i],
    ['1e3072 * 1e3072', /result.*limit/i],
    ['factorial(1001)', /factorial argument.*limit/i],
    ['comb(10001, 1)', /comb argument.*limit/i],
    [Array(100).fill('1').join('+'), /AST node limit/i],
    [`${'9'.repeat(513)} + 1`, /literal digit limit/i],
  ]) {
    const response = run({ operation: 'evaluate', expression }, 3);
    assert.equal(response.outcome, 'fail');
    assert.match(response.diagnostic, diagnostic);
  }
});

test('bounds JSON input, depth, numeric values and assumptions before evaluation', () => {
  for (const input of [
    ' '.repeat(65537), '['.repeat(1000) + '0' + ']'.repeat(1000),
    '{"operation":"evaluate","expression":"1","values":{"x":' + '9'.repeat(5000) + '}}',
    '{"operation":"evaluate","expression":"1","values":{"x":NaN}}',
    '{"operation":"evaluate","expression":1e999}',
    '{"operation":"evaluate","expression":"1","expected":1e999}',
  ]) {
    const response = runRaw(input, 2);
    assert.equal(response.availability, 'unavailable');
    assert.equal(response.executed_expression, undefined);
  }
  for (const extra of [
    { values: { x: '1e999999999' } }, { values: { x: '1e-999999999' } },
    { assumptions: 'already proved' }, { assumptions: ['x'.repeat(1025)] },
  ]) {
    const response = run({ operation: 'evaluate', expression: '1', ...extra }, 3);
    assert.equal(response.executed_expression, undefined);
    assert.equal(response.assumptions_checked, false);
  }
});

test('rejects unsupported result-affecting fields before executing another problem', () => {
  for (const extra of [{ domain: 'GF(5)' }, { precision: 20 }, { tolerance: '0.01' }]) {
    const response = run({ operation: 'evaluate', expression: '3 + 4', expected: 7, ...extra }, 2);
    assert.equal(response.availability, 'unavailable');
    assert.match(response.diagnostic, /unsupported request field/i);
    assert.equal(response.executed_expression, undefined);
    assert.equal(response.result, undefined);
  }
});

test('preserves exact scientific decimals and rejects ambiguous zero exponentiation', () => {
  assert.equal(run({ operation: 'evaluate', expression: '1e-3 + x', values: { x: '-2.5e+2' }, expected: '-249999/1000' }).outcome, 'pass');
  assert.match(run({ operation: 'evaluate', expression: '0 ** 0' }, 3).diagnostic, /indeterminate/i);
  assert.match(run({ operation: 'evaluate', expression: '0 ** -1' }, 3).diagnostic, /negative exponent/i);
  assert.equal(run({ operation: 'evaluate', expression: '2 ** -3', expected: '1/8' }).outcome, 'pass');
});
