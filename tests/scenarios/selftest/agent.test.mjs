import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
let runAgent;
try { ({ runAgent } = await import('../lib/agent.mjs')); } catch(e) { if(e.code!=='ERR_MODULE_NOT_FOUND') throw e; }
const broker = () => ({ tools:[],events:[],async call(tool,args){this.events.push({type:'tool_call',id:'1',tool,args},{type:'tool_result',id:'1',tool,ok:true,result:{content:'fixture'}}); return {ok:true,result:{content:'fixture'}};} });
const config = {baseUrl:'http://127.0.0.1:1/v1',model:'test',maxSteps:3,timeoutMs:50};
test('fresh API conversation only contains specified bootstrap/prompt/tools; records broker events', async () => {
  assert.equal(typeof runAgent,'function'); let n=0;
  const transport=async body=>{
    assert.equal(body.model,'test');
    if(n++===0){ assert.deepEqual(body.messages.map(m=>m.role),['system','user']); return {id:'response-1',model:'test',choices:[{finish_reason:'tool_calls',message:{role:'assistant',content:null,tool_calls:[{id:'native-1',type:'function',function:{name:'read_file',arguments:'{"path":"input/a.md"}'}}]}}]}; }
    assert.equal(body.messages.at(-1).role,'tool');
    return {id:'response-2',model:'test',choices:[{finish_reason:'stop',message:{role:'assistant',content:'Finished.'}}]};
  };
  const result=await runAgent({config,bootstrap:'neutral',prompt:'task',broker:broker(),transport});
  assert.equal(result.status,'completed'); assert.equal(result.events.length,3); assert.equal(result.apiResponses.length,2);
  assert.equal(result.evidenceClass,'transport-simulation');
});
test('malformed model JSON and provider errors are BLOCKED infrastructure', async()=>{
  assert.equal(typeof runAgent,'function');
  for(const response of [{},{error:{message:'private credential must not leak'}},{choices:[{message:{content:'partial'},finish_reason:'length'}]}]) {
    const result=await runAgent({config,bootstrap:'',prompt:'task',broker:broker(),transport:async()=>response});
    assert.notEqual(result.status,'completed'); assert.ok(!JSON.stringify(result).includes('private credential'));
  }
});
test('request timeout terminates a hanging HTTP response',async t=>{
  assert.equal(typeof runAgent,'function');
  const server=createServer(()=>{}); await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>{server.closeAllConnections();server.close();});
  const result=await runAgent({config:{...config,baseUrl:`http://127.0.0.1:${server.address().port}/v1`},bootstrap:'',prompt:'task',broker:broker()});
  assert.equal(result.status,'timeout');
});
test('step budget stops an endless tool loop',async()=>{
  assert.equal(typeof runAgent,'function');
  const response={choices:[{finish_reason:'tool_calls',message:{role:'assistant',tool_calls:[{id:'x',type:'function',function:{name:'read_file',arguments:'{}'}}]}}]};
  const result=await runAgent({config:{...config,maxSteps:2},bootstrap:'',prompt:'task',broker:broker(),transport:async()=>response});
  assert.equal(result.status,'step_limit');
});
test('unsupported effort label cannot be reported as applied',async()=>{
  const result=await runAgent({config:{...config,effort:'high'},bootstrap:'',prompt:'task',broker:broker(),transport:async()=>({choices:[{finish_reason:'stop',message:{content:'done'}}]})});
  assert.notEqual(result.status,'completed');
});
test('endpoint identity and provider-reported model are recorded',async()=>{
  const result=await runAgent({config,bootstrap:'',prompt:'task',broker:broker(),transport:async()=>({id:'1',model:'actual-model-version',choices:[{finish_reason:'stop',message:{content:'done'}}]})});
  assert.equal(result.providerModels[0],'actual-model-version'); assert.equal(typeof result.endpointSha256,'string');
});
test('tool_calls finish without calls cannot masquerade as a final answer',async()=>{
  const result=await runAgent({config,bootstrap:'',prompt:'task',broker:broker(),transport:async()=>({model:'test',choices:[{finish_reason:'tool_calls',message:{content:'I will inspect next.'}}]})});
  assert.equal(result.status,'error');
});
