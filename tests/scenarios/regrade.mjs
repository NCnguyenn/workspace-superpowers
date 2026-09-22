#!/usr/bin/env node
// Trusted operator command. Review files never enter the model's allowed paths.
import path from 'node:path';
import { readJSON, writeJSON, writeFileEnsured, ROOT, RUNS_DIR, REPORTS_DIR, sha256 } from './lib/fsx.mjs';
import { grade } from './lib/grader.mjs';
import { protocolHash, treeHash, loadAllScenarios, loadScenario } from './lib/scenario.mjs';
import { assessReadiness } from './lib/readiness.mjs';
import { reviewIntegrity } from './review-integrity.mjs';
const reportPath=path.resolve(process.argv[2] || '');
if(!reportPath.startsWith(REPORTS_DIR+path.sep) || !reportPath.endsWith('.json')) throw new Error('Pass a JSON report under tests/scenarios/reports/');
const report=await readJSON(reportPath), rows=[], currentProtocol=await protocolHash();
for(const row of report.runs) {
  const runDir=path.resolve(ROOT,row.runDir);
  if(!runDir.startsWith(RUNS_DIR+path.sep)) throw new Error('run outside runs directory');
  const transcript=await readJSON(path.join(runDir,'transcript.json'));
  const rubric=await readJSON(path.join(runDir,'rubric.json'));
  const meta=await readJSON(path.join(runDir,'run-meta.json'));
  const canonical=(await loadScenario(meta.scenarioId)).rubric;
  let review=await readJSON(path.join(runDir,'review.json'));
  if(!review) {
    await writeJSON(path.join(runDir,'review-template.json'),{
      reviewer:'',transcriptSha256:sha256(JSON.stringify(transcript)),rubricSha256:sha256(JSON.stringify(rubric)),
      criteria:Object.fromEntries(rubric.criteria.filter(c=>c.type==='final_review').map(c=>[c.id,{passed:null,evidence:'',requirement:c.requirement}]))
    });
  }
  const unchanged=transcript.artifactSha256===await treeHash(path.join(runDir,'output'))
    && transcript.inputSha256===await treeHash(path.join(runDir,'input'))
    && transcript.contextSha256===await treeHash(path.join(runDir,'context'));
  const authentic=transcript.evidenceClass==='real-api' && transcript.apiResponses?.length>0
    && transcript.isolation?.freshConversation===true && transcript.isolation?.globalInstructionsLoaded===false && transcript.isolation?.historyLoaded===false;
  let graded=await grade(rubric,{runDir,transcript,review});
  const reviewError=reviewIntegrity({transcript,rubric,canonical,review});
  if(reviewError) graded={...graded,status:'BLOCKED',reason:reviewError};
  if(!unchanged || !authentic || meta.protocolSha256!==currentProtocol) graded={...graded,status:'BLOCKED',reason:'changed artifacts/protocol or missing genuine broker/API evidence'};
  await writeJSON(path.join(runDir,'grade.json'),graded);
  rows.push({...row,status:graded.status,reason:graded.reason,reviewed:!reviewError,
    evidenceClass:transcript.evidenceClass,executionStatus:transcript.status,model:transcript.model,
    effort:transcript.effort,toolsSha256:transcript.isolation?.toolsSha256,
    endpointSha256:transcript.endpointSha256,providerModelsSha256:sha256(JSON.stringify(transcript.providerModels || [])),
    scenarioId:meta.scenarioId,condition:meta.condition,repeatIndex:meta.repeatIndex,
    protocolSha256:meta.protocolSha256,inputSha256:meta.inputSha256,promptSha256:meta.promptSha256,packSha256:meta.packSha256});
}
const scenarios=(await loadAllScenarios()).map(s=>s.id);
const repeat=Math.max(1,...rows.map(r=>r.repeatIndex || 1));
const readiness=assessReadiness(rows,{scenarios,repeat});
const result={generatedAt:new Date().toISOString(),sourceReport:path.relative(ROOT,reportPath),repeat,readiness,runs:rows};
const base=reportPath.replace(/\.json$/,'-reviewed');
await writeJSON(base+'.json',result);
await writeFileEnsured(base+'.md',[
 '# Wave 2 reviewed evidence', '', `Wave 3 gate: **${readiness.ready?'READY':'NOT READY'}**`,
 '', '| Scenario | Condition | Repeat | Grade | Reason |','|---|---|---:|---|---|',
 ...rows.map(r=>`| ${r.scenarioId} | ${r.condition} | ${r.repeatIndex} | ${r.status} | ${r.reason.replaceAll('|','/')} |`),
 '', 'Observed baseline FAIL / treatment PASS scenarios: '+(readiness.improvedScenarios.join(', ')||'none'),
 '', readiness.interpretation, '', ...readiness.reasons.map(r=>'- '+r),
 '', 'Scope: the configured model endpoint with the isolated broker. Desktop UI/global instruction behavior and other providers have not been certified.', ''
].join('\n'));
console.log(base+'.md'); console.log(JSON.stringify(readiness,null,2));
process.exitCode=readiness.ready?0:2;
