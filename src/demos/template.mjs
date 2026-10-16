// Shared template for every $100/mo offer demo site.
// One settings file in ./sites/ = one complete multi page demo. Nothing here is business specific.
// Output: dist/websites/demo/<slug>/ (home) and dist/websites/demo/<slug>/<page>/ for the rest.
// Every page is noindex and carries a small footer note that the business and photos are not real.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Photos: a site path like /demos/<slug>/stock-x.jpg (preferred, self hosted from public/demos/),
// an Unsplash id, or a full https URL. Originals live in Claude OS/00_Resources/Stock Photos.
export const photo = (id, w = 1600) => /^https?:|^\//.test(id) ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

const ICONS = {
  phone: '<path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 7a1 1 0 0 1 1-1Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  pin: '<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  star: '<path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 14 10"/>',
  cup: '<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V8Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v2M12 3v2"/>',
  wave: '<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="m8 11 4-7 4 7"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  cal: '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9h18M8 3v3M16 3v3"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
};
const ic = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k] || ICONS.spark}</svg>`;

function css(d) {
  const c = d.colors;
  return `
:root{--p:${c.primary};--p2:${c.primaryDark};--a:${c.accent};--ink:${c.ink};--soft:${c.soft};--bg:${c.bg};--bg2:${c.bg2};--line:${c.line};--dark:${c.dark};
--fh:${d.fonts.head.css};--fb:${d.fonts.body.css};--r:${d.radius ?? 14}px}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:var(--fb);color:var(--ink);background:var(--bg);line-height:1.6;font-size:17px;overflow-x:hidden}
img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4{font-family:var(--fh);line-height:1.12;letter-spacing:${d.fonts.head.tracking ?? '-.02em'};font-weight:${d.fonts.head.weight ?? 700}}
h1{font-size:clamp(2.3rem,5.6vw,4.4rem)}h2{font-size:clamp(1.8rem,3.6vw,2.8rem)}h3{font-size:1.2rem}
.w{width:100%;max-width:1200px;margin:0 auto;padding:0 clamp(18px,4vw,40px)}
.sec{padding:clamp(64px,9vw,120px) 0}.sec--alt{background:var(--bg2)}.sec--dark{background:var(--dark);color:#fff}
.kick{display:inline-block;font-family:var(--fh);font-weight:600;font-size:.82rem;letter-spacing:.14em;text-transform:uppercase;color:var(--p)}
.sec--dark .kick{color:var(--a)}
.lead{font-size:clamp(1.05rem,1.5vw,1.2rem);color:var(--soft);max-width:640px}
.sec--dark .lead{color:rgba(255,255,255,.78)}
.head{max-width:720px;margin-bottom:clamp(32px,5vw,56px)}.head h2{margin:10px 0 14px}
.head--c{margin-left:auto;margin-right:auto;text-align:center}.head--c .lead{margin:0 auto}
.btn{display:inline-flex;align-items:center;gap:9px;padding:15px 26px;border-radius:999px;font-family:var(--fh);font-weight:600;font-size:1rem;border:2px solid transparent;transition:transform .25s,box-shadow .25s,background .25s;cursor:pointer}
.btn svg{width:18px;height:18px}
.btn--p{background:var(--p);color:#fff;box-shadow:0 10px 30px -10px var(--p)}.btn--p:hover{transform:translateY(-2px);background:var(--p2)}
.btn--o{border-color:rgba(255,255,255,.55);color:#fff}.btn--o:hover{background:rgba(255,255,255,.12);transform:translateY(-2px)}
.btn--g{border-color:var(--line);color:var(--ink);background:#fff}.btn--g:hover{transform:translateY(-2px);border-color:var(--p)}
/* header */
.hd{position:fixed;inset:0 0 auto;z-index:50;transition:background .35s,box-shadow .35s,padding .35s;padding:18px 0}
.hd .w{display:flex;align-items:center;justify-content:space-between;gap:16px}
.logo{display:flex;align-items:center;gap:10px;font-family:var(--fh);font-weight:700;font-size:1.18rem;color:#fff;transition:color .35s}
.logo i{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;background:var(--p);color:#fff}
.logo i svg{width:21px;height:21px}
.nv{display:flex;gap:4px;align-items:center}
.nv a{padding:9px 14px;border-radius:999px;font-weight:500;font-size:.97rem;color:rgba(255,255,255,.9);transition:background .2s,color .35s}
.nv a:hover,.nv a[aria-current]{background:rgba(255,255,255,.14)}
.hd .btn{padding:11px 20px;font-size:.95rem}
.hd.solid,.hd.light{background:rgba(255,255,255,.96);backdrop-filter:blur(12px);box-shadow:0 6px 24px -14px rgba(0,0,0,.3);padding:10px 0}
.hd.solid .logo,.hd.light .logo{color:var(--ink)}.hd.solid .nv a,.hd.light .nv a{color:var(--ink)}
.hd.solid .nv a:hover,.hd.solid .nv a[aria-current],.hd.light .nv a:hover,.hd.light .nv a[aria-current]{background:var(--bg2)}
.tg{display:none;width:44px;height:44px;border-radius:12px;border:0;background:rgba(255,255,255,.18);color:#fff;align-items:center;justify-content:center;cursor:pointer}
.hd.solid .tg,.hd.light .tg{background:var(--bg2);color:var(--ink)}
.tg span,.tg span::before,.tg span::after{display:block;width:20px;height:2px;background:currentColor;border-radius:2px;position:relative;transition:transform .25s}
.tg span::before,.tg span::after{content:"";position:absolute;left:0}.tg span::before{top:-6px}.tg span::after{top:6px}
/* hero */
.hero{position:relative;min-height:min(92vh,860px);display:flex;align-items:flex-end;color:#fff;overflow:hidden;padding:140px 0 clamp(56px,8vw,96px)}
.hero__img{position:absolute;inset:0;background-size:cover;background-position:center;animation:kb 18s ease-out both}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.62) 0%,rgba(0,0,0,.25) 55%,rgba(0,0,0,0) 80%),linear-gradient(180deg,rgba(0,0,0,.35) 0%,rgba(0,0,0,.1) 40%,rgba(0,0,0,.7) 100%)}
.hero .w{position:relative;z-index:1}
.hero h1{max-width:860px;margin:14px 0 18px;text-shadow:0 2px 30px rgba(0,0,0,.25)}
.hero .kick{color:#fff;background:rgba(255,255,255,.16);backdrop-filter:blur(6px);padding:8px 14px;border-radius:999px;letter-spacing:.1em}
.hero p{max-width:600px;font-size:clamp(1.05rem,1.6vw,1.25rem);color:rgba(255,255,255,.9)}
.hero__cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.hero__chips{display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:30px;font-size:.95rem;color:rgba(255,255,255,.88)}
.hero__chips span{display:inline-flex;align-items:center;gap:8px}.hero__chips svg{width:18px;height:18px;color:var(--a)}
@keyframes kb{from{transform:scale(1.12)}to{transform:scale(1)}}
.ph{position:relative;color:#fff;padding:150px 0 70px;overflow:hidden}
.ph .hero__img{animation-duration:14s}
.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.65))}
.ph .w{position:relative;z-index:1}.ph h1{font-size:clamp(2rem,4.6vw,3.4rem);margin:10px 0 12px}.ph p{max-width:620px;color:rgba(255,255,255,.88);font-size:1.12rem}
.ph .kick{color:var(--a)}
/* cards */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px}
.card{background:#fff;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;transition:transform .35s,box-shadow .35s;display:flex;flex-direction:column}
.card:hover{transform:translateY(-6px);box-shadow:0 24px 50px -24px rgba(0,0,0,.35)}
.card__img{aspect-ratio:4/3;overflow:hidden}.card__img img{width:100%;height:100%;object-fit:cover;transition:transform .8s}
.card:hover .card__img img{transform:scale(1.07)}
.card__b{padding:22px 22px 24px;flex:1;display:flex;flex-direction:column}.card__b h3{margin-bottom:8px}.card__b p{color:var(--soft);font-size:.98rem;flex:1}
.card__b .more{margin-top:14px;font-family:var(--fh);font-weight:600;color:var(--p);display:inline-flex;align-items:center;gap:6px}
.card__b .more svg{width:16px;height:16px;transition:transform .25s}.card:hover .more svg{transform:translateX(4px)}
.price{font-family:var(--fh);font-weight:700;color:var(--p);margin-bottom:6px}
/* split */
.split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,6vw,80px);align-items:center}
.split--r .split__img{order:2}
.split__img{border-radius:calc(var(--r) * 1.6);overflow:hidden;aspect-ratio:5/4;box-shadow:0 30px 60px -30px rgba(0,0,0,.45)}
.split__img img{width:100%;height:100%;object-fit:cover}
.split h2{margin:10px 0 16px}.split p{color:var(--soft);margin-bottom:14px}.sec--dark .split p{color:rgba(255,255,255,.78)}
.ticks{list-style:none;display:grid;gap:12px;margin:22px 0 28px}
.ticks li{display:flex;gap:12px;align-items:flex-start}.ticks svg{flex:none;width:22px;height:22px;padding:3px;border-radius:50%;background:var(--p);color:#fff;margin-top:2px}
/* steps */
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:22px;counter-reset:s}
.step{padding:28px;border-radius:var(--r);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)}
.sec:not(.sec--dark) .step{background:#fff;border-color:var(--line)}
.step::before{counter-increment:s;content:counter(s,decimal-leading-zero);display:block;font-family:var(--fh);font-weight:700;font-size:2.2rem;color:var(--a);margin-bottom:12px}
.step h3{margin-bottom:8px}.step p{color:var(--soft);font-size:.98rem}.sec--dark .step p{color:rgba(255,255,255,.75)}
/* gallery */
.gal{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:250px;gap:14px}
.gal figure{border-radius:var(--r);overflow:hidden;position:relative}
.gal figure:first-child{grid-column:span 2;grid-row:span 2}
.gal img{width:100%;height:100%;object-fit:cover;transition:transform .8s}.gal figure:hover img{transform:scale(1.08)}
.gal figcaption{position:absolute;left:12px;bottom:12px;background:rgba(0,0,0,.55);color:#fff;font-size:.85rem;padding:6px 12px;border-radius:999px;opacity:0;transform:translateY(6px);transition:.3s}
.gal figure:hover figcaption{opacity:1;transform:none}
/* menu */
.menu{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(24px,4vw,48px)}
.menu h3{font-size:1.4rem;padding-bottom:12px;border-bottom:2px solid var(--p);margin-bottom:8px}
.mi{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px dashed var(--line)}
.mi b{font-family:var(--fh);font-weight:600}.mi small{display:block;color:var(--soft);font-size:.92rem;margin-top:2px}.mi span{font-family:var(--fh);font-weight:700;color:var(--p);white-space:nowrap}
/* faq */
.faq{max-width:820px;margin:0 auto;display:grid;gap:12px}
.faq details{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:0 22px;transition:box-shadow .3s}
.faq details[open]{box-shadow:0 16px 40px -24px rgba(0,0,0,.35)}
.faq summary{cursor:pointer;list-style:none;padding:20px 0;font-family:var(--fh);font-weight:600;font-size:1.06rem;display:flex;justify-content:space-between;gap:16px}
.faq summary::-webkit-details-marker{display:none}.faq summary::after{content:"+";font-size:1.5rem;line-height:1;color:var(--p);transition:transform .3s}
.faq details[open] summary::after{transform:rotate(45deg)}.faq details p{padding:0 0 20px;color:var(--soft)}
/* reviews placeholder (real reviews only, never invented) */
.rv-note{max-width:760px;margin:0 auto;text-align:center;border:2px dashed var(--line);border-radius:calc(var(--r) * 1.4);padding:clamp(28px,5vw,48px);background:#fff}
.rv-note .stars{display:flex;justify-content:center;gap:4px;color:#f5b301;margin-bottom:12px}.rv-note .stars svg{width:24px;height:24px;fill:currentColor}
.rv-note p{color:var(--soft);margin-top:8px}
/* cta */
.cta{position:relative;border-radius:calc(var(--r) * 2);overflow:hidden;color:#fff;padding:clamp(40px,7vw,80px);text-align:center}
.cta .hero__img{animation:none}.cta::after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,var(--p2),rgba(0,0,0,.55))}
.cta>*{position:relative;z-index:1}.cta h2{margin-bottom:12px}.cta p{max-width:560px;margin:0 auto;color:rgba(255,255,255,.88)}
.cta .hero__cta{justify-content:center}
/* contact */
.ct{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(28px,5vw,64px);align-items:start}
.ct__info{display:grid;gap:14px}
.ct__row{display:flex;gap:14px;align-items:flex-start;background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:18px}
.ct__row i{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:var(--bg2);color:var(--p)}.ct__row i svg{width:22px;height:22px}
.ct__row b{display:block;font-family:var(--fh)}.ct__row span{color:var(--soft);font-size:.97rem}
.fm{background:#fff;border:1px solid var(--line);border-radius:calc(var(--r) * 1.4);padding:clamp(22px,4vw,36px);box-shadow:0 30px 60px -40px rgba(0,0,0,.4)}
.fm h3{margin-bottom:16px}.fm .two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.fm label{display:block;font-size:.9rem;font-weight:600;margin:12px 0 6px}
.fm input,.fm select,.fm textarea{width:100%;padding:13px 14px;border:1px solid var(--line);border-radius:10px;font:inherit;font-size:1rem;background:var(--bg);color:var(--ink)}
.fm textarea{min-height:110px;resize:vertical}.fm .btn{margin-top:18px;width:100%;justify-content:center}
.fm .note{font-size:.85rem;color:var(--soft);margin-top:10px;text-align:center}
.hours{width:100%;border-collapse:collapse;font-size:.97rem}.hours td{padding:6px 0;border-bottom:1px solid var(--line)}.hours td:last-child{text-align:right;color:var(--soft)}
/* footer */
.ft{background:var(--dark);color:rgba(255,255,255,.75);padding:64px 0 28px;font-size:.96rem}
.ft__g{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:32px;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,.12)}
.ft .logo{margin-bottom:14px}.ft h4{color:#fff;font-size:1rem;margin-bottom:12px}.ft a{display:block;padding:4px 0}.ft a:hover{color:#fff}
.ft__demo{margin-top:22px;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font-size:.86rem;color:rgba(255,255,255,.6)}
.ft__demo a{display:inline;color:#fff;text-decoration:underline}
/* sticky mobile call bar */
.mb{display:none}
/* reveal */
.rv{opacity:0;transform:translateY(30px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}.rv[data-d="1"]{transition-delay:.1s}.rv[data-d="2"]{transition-delay:.2s}.rv[data-d="3"]{transition-delay:.3s}
.rv-img{clip-path:inset(12% 0 0 0);transition:clip-path 1.1s cubic-bezier(.16,1,.3,1)}.rv-img.in{clip-path:inset(0 0 0 0)}
@media (prefers-reduced-motion:reduce){.rv,.rv-img{opacity:1;transform:none;clip-path:none;transition:none}.hero__img{animation:none}html{scroll-behavior:auto}}
@media (max-width:900px){
  .nv,.hd .btn{display:none}.tg{display:inline-flex}
  .hd.open{background:#fff}.hd.open .logo{color:var(--ink)}.hd.open .tg{background:var(--bg2);color:var(--ink)}
  .hd.open .nv{display:flex;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;background:#fff;padding:10px 18px 20px;box-shadow:0 20px 30px -20px rgba(0,0,0,.3)}
  .hd.open .nv a{color:var(--ink);padding:14px;font-size:1.05rem}
  .split,.ct{grid-template-columns:1fr}.split--r .split__img{order:0}
  .gal{grid-template-columns:repeat(2,1fr);grid-auto-rows:160px}.gal figure:first-child{grid-row:span 1}.gal figure:nth-child(n+6){display:none}
  .ft__g{grid-template-columns:1fr}
  .mb{display:flex;position:fixed;left:12px;right:12px;bottom:12px;z-index:60;gap:10px}
  .mb a{flex:1;justify-content:center;padding:14px 12px;box-shadow:0 14px 30px -10px rgba(0,0,0,.45)}
  body{padding-bottom:78px}
  .fm .two{grid-template-columns:1fr}
}`;
}

const JS = `(function(){
var hd=document.querySelector('.hd'),solid=hd&&hd.classList.contains('light');
function s(){if(!hd||solid)return;hd.classList.toggle('solid',window.scrollY>40);}
window.addEventListener('scroll',s,{passive:true});s();
var t=document.querySelector('.tg');if(t)t.addEventListener('click',function(){hd.classList.toggle('open');});
var els=document.querySelectorAll('.rv,.rv-img');
if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(function(e){e.classList.add('in')});}
else{var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});els.forEach(function(e){io.observe(e)});}
document.querySelectorAll('form[data-demo]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var b=f.querySelector('button');if(b)b.textContent='This is a demo form, nothing was sent';});});
})();`;

/* ---------------- section renderers ---------------- */
const S = {
  hero: (d, s) => `<section class="hero"><div class="hero__img" style="background-image:url('${photo(s.image, 2000)}')" role="img" aria-label="${esc(s.alt)}"></div><div class="w">
    ${s.kicker ? `<span class="kick rv">${s.kicker}</span>` : ''}
    <h1 class="rv" data-d="1">${s.h1}</h1><p class="rv" data-d="2">${s.sub}</p>
    <div class="hero__cta rv" data-d="3">${ctaButtons(d, s.cta, true)}</div>
    ${s.chips ? `<div class="hero__chips rv" data-d="3">${s.chips.map(c => `<span>${ic('check')}${c}</span>`).join('')}</div>` : ''}
  </div></section>`,

  pagehead: (d, s) => `<section class="ph"><div class="hero__img" style="background-image:url('${photo(s.image, 1800)}')" role="img" aria-label="${esc(s.alt)}"></div><div class="w">
    ${s.kicker ? `<span class="kick rv">${s.kicker}</span>` : ''}<h1 class="rv" data-d="1">${s.h1}</h1>${s.sub ? `<p class="rv" data-d="2">${s.sub}</p>` : ''}</div></section>`,

  cards: (d, s) => wrapSec(s, `<div class="cards">${s.items.map((it, i) => `<${it.href ? 'a' : 'div'} class="card rv" data-d="${i % 3}"${it.href ? ` href="${link(d, it.href)}"` : ''}>
      ${it.image ? `<div class="card__img"><img src="${photo(it.image, 800)}" alt="${esc(it.alt || it.title)}" loading="lazy"></div>` : ''}
      <div class="card__b">${it.price ? `<div class="price">${it.price}</div>` : ''}<h3>${it.title}</h3><p>${it.text}</p>${it.href ? `<span class="more">${it.more || 'Learn more'} ${ic('arrow')}</span>` : ''}</div></${it.href ? 'a' : 'div'}>`).join('')}</div>`),

  split: (d, s) => wrapSec(s, `<div class="split ${s.flip ? 'split--r' : ''}">
      <div class="split__img rv-img"><img src="${photo(s.image, 1200)}" alt="${esc(s.alt)}" loading="lazy"></div>
      <div class="rv">${s.kicker ? `<span class="kick">${s.kicker}</span>` : ''}<h2>${s.title}</h2>${(s.paras || []).map(p => `<p>${p}</p>`).join('')}
        ${s.ticks ? `<ul class="ticks">${s.ticks.map(t => `<li>${ic('check')}<span>${t}</span></li>`).join('')}</ul>` : ''}
        ${s.cta ? `<div class="hero__cta" style="margin-top:8px">${ctaButtons(d, s.cta)}</div>` : ''}</div></div>`, true),

  steps: (d, s) => wrapSec(s, `<div class="steps">${s.items.map((it, i) => `<div class="step rv" data-d="${i % 4}"><h3>${it.title}</h3><p>${it.text}</p></div>`).join('')}</div>`),

  gallery: (d, s) => wrapSec(s, `<div class="gal">${s.items.map((it, i) => `<figure class="rv" data-d="${i % 3}"><img src="${photo(it.image, 900)}" alt="${esc(it.alt)}" loading="lazy"><figcaption>${it.alt}</figcaption></figure>`).join('')}</div>`),

  menu: (d, s) => wrapSec(s, `<div class="menu">${s.groups.map((g, i) => `<div class="rv" data-d="${i % 3}"><h3>${g.name}</h3>${g.items.map(it => `<div class="mi"><div><b>${it.name}</b>${it.note ? `<small>${it.note}</small>` : ''}</div><span>${it.price}</span></div>`).join('')}</div>`).join('')}</div>`),

  faq: (d, s) => wrapSec(s, `<div class="faq">${s.items.map((q, i) => `<details class="rv"${i === 0 ? ' open' : ''}><summary>${q.q}</summary><p>${q.a}</p></details>`).join('')}</div>`),

  reviews: (d, s) => wrapSec(s, `<div class="rv-note rv"><div class="stars">${ic('star').repeat(5)}</div><h3>${s.noteTitle || 'Your Google reviews show up here'}</h3><p>${s.note || 'On your site, this spot shows your real reviews from Google, so new customers see what past customers said.'}</p></div>`),

  cta: (d, s) => `<section class="sec"><div class="w"><div class="cta rv"><div class="hero__img" style="background-image:url('${photo(s.image, 1800)}')"></div>
    <h2>${s.title}</h2><p>${s.text}</p><div class="hero__cta">${ctaButtons(d, s.cta, true)}</div></div></div></section>`,

  contact: (d, s) => wrapSec(s, `<div class="ct">
      <div class="ct__info rv">
        <div class="ct__row"><i>${ic('phone')}</i><div><b>Call or text</b><span>${d.phone}</span></div></div>
        <div class="ct__row"><i>${ic('mail')}</i><div><b>Email</b><span>${d.email}</span></div></div>
        <div class="ct__row"><i>${ic('pin')}</i><div><b>${d.addressLabel || 'Service area'}</b><span>${d.area}</span></div></div>
        <div class="ct__row"><i>${ic('clock')}</i><div style="flex:1"><b>Hours</b><table class="hours">${d.hours.map(h => `<tr><td>${h[0]}</td><td>${h[1]}</td></tr>`).join('')}</table></div></div>
      </div>
      <form class="fm rv" data-d="1" data-demo><h3>${s.formTitle || 'Get a free quote'}</h3>
        <div class="two"><div><label>Name</label><input placeholder="Your name"></div><div><label>Phone</label><input placeholder="Best number"></div></div>
        ${s.select ? `<label>${s.select.label}</label><select>${s.select.options.map(o => `<option>${o}</option>`).join('')}</select>` : ''}
        <label>${s.messageLabel || 'Tell us about the job'}</label><textarea></textarea>
        <button class="btn btn--p" type="submit">${s.button || 'Send'} ${ic('arrow')}</button>
        <p class="note">Demo form. Nothing is sent.</p>
      </form></div>`),
};

function wrapSec(s, inner, bare) {
  const cls = `sec${s.tone === 'alt' ? ' sec--alt' : ''}${s.tone === 'dark' ? ' sec--dark' : ''}`;
  const head = s.title && !bare ? `<div class="head ${s.center === false ? '' : 'head--c'} rv">${s.kicker ? `<span class="kick">${s.kicker}</span>` : ''}<h2>${s.title}</h2>${s.lead ? `<p class="lead">${s.lead}</p>` : ''}</div>` : '';
  return `<section class="${cls}"><div class="w">${head}${inner}</div></section>`;
}

let BASE = '';
const link = (d, href) => href.startsWith('#') || /^https?:|^tel:|^mailto:/.test(href) ? href : `${BASE}${href.replace(/^\//, '')}`;

function ctaButtons(d, cta, onDark) {
  const list = cta || [{ label: d.primaryCta.label, href: d.primaryCta.href }, { label: d.phone, href: d.phoneHref, phone: true }];
  return list.map((b, i) => `<a class="btn ${i === 0 ? 'btn--p' : onDark ? 'btn--o' : 'btn--g'}" href="${link(d, b.href)}">${b.phone ? ic('phone') : ''}${b.label}${i === 0 ? ' ' + ic('arrow') : ''}</a>`).join('');
}

function shell(d, pg, body) {
  const navLinks = d.pages.map(p => `<a href="${link(d, p.slug ? p.slug + '/' : '')}"${p.slug === pg.slug ? ' aria-current="page"' : ''}>${p.nav}</a>`).join('');
  const heroFirst = ['hero', 'pagehead'].includes(pg.sections[0]?.type);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${pg.title || pg.nav} | ${d.name}</title>
<meta name="description" content="${esc(d.tagline)}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${d.fonts.url}&display=swap">
<link rel="preconnect" href="https://images.unsplash.com">
<style>${css(d)}</style></head><body>
<header class="hd${heroFirst ? '' : ' light'}"><div class="w">
  <a class="logo" href="${link(d, '')}"><i>${ic(d.icon)}</i>${d.name}</a>
  <nav class="nv">${navLinks}</nav>
  <a class="btn btn--p" href="${link(d, d.primaryCta.href)}">${d.primaryCta.label}</a>
  <button class="tg" aria-label="Menu"><span></span></button>
</div></header>
<main>${body}</main>
<footer class="ft"><div class="w"><div class="ft__g">
  <div><a class="logo" href="${link(d, '')}"><i>${ic(d.icon)}</i>${d.name}</a><p>${d.tagline}</p></div>
  <div><h4>Pages</h4>${d.pages.map(p => `<a href="${link(d, p.slug ? p.slug + '/' : '')}">${p.nav}</a>`).join('')}</div>
  <div><h4>Contact</h4><a href="${d.phoneHref}">${d.phone}</a><span style="display:block;padding:4px 0">${d.email}</span><span style="display:block;padding:4px 0">${d.area}</span></div>
</div>
<div class="ft__demo"><span>Demo website by EvoVero. ${d.name} is a made up business and the photos are stock photos.</span><a href="/get-started/" target="_top">Get a website like this</a></div>
</div></footer>
<div class="mb"><a class="btn btn--p" href="${d.phoneHref}">${ic('phone')} Call</a><a class="btn btn--g" href="${link(d, d.primaryCta.href)}">${d.primaryCta.short || d.primaryCta.label}</a></div>
<script>${JS}</script></body></html>`;
}

export function renderDemo(d, OUT) {
  BASE = `/websites/demo/${d.slug}/`;
  let n = 0;
  for (const pg of d.pages) {
    const body = pg.sections.map(s => {
      if (!S[s.type]) throw new Error(`Demo ${d.slug}: unknown section type "${s.type}"`);
      return S[s.type](d, s);
    }).join('\n');
    const dir = join(OUT, 'websites', 'demo', d.slug, pg.slug || '');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), shell(d, pg, body));
    n++;
  }
  return n;
}
