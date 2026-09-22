import test from 'node:test';
import assert from 'node:assert/strict';
let assessReadiness;
try { ({ assessReadiness } = await import('../lib/readiness.mjs')); } catch(e) { if(e.code!=='ERR_MODULE_NOT_FOUND') throw e; }
const scenarios=['convert-pdf','edit-paragraph','missing-tool','skip-verify-pressure','trivial-typo-no-ceremony'];
function rows() { return scenarios.flatMap(s=>['baseline','treatment'].map(condition=>({scenarioId:s,condition,repeatIndex:1,status:condition==='baseline'?'FAIL':'PASS',evidenceClass:'real-api',executionStatus:'completed',model:'same',effort:'same',endpointSha256:'endpoint',providerModelsSha256:'version',protocolSha256:'same',inputSha256:s,promptSha256:s,toolsSha256:'tools',packSha256:'pack',reviewed:true}))); }
test('complete real paired evidence opens readiness gate and records improvements',()=>{
  assert.equal(typeof assessReadiness,'function'); const r=assessReadiness(rows(),{scenarios,repeat:1}); assert.equal(r.ready,true); assert.equal(r.improvedScenarios.length,5);
});
test('mock results and missing pairs cannot open readiness gate',()=>{
  assert.equal(typeof assessReadiness,'function');
  const mock=rows().map(r=>({...r,evidenceClass:'mock'})); assert.equal(assessReadiness(mock,{scenarios,repeat:1}).ready,false);
  assert.equal(assessReadiness(rows().slice(1),{scenarios,repeat:1}).ready,false);
});
test('pending review or treatment failures keep gate closed',()=>{
  assert.equal(typeof assessReadiness,'function');
  for(const change of [{reviewed:false},{status:'FAIL'},{status:'BLOCKED'}]) {
    const r=rows(); Object.assign(r[1],change); assert.equal(assessReadiness(r,{scenarios,repeat:1}).ready,false);
  }
});
test('model/tool/prompt/input/protocol/pack mismatches invalidate paired evidence',()=>{
  assert.equal(typeof assessReadiness,'function');
  for(const field of ['model','effort','endpointSha256','providerModelsSha256','protocolSha256','inputSha256','promptSha256','toolsSha256','packSha256']) {
    const r=rows();r[1][field]='changed';assert.equal(assessReadiness(r,{scenarios,repeat:1}).ready,false,field);
  }
});
test('passing baseline is kept honestly without inventing an improvement',()=>{
  assert.equal(typeof assessReadiness,'function'); const r=rows().map(r=>({...r,status:'PASS'}));
  const result=assessReadiness(r,{scenarios,repeat:1}); assert.equal(result.ready,true); assert.equal(result.improvedScenarios.length,0);
});
test('mixing pack revisions across scenarios cannot certify a single release',()=>{
  const r=rows();r[0].packSha256='old';r[1].packSha256='old';
  assert.equal(assessReadiness(r,{scenarios,repeat:1}).ready,false);
});
