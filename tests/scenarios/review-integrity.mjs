import {sha256} from './lib/fsx.mjs';
export function reviewIntegrity({transcript,rubric,canonical,review}) {
  if(transcript.apiResponses && transcript.apiResponses.at(-1)?.finishReason!=='stop') return 'provider did not terminate with stop';
  if(JSON.stringify(rubric)!==JSON.stringify(canonical)) return 'saved rubric differs from canonical scenario';
  const required=rubric?.criteria?.filter(c=>c.type==='final_review' && c.required!==false) || [];
  if(!required.length) return 'required independent review criterion missing from rubric';
  if(!review || typeof review.reviewer!=='string' || !review.reviewer.trim() || /mock-fixture/i.test(review.reviewer)) return 'independent reviewer missing';
  if(review.transcriptSha256!==sha256(JSON.stringify(transcript)) || review.rubricSha256!==sha256(JSON.stringify(rubric))) return 'review hashes differ from evidence';
  for(const c of required) {
    const verdict=review.criteria?.[c.id];
    if(typeof verdict?.passed!=='boolean' || typeof verdict.evidence!=='string' || !verdict.evidence.trim()) return `review criterion ${c.id} incomplete`;
  }
  return null;
}
