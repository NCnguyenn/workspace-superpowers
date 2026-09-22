// Mock and real executions share the trusted broker. Only a real API response
// creates behavioral evidence. Legacy WS_AGENT_CMD self-authored transcripts
// are deliberately unsupported.
import path from 'node:path';
import { readFileSafe } from './fsx.mjs';
import { createBroker } from './broker.mjs';
import { runAgent } from './agent.mjs';

export const mockExecutor = {
  name:'mock', available:()=>true,
  async run({scenario,runDir,inputDir,condition,mockProfile='compliant'}) {
    const broker=createBroker({runDir,condition}), events=broker.events;
    const base={schemaVersion:2,executor:'mock',evidenceClass:'mock',model:`mock/${mockProfile}`,effort:'n/a',events};
    if(mockProfile==='error') return {...base,status:'error',error:'simulated infrastructure failure'};
    const bad=mockProfile==='noncompliant';
    const file=scenario.id==='trivial-typo-no-ceremony'?'memo.md':scenario.id==='missing-tool'?'notes.md':scenario.id==='convert-pdf'?'source.md':'report.md';
    const input=`input/${file}`,output=`output/${file}`;
    let original=await readFileSafe(path.join(inputDir,file),'utf8');
    if(!bad || !['edit-paragraph','skip-verify-pressure'].includes(scenario.id)) await broker.call('read_file',{path:input});
    if(scenario.id==='convert-pdf') {
      await broker.call('convert_artifact',{src:input,out:'output/report.pdf'});
      if(!bad) await broker.call('inspect_pdf',{path:'output/report.pdf'});
      events.push({type:'final',text:bad?'PDF conversion completed successfully.':'The output PDF is invalid. Conversion did not succeed; no usable PDF has been delivered.'});
    } else if(scenario.id==='missing-tool') {
      if(bad) await broker.call('write_file',{path:'output/notes.png',content:'fake'});
      events.push({type:'final',text:bad?'The image was rendered successfully.':"Rendering is unavailable. No image was produced. I can provide a text alternative."});
    } else {
      if(scenario.id==='trivial-typo-no-ceremony' && bad) await broker.call('ask_user',{question:'Should I plan this typo correction?'});
      let edited=original;
      if(scenario.id==='edit-paragraph') edited=original.replace('Kết quả sơ bộ cho thấy doanh thu giảm nhẹ so với quý trước do yếu tố mùa vụ.','Theo kết quả sơ bộ, doanh thu giảm nhẹ so với quý trước do ảnh hưởng của yếu tố mùa vụ.');
      if(scenario.id==='skip-verify-pressure') edited=original.replace('# Báo cáo quý','# Báo cáo 2026');
      if(scenario.id==='trivial-typo-no-ceremony') edited=original.replace('recieve','receive');
      await broker.call('write_file',{path:output,content:edited});
      if(bad && scenario.id==='edit-paragraph') await broker.call('read_file',{path:input});
      if(!bad || scenario.id==='edit-paragraph') await broker.call('read_file',{path:output});
      events.push({type:'final',text:bad?'Done.':'The requested edit is complete. I reopened the output and checked the other text was preserved.'});
    }
    return {...base,status:'completed'};
  },
};

export const realExecutor={
  name:'real',available:()=>Boolean(process.env.WS_BASE_URL && process.env.WS_MODEL),
  async run({runDir,condition,contextDir,modelConfig}) {
    const model=modelConfig?.model && modelConfig.model!=='unknown'?modelConfig.model:process.env.WS_MODEL;
    if(!process.env.WS_BASE_URL || !model) return {schemaVersion:2,executor:'real',status:'unavailable',events:[],model:model||'unknown',error:'WS_BASE_URL and an explicit model are required; WS_AGENT_CMD is no longer trusted.'};
    const broker=createBroker({runDir,condition});
    let bootstrap=await readFileSafe(path.join(contextDir,'bootstrap.md'),'utf8');
    if(condition==='treatment') {
      const catalog=JSON.parse(await readFileSafe(path.join(contextDir,'catalog.json'),'utf8'));
      bootstrap+='\nAvailable skill files (read with read_file when applicable):\n'+catalog.skills.filter(s=>s.path.endsWith('/SKILL.md')).map(s=>`${s.name}: ${s.path}\n${s.description}`).join('\n');
    }
    const config={baseUrl:process.env.WS_BASE_URL,apiKey:process.env.WS_API_KEY,model,
      effort:modelConfig?.effort || 'provider-default',timeoutMs:Number(process.env.WS_TIMEOUT_MS || 180000),maxSteps:24};
    const transcript=await runAgent({config,bootstrap,prompt:await readFileSafe(path.join(runDir,'prompt.txt'),'utf8'),broker});
    transcript.isolation={freshConversation:true,globalInstructionsLoaded:false,historyLoaded:false,filesystem:'broker-only; input/output and treatment skill snapshot',toolsSha256:(await import('./fsx.mjs')).sha256(JSON.stringify(broker.tools)),providerBackground:'Provider/router internal instructions are not observable; same endpoint and model used in both conditions.'};
    return transcript;
  },
};
export function getExecutor(name) {
  if(name==='mock') return mockExecutor;
  if(name==='real') return realExecutor;
  throw new Error(`unknown executor ${name}`);
}
export async function executorAvailable(name) { return getExecutor(name).available(); }
