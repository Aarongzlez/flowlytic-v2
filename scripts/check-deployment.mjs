import fs from 'node:fs';
const {url}=JSON.parse(fs.readFileSync('site.config.json','utf8'));
const results=await Promise.all(['/', '/styles.css', '/app.js', '/motion.js', '/calculator.mjs', '/assets/manrope.woff2', '/assets/inter.woff2', '/assets/favicon.svg', '/assets/og-image.png', '/robots.txt', '/missing-page-check'].map(async route=>{
  const response=await fetch(url+route);
  const type=response.headers.get('content-type');
  const result={route,status:response.status,type};
  if(route==='/'){
    const html=await response.text();
    result.noindex=response.headers.get('x-robots-tag');
    result.csp=response.headers.get('content-security-policy');
    result.canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    result.placeholders=/\[(?:[A-Z][A-Z_]+)\]/.test(html);
    result.disabledForm=html.includes('<fieldset disabled>') && html.includes('type="submit" class="button primary" disabled');
  }
  if(route==='/styles.css')result.matchesLocal=(await response.text())===fs.readFileSync('dist/styles.css','utf8');
  return result;
}));
console.log(JSON.stringify(results,null,2));
fs.mkdirSync('qa',{recursive:true});
fs.writeFileSync('qa/deployment-check.json',JSON.stringify(results,null,2));
if(results.some(r=>r.status!==(r.route==='/missing-page-check'?404:200))||!results[0].noindex?.includes('noindex')||results[0].placeholders||!results[0].canonical||!results[0].disabledForm||!results[1].matchesLocal)process.exitCode=1;
