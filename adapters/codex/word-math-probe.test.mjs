import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const probe = join(process.cwd(), 'adapters', 'codex', 'word-math-probe.ps1');

test('Word math probe checks fraction meaning, untouched equations, invalid XML, DTD and fake math fixtures', () => {
  assert.equal(existsSync(probe), true, 'the bounded PowerShell probe must exist');
  const output = execFileSync(
    'powershell.exe',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', probe, '-SelfTest'],
    { encoding: 'utf8', timeout: 20_000 },
  );
  assert.match(output, /SELFTEST: XML FIXTURES PASS/);
});

test('Word math probe bounds its worker and keeps unknown clipboard and visual paths unverified', () => {
  const source = readFileSync(probe, 'utf8');
  assert.doesNotMatch(source, /\$worker\s*=/i);
  assert.match(source, /\$workerProcess\s*=\s*Start-Process/);
  assert.match(source, /-WindowStyle Hidden/);
  assert.match(source, /WaitForExit\(\$TimeoutSeconds \* 1000\)/);
  assert.match(source, /Stop-Process -Id \$workerProcess.Id -Force/);
  assert.match(source, /latexClipboardPath = New-CapabilityRecord 'unverified'/);
  assert.match(source, /visualLayoutInspection = New-CapabilityRecord 'unavailable'/);
  assert.match(source, /'fixture-passed'/);
});

test('Word math probe refuses an existing output directory before starting Word', () => {
  assert.throws(() => execFileSync('powershell.exe', [
    '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', probe,
    '-OutputDirectory', process.cwd(),
  ], { encoding: 'utf8', timeout: 10_000, stdio: 'pipe' }), error => {
    assert.match(error.stderr, /Refusing to overwrite existing output directory/);
    return true;
  });
});
