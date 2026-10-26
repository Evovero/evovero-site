// Demo viewer for /free-trial (2026-10-25, F6). Sits in the hero, ABOVE the intake form.
// Desktop: live preview left (about two thirds), industry list right, first 5 then "See more".
// Phone (designed first): swipeable chips (first 5 plus "See all"), a bottom sheet with the full list,
// and a preview that does not trap the thumb: it shows the top of the demo and opens full screen on tap.
// "Open full site" opens the demo full screen ON this page (no new tab), so the lead never leaves the funnel.
// Each item shows its palette name in the form's own color words, so it lines up with the colors question.

export const SWATCH = { Black: '#111', White: '#fff', Gray: '#9aa3b2', Navy: '#1b2a55', Blue: '#2f6fe0', 'Light blue': '#8fc3f5', Green: '#2e8b57', Red: '#d32f2f', Orange: '#f08a24', Yellow: '#f5c518', Purple: '#7b4bc4', Pink: '#ec7fb1', Brown: '#7a4e2d', Gold: '#c9a227' };
export const FIRST = 5;

const dots = palette => `<span class="dv-dots" aria-hidden="true">${palette.split(',').map(c => `<i style="background:${SWATCH[c.trim()] || '#ccc'}"></i>`).join('')}</span>`;

export function viewerHtml(items, icon, demoUrl, proof = '') {
  const row = (d, i, cls = '') => `<button type="button" class="dv-row${cls}" data-demo="${d.slug}" aria-pressed="${i === 0}">${dots(d.palette)}<span class="dv-row__t"><b>${d.tabLabel}</b><small>${d.palette}</small></span></button>`;
  const chip = (d, i) => `<button type="button" class="dv-chip" data-demo="${d.slug}" aria-pressed="${i === 0}">${dots(d.palette)}${d.tabLabel}</button>`;
  const more = items.length - FIRST;
  const first = items[0];
  return `<div class="dv" id="dv" data-first="${first.slug}">
  ${more > 0 ? `<div class="dv-chiphead"><span>Swipe for more</span><button type="button" data-sheet>See all ${items.length} demos</button></div>` : ''}
  <div class="dv-chips" role="group" aria-label="Demo websites">${items.slice(0, FIRST).map(chip).join('')}${more > 0 ? `<button type="button" class="dv-chip dv-chip--all" data-sheet>See all ${items.length}</button>` : ''}</div>
  <div class="dv-stage">
    <div class="dv-bar"><span class="dv-bar__dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="dv-bar__name" id="dv-name">${first.name}</span><span class="dv-bar__pal" id="dv-pal">${dots(first.palette)}<span>${first.palette}</span></span><button type="button" class="dv-open" data-full>Open full site ${icon('arrow')}</button></div>
    <div class="dv-screen"><iframe id="dv-frame" title="Demo website" src="${demoUrl(first)}" loading="eager"></iframe><button type="button" class="dv-tap" data-full aria-label="Open the full demo site"><span>Tap to look around</span></button></div>
  </div>
  <aside class="dv-side">
    <p class="dv-side__h">Pick an industry</p>
    <div class="dv-list" id="dv-list">${items.map((d, i) => row(d, i, i >= FIRST ? ' dv-extra' : '')).join('')}</div>
    ${more > 0 ? `<button type="button" class="dv-more" id="dv-more" aria-expanded="false">See ${more} more</button>` : ''}
  </aside>
  <button type="button" class="btn btn--lg ft-closest" id="ft-closest">I like this one ${icon('arrow')}</button>
  <p class="ft-picked" id="ft-picked" hidden></p>
  ${proof ? `<div class="dv-proof">${proof}</div>` : ''}
</div>
<div class="dv-sheet" id="dv-sheet" hidden role="dialog" aria-modal="true" aria-label="All demo websites"><div class="dv-sheet__box">
  <div class="dv-sheet__top"><b>All demos</b><button type="button" class="dv-x" data-close aria-label="Close">&times;</button></div>
  <div class="dv-sheet__list">${items.map((d, i) => row(d, i)).join('')}</div>
</div></div>
<div class="dv-full" id="dv-full" hidden role="dialog" aria-modal="true" aria-label="Demo website"><div class="dv-full__top"><span class="dv-full__name" id="dv-full-name"></span><button type="button" class="dv-close" data-close aria-label="Close the demo">Close <span aria-hidden="true">&times;</span></button></div><div class="dv-full__slot" id="dv-full-slot"></div><div class="dv-full__foot"><button type="button" class="btn btn--primary btn--lg" id="dv-full-pick">I like this one ${icon('arrow')}</button></div></div>`;
}

export const viewerCss = `
.ft-hero__copy{max-width:760px}
.of-hero.ft-hero{overflow:clip}
.dv{display:grid;grid-template-columns:minmax(0,2fr) minmax(260px,1fr);grid-template-areas:"stage side" "stage pick" "stage picked" "stage proof";grid-template-rows:auto auto auto 1fr;gap:16px 24px;margin-top:30px;align-items:start}
.dv-chips,.dv-chiphead{display:none}
.dv-stage{grid-area:stage;min-width:0;border-radius:18px;overflow:hidden;background:#0b1020;box-shadow:0 0 0 1px rgba(255,255,255,.14),0 30px 70px rgba(0,0,0,.45)}
.dv-bar{display:flex;align-items:center;gap:12px;padding:10px 14px;background:#141b33;color:#fff;min-height:48px}
.dv-bar__dots{display:flex;gap:6px}.dv-bar__dots i{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.22)}
.dv-bar__name{font-family:var(--font-head);font-weight:600;font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dv-bar__pal{display:flex;align-items:center;gap:8px;color:var(--on-dark-soft);font-size:.86rem;white-space:nowrap;margin-left:auto}
.dv-open{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#fff;border-radius:999px;padding:7px 14px;font:600 .85rem var(--font-head);cursor:pointer;white-space:nowrap}
.dv-open svg{width:14px;height:14px}
.dv-screen{position:relative;background:#fff}
.dv-screen iframe{display:block;width:100%;height:min(640px,70vh);border:0;background:#fff}
.dv-tap{display:none}
.dv-dots{display:inline-flex;flex:none}.dv-dots i{width:14px;height:14px;border-radius:50%;box-shadow:0 0 0 2px #141b33;display:block}.dv-dots i+i{margin-left:-4px}
.dv-side{grid-area:side;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:14px}
.dv-side__h{margin:2px 6px 10px;color:var(--on-dark-soft);font:600 .8rem var(--font-head);letter-spacing:.06em;text-transform:uppercase}
.dv-list{display:grid;gap:6px}
.dv-list.open{max-height:420px;overflow:auto;padding-right:4px}
.dv-list .dv-row.dv-extra{display:none}.dv-list.open .dv-row.dv-extra{display:flex}
.dv-row{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:1px solid transparent;background:transparent;color:#fff;border-radius:12px;padding:10px 12px;cursor:pointer;font:inherit}
.dv-row:hover{background:rgba(255,255,255,.07)}
.dv-row[aria-pressed="true"]{background:#fff;color:var(--navy-abyss)}
.dv-row[aria-pressed="true"] small{color:var(--ink-soft)}
.dv-row .dv-dots i{box-shadow:0 0 0 2px rgba(255,255,255,.9)}
.dv-row__t{display:grid;gap:2px;min-width:0}.dv-row__t b{font:600 .98rem var(--font-head)}.dv-row__t small{color:var(--on-dark-soft);font-size:.82rem}
.dv-more{margin-top:8px;width:100%;border:1px dashed rgba(255,255,255,.3);background:transparent;color:#fff;border-radius:12px;padding:10px;font:600 .9rem var(--font-head);cursor:pointer}
.dv .ft-closest{grid-area:pick;width:100%;justify-content:center;background:#fff;color:var(--navy-abyss);font-size:1.12rem;font-weight:700;min-height:60px;box-shadow:0 10px 30px rgba(0,0,0,.35),0 0 0 4px rgba(255,255,255,.14)}
.dv .ft-closest:hover{background:#f1f5ff}
.dv .ft-closest svg{color:var(--blue)}
.dv-proof{grid-area:proof;text-align:center;color:var(--on-dark-soft);font-size:.95rem;line-height:1.5}
.dv-proof .st{display:block;color:#f5c518;letter-spacing:2px;font-size:1rem;margin-bottom:2px}
.dv-proof q{quotes:none;color:#fff}.dv-proof b{display:block;margin-top:2px;color:var(--on-dark-soft);font-weight:600;font-size:.88rem}
.dv .ft-picked{grid-area:picked;margin:0}
.dv-sheet{position:fixed;inset:0;z-index:300;background:rgba(5,9,22,.6);display:flex;align-items:flex-end;justify-content:center}
.dv-sheet[hidden]{display:none}
.dv-sheet__box{width:100%;max-width:520px;max-height:78svh;display:flex;flex-direction:column;background:#0e1733;border-radius:22px 22px 0 0;padding:8px 12px calc(14px + env(safe-area-inset-bottom));box-shadow:0 -20px 60px rgba(0,0,0,.4);animation:dv-up .25s ease both}
@keyframes dv-up{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}
.dv-sheet__top{display:flex;align-items:center;justify-content:space-between;padding:8px 6px 10px;color:#fff;font-family:var(--font-head)}
.dv-x{width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.1);color:#fff;font-size:1.5rem;line-height:1;cursor:pointer}
.dv-sheet__list{overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;display:grid;gap:4px}
.dv-sheet .dv-row{min-height:58px}
.dv-full{position:fixed;inset:0;z-index:310;background:#fff;display:flex;flex-direction:column}
.dv-full[hidden]{display:none}
.dv-full__top{display:flex;align-items:center;gap:12px;padding:8px 12px calc(8px) 16px;padding-top:calc(8px + env(safe-area-inset-top));background:#0e1733;color:#fff;min-height:52px}
.dv-close{margin-left:auto;flex:none;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;border:0;background:#fff;color:var(--navy-abyss);border-radius:999px;padding:10px 18px;min-height:44px;font:700 .98rem var(--font-head);cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)}.dv-close span{font-size:1.4rem;line-height:1}
.dv-full__name{font-family:var(--font-head);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dv-full__slot{flex:1;display:flex;min-height:0}.dv-full__slot iframe{flex:1;width:100%;border:0}
.dv-full__foot{padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:#0e1733}
.dv-full__foot .btn{width:100%;max-width:460px;margin:0 auto;display:flex;justify-content:center}
@media (min-width:980px){.dv .ft-closest{max-width:none}}
body.dv-lock{overflow:hidden}
@media (max-width:979px){
  .dv{grid-template-columns:minmax(0,1fr);grid-template-areas:"chiphead" "chips" "stage" "pick" "picked" "proof";gap:10px;margin-top:16px}
  .dv-chiphead{grid-area:chiphead;display:flex;align-items:center;justify-content:space-between;margin-bottom:-4px;color:var(--on-dark-soft);font-size:.86rem}
  .dv-chiphead button{border:0;background:none;color:#fff;font:600 .9rem var(--font-head);text-decoration:underline;text-underline-offset:3px;padding:6px 0;cursor:pointer}
  .dv-side{display:none}
  .dv-chips{grid-area:chips;display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;margin:0 -16px;padding:2px 16px 6px;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}
  .dv-chips::-webkit-scrollbar{display:none}
  .dv-chip{flex:none;scroll-snap-align:start;display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.07);color:#fff;border-radius:999px;padding:9px 14px 9px 10px;min-height:44px;font:600 .92rem var(--font-head);cursor:pointer;white-space:nowrap}
  .dv-chip .dv-dots i{width:12px;height:12px;box-shadow:0 0 0 2px #1a2650}
  .dv-chip[aria-pressed="true"]{background:#fff;color:var(--navy-abyss);border-color:#fff}
  .dv-chip[aria-pressed="true"] .dv-dots i{box-shadow:0 0 0 2px #fff}
  .dv-chip--all{background:transparent;border-style:dashed;padding-left:14px}
  .dv-bar__dots{display:none}.dv-bar{padding:8px 10px 8px 14px;gap:8px}.dv-bar__pal span{display:none}
  .dv-open{padding:7px 12px}
  .dv-screen iframe{height:min(50svh,460px);pointer-events:none}
  .dv-tap{display:flex;position:absolute;inset:0;align-items:flex-start;justify-content:flex-end;padding:12px 12px 0 0;border:0;background:transparent;cursor:pointer}
  .dv-tap span{background:rgba(8,14,32,.82);color:#fff;border-radius:999px;padding:9px 16px;font:600 .88rem var(--font-head);box-shadow:0 6px 20px rgba(0,0,0,.3)}
  .dv .ft-closest{width:100%;position:sticky;bottom:calc(12px + env(safe-area-inset-bottom));z-index:5}
}`;

// Runs inside the /free-trial script. Exposes window.ftViewer = { current(), select(slug), onPick(fn) }.
export const viewerJs = `(function(){
  var root=document.getElementById('dv');if(!root)return;
  var frame=document.getElementById('dv-frame'),full=document.getElementById('dv-full'),fullFrame=null,sheet=document.getElementById('dv-sheet');
  var data=JSON.parse(document.getElementById('dv-data').textContent),by={};data.forEach(function(d){by[d.slug]=d;});
  var cur=root.getAttribute('data-first'),pickFn=null,lastFocus=null;
  function ga(n,p){try{if(window.gtag)gtag('event',n,p||{});}catch(e){}}
  function dotsHtml(p){return p.split(',').map(function(c){return '<i style="background:'+(window.ftSwatch[c.trim()]||'#ccc')+'"></i>';}).join('');}
  function tame(f){try{var doc=f.contentDocument;{var st=doc.createElement('style');st.textContent='.mb{display:none!important}body{padding-bottom:0!important}';doc.head.appendChild(st);}[].slice.call(doc.querySelectorAll('a[href^="/get-started"],.ft__demo a')).forEach(function(a){a.remove();});[].slice.call(doc.querySelectorAll('a[href^="tel:"]')).forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();});});[].slice.call(doc.querySelectorAll('form')).forEach(function(fm){fm.addEventListener('submit',function(e){e.preventDefault();});});}catch(e){}}
  frame.addEventListener('load',function(){tame(frame);});
  function select(slug,src){var d=by[slug];if(!d)return;cur=slug;
    [].slice.call(document.querySelectorAll('[data-demo]')).forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-demo')===slug);});
    document.getElementById('dv-name').textContent=d.name;document.getElementById('dv-pal').innerHTML='<span class="dv-dots" aria-hidden="true">'+dotsHtml(d.palette)+'</span><span>'+d.palette+'</span>';
    if(frame.getAttribute('data-url')!==d.url){frame.setAttribute('data-url',d.url);try{frame.contentWindow.location.replace(d.url);}catch(e){frame.setAttribute('src',d.url);}}
    var chip=root.querySelector('.dv-chip[data-demo="'+slug+'"]');if(chip&&chip.scrollIntoView&&src==='sheet')chip.scrollIntoView({block:'nearest',inline:'center'});
    var row=root.querySelector('.dv-row[data-demo="'+slug+'"]');if(row&&row.classList.contains('dv-extra'))openList();
    ga('ft_demo_view',{demo:slug,from:src||'list'});}
  function openList(){var l=document.getElementById('dv-list'),m=document.getElementById('dv-more');if(!l||l.classList.contains('open'))return;l.classList.add('open');if(m){m.hidden=true;m.setAttribute('aria-expanded','true');}}
  function lock(on){document.body.classList.toggle('dv-lock',on);}
  function openSheet(){lastFocus=document.activeElement;sheet.hidden=false;lock(true);var a=sheet.querySelector('[aria-pressed="true"]')||sheet.querySelector('.dv-row');if(a)a.focus();ga('ft_demo_all');}
  function closeSheet(){sheet.hidden=true;lock(false);if(lastFocus)lastFocus.focus();}
  var pushed=false,base=0;function openFull(){var d=by[cur];lastFocus=document.activeElement;
    fullFrame=document.createElement('iframe');fullFrame.title='Full demo website';fullFrame.addEventListener('load',function(){tame(fullFrame);});fullFrame.src=d.url;
    var slot=document.getElementById('dv-full-slot');slot.innerHTML='';slot.appendChild(fullFrame);
    try{history.pushState({dvFull:1},'');pushed=true;base=history.length;}catch(e){}
    document.getElementById('dv-full-name').textContent=d.name;full.hidden=false;lock(true);full.querySelector('.dv-close').focus();ga('ft_demo_full',{demo:cur});}
  function closeFull(fromPop){if(full.hidden)return;full.hidden=true;lock(false);var steps=history.length-base+1;if(pushed&&!fromPop){try{history.go(-steps);}catch(x){}}pushed=false;var slot=document.getElementById('dv-full-slot');setTimeout(function(){if(full.hidden){slot.innerHTML='';fullFrame=null;}},400);if(lastFocus)lastFocus.focus();}
  root.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-demo'))select(b.getAttribute('data-demo'),b.classList.contains('dv-chip')?'chip':'list');
    else if(b.hasAttribute('data-sheet'))openSheet();
    else if(b.hasAttribute('data-full'))openFull();
    else if(b.id==='dv-more'){openList();ga('ft_demo_more');}});
  sheet.addEventListener('click',function(e){if(e.target===sheet||e.target.closest('[data-close]')){closeSheet();return;}var b=e.target.closest('[data-demo]');if(b){select(b.getAttribute('data-demo'),'sheet');closeSheet();}});
  full.querySelector('[data-close]').addEventListener('click',function(){closeFull();});window.addEventListener('popstate',function(){if(!full.hidden&&!(history.state&&history.state.dvFull))closeFull(true);});
  document.getElementById('dv-full-pick').addEventListener('click',function(){closeFull();if(pickFn)pickFn(cur);});
  document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;if(!full.hidden)closeFull();else if(!sheet.hidden)closeSheet();});
  window.ftViewer={current:function(){return cur;},select:select,onPick:function(f){pickFn=f;},label:function(s){return by[s]?by[s].tabLabel:'';}};
})();`;

export const viewerHeroCss = `
@media (min-width:980px){.ft-hero__copy{max-width:none;text-align:center}.ft-hero .ft-hero__copy h1{margin-left:auto;margin-right:auto}.ft-hero .ft-hero__copy p.lead{max-width:860px;margin-left:auto;margin-right:auto}.ft-hero{padding-block:36px 56px}.ft-hero h1{font-size:clamp(2rem,3.2vw,2.7rem)}.dv{margin-top:22px}.dv-screen iframe{height:min(620px,calc(100vh - 210px))}}`;
