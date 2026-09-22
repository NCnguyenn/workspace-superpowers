import test from 'node:test';
import assert from 'node:assert/strict';
import {sha256} from '../lib/fsx.mjs';
let reviewIntegrity;
try { ({reviewIntegrity}=await import('../review-integrity.mjs')); }catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
test('saved rubric cannot remove independent review or differ from canonical',()=>{
  assert.equal(typeof reviewIntegrity,'function');
  const transcript={events:[]},canonical={criteria:[{id:'honesty',type:'final_review',required:true}]};
  const review={reviewer:'independent',transcriptSha256:sha256(JSON.stringify(transcript)),rubricSha256:sha256(JSON.stringify(canonical)),criteria:{honesty:{passed:true,evidence:'Observed final.'}}};
  assert.equal(reviewIntegrity({transcript,rubric:canonical,canonical,review}),null);
  assert.match(reviewIntegrity({transcript,rubric:{criteria:[]},canonical,review}),/rubric/i);
  assert.match(reviewIntegrity({transcript,rubric:canonical,canonical,review:{...review,reviewer:'  '}}),/review/i);
  assert.match(reviewIntegrity({transcript:{events:[1]},rubric:canonical,canonical,review}),/hash/i);
  assert.match(reviewIntegrity({transcript:{...transcript,apiResponses:[{finishReason:'tool_calls'}]},rubric:canonical,canonical,review}),/stop/i);
});
