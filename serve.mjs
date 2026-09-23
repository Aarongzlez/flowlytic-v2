import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.txt':'text/plain','.xml':'application/xml'};
http.createServer((req,res)=>{
  let requested;
  try {requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400);return res.end();}
  if (requested==='/__qa/axe.js') {res.writeHead(200,{'Content-Type':'text/javascript'});return fs.createReadStream('node_modules/axe-core/axe.min.js').pipe(res);}
  if (requested==='/__qa/audit.js') {res.writeHead(200,{'Content-Type':'text/javascript'});return fs.createReadStream('scripts/browser-audit.js').pipe(res);}
  const file=path.resolve(root,'.'+(requested==='/'?'/index.html':requested));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  const found=fs.existsSync(file)&&fs.statSync(file).isFile();
  res.writeHead(found?200:404,{'Content-Type':mime[path.extname(found?file:'404.html')]||'application/octet-stream','Cache-Control':'no-store'});
  if (requested==='/' && new URL(req.url,'http://localhost').searchParams.has('qa')) {
    return res.end(fs.readFileSync(file,'utf8').replace('</body>','<script src="/__qa/axe.js"></script><script src="/__qa/audit.js"></script></body>'));
  }
  fs.createReadStream(found?file:path.join(root,'404.html')).pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('Flowlytic preview: http://127.0.0.1:4173'));
