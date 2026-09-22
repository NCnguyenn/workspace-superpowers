// Readiness is derived from regraded individual trials, never from a mock tally.
export function assessReadiness(rows, { scenarios, repeat }) {
  const reasons=[], improvedScenarios=[];
  const sameFields=['model','effort','endpointSha256','providerModelsSha256','protocolSha256','inputSha256','promptSha256','toolsSha256','packSha256'];
  for(const field of ['model','effort','endpointSha256','providerModelsSha256','protocolSha256','toolsSha256','packSha256']) {
    if(new Set(rows.map(r=>r[field])).size!==1) reasons.push(`experiment mixes ${field} revisions/configurations`);
  }
  for(const scenarioId of scenarios) {
    let improvement=false;
    for(let i=1;i<=repeat;i++) {
      const pair=['baseline','treatment'].map(condition=>rows.filter(r=>r.scenarioId===scenarioId && r.condition===condition && r.repeatIndex===i));
      if(pair.some(p=>p.length!==1)) {reasons.push(`${scenarioId}/${i}: missing or duplicate pair`);continue;}
      const [baseline,treatment]=pair.map(p=>p[0]);
      for(const row of [baseline,treatment]) {
        if(row.evidenceClass!=='real-api' || row.executionStatus!=='completed' || !row.reviewed || !['PASS','FAIL'].includes(row.status)) reasons.push(`${scenarioId}/${i}/${row.condition}: incomplete real evidence or review`);
      }
      for(const field of sameFields) if(!baseline[field] || baseline[field]!==treatment[field]) reasons.push(`${scenarioId}/${i}: ${field} differs or missing`);
      if(treatment.status!=='PASS') reasons.push(`${scenarioId}/${i}: treatment did not pass`);
      if(baseline.status==='FAIL' && treatment.status==='PASS') improvement=true;
    }
    if(improvement) improvedScenarios.push(scenarioId);
  }
  if(!scenarios.length || !Number.isInteger(repeat) || repeat<1) reasons.push('invalid experiment specification');
  if(rows.length!==scenarios.length*repeat*2) reasons.push('unexpected trial count');
  return {ready:reasons.length===0,reasons,improvedScenarios,
    interpretation:'Baseline PASS is valid; only observed baseline FAIL / treatment PASS pairs suggest added value. Small samples do not establish statistical generalization.'};
}
