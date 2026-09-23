import fs from 'node:fs';
import crypto from 'node:crypto';
const mode=process.argv[2];
const url='https://flowlytic-preview.netlify.app';
const snapshot=await Promise.all(['/','/styles.css','/app.js'].map(async route=>{
  const response=await fetch(url+route);
  const body=await response.arrayBuffer();
  return {route,status:response.status,sha256:crypto.createHash('sha256').update(Buffer.from(body)).digest('hex')};
}));
const file='qa/original-before-v2.json';
if(mode==='before'){
  fs.mkdirSync('qa',{recursive:true});
  fs.writeFileSync(file,JSON.stringify(snapshot,null,2));
  console.log('Original site captured before creating v2.');
}else{
  const before=JSON.parse(fs.readFileSync(file,'utf8'));
  const unchanged=JSON.stringify(before)===JSON.stringify(snapshot);
  console.log(JSON.stringify({url,unchanged,assets:snapshot.length,status:snapshot.map(r=>r.status)},null,2));
  if(!unchanged)process.exitCode=1;
}
