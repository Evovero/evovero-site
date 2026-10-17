// Photo Dropbox: one shared upload link for every client, plus the same uploader in a popup.
// Files go to ONE Uploadcare project with NO webhook (so no Zap ever fires). After each batch
// the page posts the Netlify form "photo-dropbox", so Spencer gets one email per batch with the
// subject "Photos: <name>" and every file as "original name : Uploadcare file id".
// The name a person types (or that the link prefills with ?b=) is what keeps batches apart.
// Each file also carries Uploadcare metadata (business, source) so it is findable in the project.

// Public key of the Uploadcare project "Universal" (no webhook, created 2026-10-17). Public by design.
// Empty means not set up yet: the uploader shows a text-me fallback instead of failing silently.
export const UC_KEY = '4f048bc9edec0fb2c904';

export const dropboxCss = `
.pd{display:grid;gap:14px}
.pd__name label{display:block;font-family:var(--font-head);font-weight:600;color:var(--ink);margin-bottom:6px}
.pd__name input{width:100%;padding:14px 16px;border-radius:var(--r-sm);border:1px solid var(--line);background:var(--surface);font:inherit;font-size:1rem;color:var(--ink)}
.pd__name input:focus{outline:2px solid var(--blue-light);outline-offset:1px}
.pd__err{color:#c62828;font-size:.9rem;margin-top:6px;display:none}.pd__err.on{display:block}
.pd__zone{background:var(--surface);border:2px dashed var(--line);border-radius:var(--r);padding:30px 20px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s}
.pd__zone:hover,.pd__zone.drag{border-color:var(--blue);background:var(--surface-2)}
.pd__zone svg{width:44px;height:44px;color:var(--blue);margin:0 auto 10px;display:block}
.pd__zone h3{font-size:1.1rem;margin-bottom:4px}
.pd__zone p{font-size:.93rem;color:var(--ink-soft)}
.pd__btn{width:100%;justify-content:center}
.pd__hint{font-size:.85rem;color:var(--ink-soft);text-align:center}
.pd__q{list-style:none;margin:0;padding:0;display:grid;gap:8px}.pd__q:empty{display:none}
.pd__i{display:flex;gap:12px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 12px}
.pd__i img,.pd__i .pd__doc{width:44px;height:44px;border-radius:8px;object-fit:cover;flex:none;background:var(--surface-2);display:grid;place-items:center;font-size:.7rem;font-weight:700;color:var(--ink-soft)}
.pd__meta{flex:1;min-width:0}
.pd__fn{font-size:.9rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pd__st{font-size:.82rem;color:var(--blue);margin-top:2px}.pd__st.ok{color:#15803d}.pd__st.bad{color:#c62828}
.pd__bar{height:4px;background:var(--line);border-radius:999px;margin-top:5px;overflow:hidden}.pd__bar i{display:block;height:100%;width:0;background:var(--grad-blue);transition:width .2s}
.pd__done{display:none;background:#e9f8ee;border:1px solid #bfe8cc;color:#15803d;border-radius:12px;padding:14px 16px;font-weight:600;text-align:center}.pd__done.on{display:block}
.pd__off{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;text-align:center;color:var(--ink-soft)}
.pdm .dm__box{width:min(560px,100%);height:auto;max-height:min(90vh,820px)}
.pdm .dm__bar{justify-content:space-between}
.pdm .dm__bar strong{font-family:var(--font-head);font-size:1.02rem;color:var(--ink)}
.pdm__body{padding:20px;overflow:auto}
@media (max-width:640px){.pdm .dm__box{height:100%;max-height:none}}
.pd-box{display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:var(--surface);border:1px dashed var(--blue-light);border-radius:14px;padding:14px 18px;max-width:860px}
.pd-box p{margin:0;color:var(--ink-soft);font-size:.96rem}.pd-box p b{color:var(--ink)}
.pd-box .btn{padding:10px 16px;font-size:.93rem}`;

const cloud = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5"/><path d="M12 12v8M8.5 15.5 12 12l3.5 3.5"/></svg>`;

// The uploader block. source tags where the upload came from (dropbox, get-started, welcome).
export function uploader(id, source, { site, nameLabel = 'Your name or business name' } = {}) {
  if (!UC_KEY) {
    return `<div class="pd__off">Uploads are being set up. Text your photos to <a href="${site.phoneHref}">${site.phone}</a> for now.</div>`;
  }
  return `<div class="pd" id="${id}" data-key="${UC_KEY}" data-source="${source}">
    <div class="pd__name"><label for="${id}-name">${nameLabel}</label><input id="${id}-name" data-name autocomplete="organization" placeholder="JJ Lawn Care"><div class="pd__err" data-err>Add your name first so I know whose photos these are.</div></div>
    <div class="pd__zone" data-zone role="button" tabindex="0">${cloud}<h3>Tap to choose photos</h3><p>Photos, your logo, anything you want on the site. Pick as many as you want.</p></div>
    <input type="file" data-file accept="image/*,.heic,.pdf,.svg,.ai,.eps" multiple hidden>
    <button type="button" class="btn btn--primary btn--lg pd__btn" data-pick>Choose photos</button>
    <p class="pd__hint">Full quality, straight to Spencer. No login.</p>
    <div class="pd__done" data-done>Got them. Thanks! Add more anytime.</div>
    <ul class="pd__q" data-q></ul>
  </div>`;
}

// Hidden copy of the Netlify form so it is detected at deploy. Every field the script posts must be here.
export const dropboxForm = `<form name="photo-dropbox" data-netlify="true" netlify-honeypot="bot-field" hidden><input name="bot-field"><input name="subject"><input name="name"><input name="source"><input name="count"><textarea name="files"></textarea></form>`;

// One script drives every uploader on the page.
export const dropboxScript = `<script>(function(){
  var P=new URLSearchParams(location.search),pre=P.get('b')||P.get('name')||'';
  function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)||'unknown';}
  function init(root){
    var key=root.getAttribute('data-key'),src=root.getAttribute('data-source');
    var nm=root.querySelector('[data-name]'),err=root.querySelector('[data-err]'),fi=root.querySelector('[data-file]'),
        zone=root.querySelector('[data-zone]'),q=root.querySelector('[data-q]'),done=root.querySelector('[data-done]');
    if(pre&&!nm.value)nm.value=pre.replace(/[-_]+/g,' ').replace(/\\b\\w/g,function(c){return c.toUpperCase();});
    var batch=[],pending=0;
    function pick(){if(!nm.value.trim()){err.classList.add('on');nm.focus();return;}err.classList.remove('on');fi.click();}
    root.querySelector('[data-pick]').addEventListener('click',pick);
    zone.addEventListener('click',pick);zone.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick();}});
    nm.addEventListener('input',function(){if(nm.value.trim())err.classList.remove('on');});
    zone.addEventListener('dragover',function(e){e.preventDefault();zone.classList.add('drag');});
    zone.addEventListener('dragleave',function(){zone.classList.remove('drag');});
    zone.addEventListener('drop',function(e){e.preventDefault();zone.classList.remove('drag');if(!nm.value.trim()){pick();return;}add(e.dataTransfer.files);});
    fi.addEventListener('change',function(){add(fi.files);fi.value='';});
    function add(files){done.classList.remove('on');[].forEach.call(files,send);}
    function row(f){
      var li=document.createElement('li');li.className='pd__i';
      var th;if(/^image\\/(jpe?g|png|gif|webp)$/.test(f.type)){th=document.createElement('img');th.src=URL.createObjectURL(f);th.alt='';}
      else{th=document.createElement('span');th.className='pd__doc';th.textContent=(f.name.split('.').pop()||'FILE').slice(0,4).toUpperCase();}
      var m=document.createElement('div');m.className='pd__meta';
      var n=document.createElement('div');n.className='pd__fn';n.textContent=f.name;
      var s=document.createElement('div');s.className='pd__st';s.textContent='Uploading...';
      var b=document.createElement('div');b.className='pd__bar';var i=document.createElement('i');b.appendChild(i);
      m.appendChild(n);m.appendChild(s);m.appendChild(b);li.appendChild(th);li.appendChild(m);q.appendChild(li);
      return {li:li,s:s,b:b,i:i};
    }
    function send(f){
      var r=row(f),who=nm.value.trim();pending++;
      var fd=new FormData();
      fd.append('UPLOADCARE_PUB_KEY',key);fd.append('UPLOADCARE_STORE','1');
      fd.append('metadata[business]',slug(who));fd.append('metadata[source]',src);
      fd.append('file',f,f.name);
      var x=new XMLHttpRequest();x.open('POST','https://upload.uploadcare.com/base/');
      x.upload.onprogress=function(e){if(e.lengthComputable)r.i.style.width=Math.round(e.loaded/e.total*100)+'%';};
      x.onload=function(){var id=null;try{id=JSON.parse(x.responseText).file;}catch(e){}
        if(x.status>=200&&x.status<300&&id){batch.push(f.name+' : '+id);r.s.className='pd__st ok';r.s.textContent='Uploaded';r.b.style.display='none';}
        else fail();fin();};
      x.onerror=function(){fail();fin();};
      function fail(){r.s.className='pd__st bad';r.s.textContent='Did not upload. Tap to try again.';r.li.style.cursor='pointer';r.li.onclick=function(){r.li.remove();send(f);};}
      function fin(){pending--;if(!pending)notify(who);}
      x.send(fd);
    }
    function notify(who){
      if(!batch.length)return;var files=batch.splice(0);done.classList.add('on');
      var body=new URLSearchParams({'form-name':'photo-dropbox','subject':'Photos: '+who,'name':who,'source':src,'count':String(files.length),'files':files.join('\\n')});
      fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()}).catch(function(){});
      if(window.gtag)gtag('event','photos_uploaded',{source:src,count:files.length});
      root.dispatchEvent(new CustomEvent('pd:uploaded',{bubbles:true,detail:{name:who,files:files}}));
    }
    root.pdSetName=function(v){if(v&&!nm.value)nm.value=v;};
  }
  [].forEach.call(document.querySelectorAll('.pd[data-key]'),init);
  // Popup: any [data-dropbox-open] opens the modal; X, backdrop or Escape closes it.
  var m=document.getElementById('pd-modal');if(!m)return;
  function open(e){e.preventDefault();m.hidden=false;document.body.style.overflow='hidden';var n=m.querySelector('[data-name]');if(n&&!n.value)setTimeout(function(){n.focus();},50);}
  function close(){m.hidden=true;document.body.style.overflow='';}
  [].forEach.call(document.querySelectorAll('[data-dropbox-open]'),function(a){a.addEventListener('click',open);});
  m.querySelector('.dm__x').addEventListener('click',close);m.addEventListener('click',function(e){if(e.target===m)close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden)close();});
})();</script>`;

export function dropboxModal(source, opts) {
  return `<div class="dm pdm" id="pd-modal" hidden role="dialog" aria-modal="true" aria-label="Send your photos"><div class="dm__box">
    <div class="dm__bar"><strong>Send your logo or photos</strong><button type="button" class="dm__x" aria-label="Close">&times;</button></div>
    <div class="pdm__body">${uploader('pd-pop', source, opts)}</div></div></div>`;
}
