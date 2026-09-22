import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('../..', import.meta.url)));
const fixtures = join(root, 'tests', 'fixtures', 'word-native-equations');

function loadXml(docxPath) {
  const python = process.env.PYTHON || 'python';
  const pyCode = 'import zipfile,sys\nwith zipfile.ZipFile(sys.argv[1]) as z:\n    sys.stdout.write(z.read("word/document.xml").decode("utf-8"))\n';
  return execFileSync(python, ['-c', pyCode, docxPath], { encoding: 'utf8', timeout: 10_000 });
}

test('Word-produced fixtures keep native oMath fractions and are not images', () => {
  const source = join(fixtures, 'source-native-equation.docx');
  const edited = join(fixtures, 'edited-native-equation.docx');
  assert.equal(existsSync(source), true);
  assert.equal(existsSync(edited), true);
  const sourceXml = loadXml(source);
  const editedXml = loadXml(edited);
  assert.match(sourceXml, /oMath/);
  assert.match(sourceXml, /<m:t[^>]*>x\+1<\/m:t>/);
  assert.match(sourceXml, /<m:t[^>]*>2<\/m:t>/);
  assert.match(sourceXml, /<m:t[^>]*>=3<\/m:t>/);
  assert.match(sourceXml, /<m:t[^>]*>y=4<\/m:t>/);
  assert.doesNotMatch(sourceXml, /a:blip/);
  assert.match(editedXml, /oMath/);
  assert.match(editedXml, /<m:t[^>]*>x\+1<\/m:t>/);
  assert.match(editedXml, /<m:t[^>]*>4<\/m:t>/);
  assert.doesNotMatch(editedXml, />=3</);
  assert.doesNotMatch(editedXml, /a:blip/);
  assert.equal((sourceXml.match(/<m:oMath[\s>]/g) || []).length, 2);
  assert.equal((editedXml.match(/<m:oMath[\s>]/g) || []).length, 2);
});

test('round-trip script exists for interactive in-process Word COM', () => {
  const script = join(root, 'adapters', 'pi', 'word-equation-roundtrip.ps1');
  assert.equal(existsSync(script), true);
  const text = readFileSync(script, 'utf8');
  assert.match(text, /GetFullPath/);
  assert.match(text, /AutomationSecurity/);
  assert.match(text, /finally/);
  assert.match(text, /Quit\(\)/);
});
