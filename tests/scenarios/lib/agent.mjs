// Fresh stateless Chat Completions conversation. No Desktop/global instructions
// or filesystem discovery. Only the broker executes tool requests.
import { sha256 } from './fsx.mjs';
import { SCHEMA_VERSION } from './transcript.mjs';
export async function runAgent({ config, bootstrap, prompt, broker, transport }) {
  const events=broker.events, apiResponses=[];
  const base={schemaVersion:SCHEMA_VERSION,executor:'real',model:config.model,effort:config.effort || 'provider-default',
    harness:'workspace-tool-broker-v2',evidenceClass:transport?'transport-simulation':'real-api',events,apiResponses};
  const messages=[{role:'system',content:bootstrap},{role:'user',content:prompt}];
  const requestContextSha256=sha256(JSON.stringify({bootstrap,prompt,tools:broker.tools,model:config.model}));
  const timeoutMs=config.timeoutMs ?? 120000, maxSteps=config.maxSteps ?? 24;
  const deadline=Date.now()+timeoutMs;
  const finish=(status,error)=>({...base,status,error,requestContextSha256,
    endpointSha256:sha256(config.baseUrl),providerModels:[...new Set(apiResponses.map(r=>r.model))].sort()});
  try {
    if(!['provider-default','encoded-in-model-id'].includes(base.effort)) return finish('error','unsupported effort: use provider-default or encoded-in-model-id; no effort override is sent');
    if(!Number.isFinite(timeoutMs) || timeoutMs<1 || !Number.isInteger(maxSteps) || maxSteps<1) return finish('error','invalid trial limits');
    const endpoint=new URL(config.baseUrl.replace(/\/$/,'')+'/chat/completions');
    if(endpoint.protocol!=='https:' && !(endpoint.protocol==='http:' && ['localhost','127.0.0.1','[::1]'].includes(endpoint.hostname))) throw new Error('unsupported endpoint');
    for(let step=0;step<maxSteps;step++) {
      const remaining=deadline-Date.now(); if(remaining<=0) return finish('timeout','trial deadline exceeded');
      const body={model:config.model,messages,stream:false,tools:broker.tools.map(t=>({type:'function',function:t})),
        max_tokens:config.maxTokens ?? 4096,temperature:0};
      const requestHash=sha256(JSON.stringify(body));
      let data;
      if(transport) data=await transport(body);
      else {
        const response=await fetch(endpoint,{method:'POST',redirect:'error',
          headers:{'Content-Type':'application/json',...(config.apiKey?{Authorization:`Bearer ${config.apiKey}`}:{})},
          body:JSON.stringify(body),signal:AbortSignal.timeout(remaining)});
        if(!response.ok) return finish('error',`provider HTTP ${response.status}`);
        const raw=await response.text();
        try {data=JSON.parse(raw);} catch {
          return finish('error',`provider response is not JSON (content-type=${response.headers.get('content-type')?.split(';')[0]}, bytes=${Buffer.byteLength(raw)}, sse=${raw.trimStart().startsWith('data:')})`);
        }
      }
      const choice=data?.choices?.[0], message=choice?.message;
      if(data?.error || !message || !['stop','tool_calls'].includes(choice.finish_reason)) return finish('error','invalid, incomplete or rejected provider response');
      // Preserve provider-specific tool fields in the conversation (e.g. Gemini
      // thought signatures). Do not expose/store hidden reasoning in artifacts.
      apiResponses.push({id:data.id || null,model:data.model || 'unreported',finishReason:choice.finish_reason,
        requestSha256:requestHash,usage:data.usage || null});
      const calls=message.tool_calls || [];
      if(!Array.isArray(calls) || (choice.finish_reason==='tool_calls' && !calls.length)) return finish('error','tool_calls completion missing calls');
      if(calls.length) {
        if(calls.length>32) return finish('error','too many tool calls');
        if(typeof message.content==='string' && message.content.trim()) events.push({type:'message',role:'assistant',text:message.content});
        messages.push(message);
        for(const c of calls) {
          if(c.type!=='function' || typeof c.id!=='string' || !c.function?.name) return finish('error','malformed tool call');
          const args=JSON.parse(c.function.arguments);
          if(!args || typeof args!=='object' || Array.isArray(args)) return finish('error','invalid tool arguments');
          const response=await broker.call(c.function.name,args);
          messages.push({role:'tool',tool_call_id:c.id,content:JSON.stringify(response)});
        }
      } else {
        if(typeof message.content!=='string' || !message.content.trim()) return finish('error','empty final response');
        events.push({type:'final',text:message.content});
        return finish('completed');
      }
    }
    return finish('step_limit','trial step budget exhausted');
  } catch(e) {
    return finish(e.name==='TimeoutError' || e.name==='AbortError' ? 'timeout':'error',
      e.name==='TimeoutError' || e.name==='AbortError' ? 'trial deadline exceeded' : `provider transport or protocol error (${['TypeError','SyntaxError','Error'].includes(e.name)?e.name:'unknown'}; ${/^[A-Z_]+$/.test(e.cause?.code||'')?e.cause.code:'no-code'})`);
  }
}
