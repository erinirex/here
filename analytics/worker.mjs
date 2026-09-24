const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
export function validEvent(x){return !!x&&Object.keys(x).length===3&&UUID.test(x.eventId)&&UUID.test(x.visitor)&&['view','click'].includes(x.kind);}
const json=(x,status=200,extra={})=>Response.json(x,{status,headers:{...headers,...extra}});
async function digest(secret,text){const enc=new TextEncoder();const key=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return [...new Uint8Array(await crypto.subtle.sign('HMAC',key,enc.encode(text)))].map(x=>x.toString(16).padStart(2,'0')).join('');}
async function stats(env){const today=new Date().toISOString().slice(0,10);const totals=await env.DB.prepare('SELECT COALESCE(SUM(views),0) AS views, COALESCE(SUM(clicks),0) AS clicks FROM daily').first();const daily=await env.DB.prepare('SELECT visitors FROM daily WHERE day=?').bind(today).first();return {...totals,todayVisitors:daily?.visitors||0,date:today,updatedAt:new Date().toISOString(),scope:'Opted-in traffic only. Visitors = distinct daily browser identifiers, not people.'};}
function badge(label,count){const value=String(Number(count)||0);return `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="36" role="img" aria-label="${label}: ${value}"><rect width="250" height="36" rx="6" fill="#193e34"/><text x="12" y="23" fill="#fff" font-family="Verdana,sans-serif" font-size="12">${label}</text><text x="232" y="23" text-anchor="end" fill="#e4edb8" font-family="Verdana,sans-serif" font-size="14">${value}</text></svg>`;}
export default {
 async fetch(request,env){const url=new URL(request.url);const origin=request.headers.get('Origin');const allowed=origin===env.ALLOWED_ORIGIN;const cors=allowed?{'Access-Control-Allow-Origin':origin,'Vary':'Origin'}:{};
  if(url.pathname==='/event'){
   if(!allowed)return json({error:'Origin not allowed'},403);
   if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...cors,'Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'3600'}});
   if(request.method!=='POST')return json({error:'Method not allowed'},405,cors);
   if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'JSON required'},415,cors);
   if(Number(request.headers.get('Content-Length')||0)>512)return json({error:'Too large'},413,cors);
   if(!env.METRICS_SECRET||env.METRICS_SECRET.length<32)return json({error:'Not configured'},503,cors);
   try{const raw=await request.text();if(raw.length>512)return json({error:'Too large'},413,cors);let event;try{event=JSON.parse(raw);}catch{return json({error:'Invalid JSON'},400,cors);}if(!validEvent(event))return json({error:'Invalid event'},400,cors);
    const day=new Date().toISOString().slice(0,10);const visitor=await digest(env.METRICS_SECRET,day+':'+event.visitor);
    // Bound individual IDs; this is not bot authentication. Origin headers can be forged.
    const amount=await env.DB.prepare('SELECT COUNT(*) AS n FROM events WHERE day=? AND visitor=?').bind(day,visitor).first();if(amount.n>=1000)return json({error:'Daily limit'},429,cors);
    await env.DB.batch([
     env.DB.prepare('INSERT OR IGNORE INTO visitors(day,visitor) VALUES (?,?)').bind(day,visitor),
     env.DB.prepare('INSERT OR IGNORE INTO events(id,day,visitor,kind) VALUES (?,?,?,?)').bind(event.eventId,day,visitor,event.kind)
    ]);return json({ok:true},200,cors);
   }catch{return json({error:'Temporarily unavailable'},503,cors);}
  }
  if(request.method!=='GET')return json({error:'Method not allowed'},405);
  if(url.pathname==='/stats'||url.pathname.startsWith('/badge/')){try{const s=await stats(env);if(url.pathname==='/stats')return json(s,200,{'Access-Control-Allow-Origin':'*'});const type=url.pathname.split('/')[2];const entries={views:['Page views',s.views],visitors:['Visitors today (UTC)',s.todayVisitors],clicks:['Button/link clicks',s.clicks]};if(!entries[type])return json({error:'Not found'},404);return new Response(badge(...entries[type]),{headers:{...headers,'Content-Type':'image/svg+xml; charset=utf-8'}});}catch{return json({error:'Statistics unavailable'},503);}}
  return json({error:'Not found'},404);
 },
 async scheduled(event,env,ctx){ctx.waitUntil(env.DB.batch([env.DB.prepare("DELETE FROM events WHERE day < date('now','-1 day')"),env.DB.prepare("DELETE FROM visitors WHERE day < date('now','-1 day')")]));}
};
