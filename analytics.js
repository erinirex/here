/* Default-on GoatCounter: fixed page/event names, never form content or resource labels. */
(() => {
  const endpoint=window.HERE_GOATCOUNTER_ENDPOINT;
  if(!endpoint || !/^https:\/\/[a-z0-9-]+\.goatcounter\.com\/count$/.test(endpoint))return;
  const consentKey='here-goatcounter-consent';
  let loading=false,ready=false,viewSent=false,clicks=0,lastClick=0;
  const blocked=()=>navigator.globalPrivacyControl||navigator.doNotTrack==='1';
  let sessionPreference=null;
  function pref(){if(sessionPreference!==null)return sessionPreference;try{return localStorage.getItem(consentKey);}catch{return null;}}
  function send(kind){
    if(!ready||pref()==='no'||blocked())return;
    try{window.goatcounter.count({path:kind==='view'?'/here':'click',title:kind==='view'?'Here visits':'Button/link clicks',referrer:'',event:kind==='click',no_session:kind==='click'});}catch{}
  }
  function start(){
    if(blocked()||pref()==='no')return;
    if(ready){if(!viewSent){viewSent=true;send('view');}return;}
    if(loading)return;
    loading=true;
    window.goatcounter={no_onload:true,no_events:true,endpoint,path:'/here',title:'Here visits',referrer:''};
    const script=document.createElement('script');
    script.src='https://gc.zgo.at/count.js';script.async=true;script.referrerPolicy='no-referrer';
    script.onload=()=>{loading=false;ready=typeof window.goatcounter.count==='function';if(ready)start();};
    script.onerror=()=>{loading=false;script.remove();};
    document.head.append(script);
  }
  document.addEventListener('click',event=>{
    if(!ready||pref()==='no'||blocked()||!event.isTrusted||!(event.target instanceof Element))return;
    if(event.target.closest('#metrics-choice,#metrics-settings')||!event.target.closest('button,a'))return;
    const now=Date.now();if(now-lastClick<500||clicks>=200)return;
    lastClick=now;clicks++;send('click');
  },true);
  // Remove the previous provider’s unused daily identifier.
  try{localStorage.removeItem('here-metrics-day');}catch{}
  const settings=document.createElement('button');
  settings.id='metrics-settings';settings.className='text-button';
  function label(){settings.textContent=blocked()?'Statistics blocked by browser / 浏览器已阻止统计':pref()==='no'?'Enable statistics / 开启统计':'Turn off statistics / 关闭统计';settings.disabled=!!blocked();}
  settings.onclick=()=>{
    sessionPreference=pref()==='no'?'yes':'no';
    try{localStorage.setItem(consentKey,sessionPreference);}catch{}
    label();if(sessionPreference==='yes')start();
  };
  document.querySelector('footer')?.append(settings);label();start();
})();
