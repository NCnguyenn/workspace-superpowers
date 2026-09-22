#!/usr/bin/env node
// Operator-only launcher for a specifically selected, already configured Pi
// provider. Credential remains in process memory; never written to trial files.
// Pi on-disk format: github.com/vastsa/PI-Desktop/blob/main/crates/host-core/src/secrets.rs
import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
import { createHash, createDecipheriv } from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import { runScenarios } from './run.mjs';
const options=Object.fromEntries(process.argv.slice(2).map(arg=>{const i=arg.indexOf('=');return [arg.slice(2,i),arg.slice(i+1)];}));
try {
  delete process.env.WS_API_KEY;
  if(!options.provider) throw new Error('Explicit --provider=<Pi provider ID> required');
  const dir=path.resolve(options['pi-dir'] || path.join(os.homedir(),'.pi-desktop'));
  const db=new DatabaseSync(path.join(dir,'pi.sqlite'),{readOnly:true});
  const provider=db.prepare('SELECT base_url,secret_ref,default_model_id,enabled,api_style FROM providers WHERE id=?').get(options.provider);
  db.close();
  if(!provider?.enabled || provider.api_style!=='chat_completions') throw new Error('Selected provider must be enabled and use chat_completions');
  const endpoint=new URL(provider.base_url);
  if(endpoint.protocol!=='https:' && !(endpoint.protocol==='http:' && ['localhost','127.0.0.1','[::1]'].includes(endpoint.hostname))) throw new Error('Only HTTPS or loopback HTTP endpoints supported');
  const ref=provider.secret_ref;
  if(ref) {
    const hash=createHash('sha256').update(ref).digest('hex');
    const key=await readFile(path.join(dir,'secrets','.machine-key'));
    const blob=Buffer.from((await readFile(path.join(dir,'secrets',hash+'.bin'),'utf8')).trim(),'base64');
    const decipher=createDecipheriv('aes-256-gcm',key,blob.subarray(0,12));
    decipher.setAuthTag(blob.subarray(-16));
    process.env.WS_API_KEY=Buffer.concat([decipher.update(blob.subarray(12,-16)),decipher.final()]).toString('utf8');
    key.fill(0);
  }
  process.env.WS_BASE_URL=provider.base_url;
  const model=options.model || provider.default_model_id;
  console.log(`Selected configured model: ${model}; endpoint: ${endpoint.origin}; API key is never logged.`);
  const result=await runScenarios({executor:'real',condition:options.condition||'both',repeat:Number(options.repeat||1),
    scenarios:options.scenario?options.scenario.split(','):[],model,effort:options.effort||'encoded-in-model-id'});
  console.log(`Report: ${result.report.mdPath}`);
  process.exitCode=result.report.tally.BLOCKED?2:result.report.tally.FAIL?1:0;
} catch(e) {
  // Never include provider response bodies, decrypted bytes or config objects.
  console.error('Pi launcher failed: configuration/credential/runner could not be used. No credential values were logged.');
  process.exitCode=2;
} finally { delete process.env.WS_API_KEY; }
