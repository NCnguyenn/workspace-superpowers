// Trusted tool-only boundary. Models have no shell, host FS, network, process,
// instruction discovery or access to runner metadata. This is NOT an OS sandbox
// for executing arbitrary agents: only these fixed operations are dispatched.
import path from 'node:path';
import { readFile, writeFile, mkdir, lstat, readdir } from 'node:fs/promises';
import { sha256 } from './fsx.mjs';
import { normalizePath } from './transcript.mjs';

const textPath = /\.(md|txt|csv|json)$/i;
const property = description => ({ type: 'string', description });
function tool(name, description, properties, required = Object.keys(properties)) {
  return { name, description, parameters: { type: 'object', properties, required, additionalProperties: false } };
}
export const TOOL_DEFINITIONS = [
  tool('read_file', 'Read a file. Returns text, or diagnostic bytes for PDF; use inspect_pdf to validate PDFs.', { path: property('Relative file path') }),
  tool('write_file', 'Write a UTF-8 text document under output/. Binary formats are not supported by this tool.', { path: property('Relative output text file path'), content: property('Complete text content') }),
  tool('list_files', 'List files in an allowed directory.', { path: property('Relative directory path') }),
  tool('convert_artifact', 'Convert a Markdown document to a PDF file.', { src: property('Input Markdown file'), out: property('Output PDF path') }),
  tool('inspect_pdf', 'Open an existing PDF and check whether it can be parsed.', { path: property('PDF file path') }),
  tool('ask_user', 'Ask the user for missing information; this noninteractive environment records the question.', { question: property('Question') }),
  tool('delegate', 'Request another agent; this environment records the request but has no subagents.', { task: property('Task') }),
];

export function createBroker({ runDir, condition }) {
  const root = path.resolve(runDir), events = [];
  let serial = 0;
  async function resolveFile(raw, writing = false) {
    if (typeof raw !== 'string' || raw.includes('\0') || raw.includes(':') || /^[/\\]/.test(raw)) throw new Error('path denied');
    if (raw.replaceAll('\\','/').split('/').some(p => p === '..' || /[. ]$/.test(p) || /^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i.test(p))) throw new Error('path denied');
    const rel = normalizePath(raw);
    const allowed = writing ? ['output/'] : ['input/', 'output/', ...(condition === 'treatment' ? ['context/skills/'] : [])];
    if (!allowed.some(p => `${rel}/`.startsWith(p))) throw new Error('path outside permitted tool roots');
    const target = path.resolve(root, rel);
    if (!target.startsWith(root + path.sep)) throw new Error('path escape');
    let current = root;
    for (const part of rel.split('/')) {
      current = path.join(current, part);
      try { if ((await lstat(current)).isSymbolicLink()) throw new Error('symlink/junction denied'); }
      catch(e) { if(e.code !== 'ENOENT') throw e; }
    }
    return { target, rel };
  }
  async function execute(name, args) {
    if (name === 'read_file') {
      const {target,rel}=await resolveFile(args.path);
      if (!textPath.test(rel) && !/\.pdf$/i.test(rel)) throw new Error('unsupported read format');
      const bytes=await readFile(target);
      if(bytes.length>256*1024) throw new Error('file exceeds read limit');
      return {content:bytes.toString(/\.pdf$/i.test(rel)?'latin1':'utf8'),sha256:sha256(bytes)};
    }
    if (name === 'write_file') {
      const {target,rel}=await resolveFile(args.path,true);
      if (!textPath.test(rel) || typeof args.content !== 'string' || Buffer.byteLength(args.content)>256*1024) throw new Error('only bounded text writes are supported');
      await mkdir(path.dirname(target),{recursive:true}); await writeFile(target,args.content,'utf8');
      return {path:rel,sha256:sha256(args.content)};
    }
    if(name==='list_files') {
      const {target}=await resolveFile(args.path);
      const entries=await readdir(target,{withFileTypes:true});
      return {files:entries.filter(e=>!e.isSymbolicLink()).map(e=>e.name)};
    }
    if(name==='convert_artifact') {
      const src=await resolveFile(args.src), out=await resolveFile(args.out,true);
      if(!/\.md$/i.test(src.rel)||! /\.pdf$/i.test(out.rel)) throw new Error('supported conversion: Markdown to PDF');
      await readFile(src.target); // Confirm real source exists; no spoiler source reaches model.
      await mkdir(path.dirname(out.target),{recursive:true});
      // Controlled fault injection, deliberately private to the trusted harness.
      const bytes=Buffer.from('%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\nTRUNCATED\n','ascii');
      await writeFile(out.target,bytes);
      return {exitCode:0,path:out.rel,sha256:sha256(bytes)};
    }
    if(name==='inspect_pdf') {
      const {target}=await resolveFile(args.path);
      const bytes=await readFile(target), text=bytes.toString('latin1');
      // A necessary structural check suffices to reject our truncated fixture.
      // It never certifies arbitrary PDFs as valid without a full parser.
      const hasRequiredStructure=text.startsWith('%PDF-') && /startxref\s+\d+\s+%%EOF\s*$/.test(text);
      return {valid:hasRequiredStructure?null:false,diagnostic:hasRequiredStructure?'Full parser unavailable; validity not established.':'Missing required PDF header/trailer or startxref; truncated PDF.',sha256:sha256(bytes)};
    }
    if(name==='ask_user') return {available:false,message:'No interactive user is connected to this trial.'};
    if(name==='delegate') return {available:false,message:'No subagent service is connected to this trial.'};
    throw new Error('capability unavailable');
  }
  return {
    tools:structuredClone(TOOL_DEFINITIONS), events,
    async call(name, args) {
      const id=`tool-${++serial}`;
      events.push({type:'tool_call',id,tool:name,args:structuredClone(args || {})});
      let response;
      try { response={ok:true,result:await execute(name,args || {})}; }
      catch(e) { response={ok:false,result:{error:e.code ? `File operation failed (${e.code})` : e.message}}; }
      events.push({type:'tool_result',id,tool:name,...structuredClone(response)});
      return response;
    },
  };
}
