/* Black Friday preview builder (approved by Spencer 2026-11-15, concrete page first).
   Replaces the six quick taps on a trade page whose TRADES entry has a `builder` block (blackfriday.mjs).
   A small website sits on the top half of the phone and fills in as the lead answers: business name,
   tagline, services (the menu opens and each tap lands in it), cities, main color, call button number.
   The question sits under it, because a phone keyboard covers the bottom of the screen.

   WORDS: every lead facing word is in WORDS below and is mirrored in the Notion build doc
   "2026-11-11 W100 Black Friday build doc", section 3, block "BUILDER, 11/15". Change words there first.

   It posts to the same Netlify form as the taps (website-trial) with tagline, cities and call_number added.
   After Send the same screen shows the thank you words, one optional photos card (the photo picker opens
   right there, files go through the /photos uploader) and a small row for reaching Spencer. */

export const WORDS = {
  siteLabel: 'Your website',
  siteLabelEnd: 'Your website. Scroll it.',
  name: { q: "What's your business called?", help: 'It goes at the top of your website.' },
  tagline: { q: 'Do you have a tagline?', help: "This can change, and it will look different on the real preview I send you. Enter something you'd like to see. It can always change later." },
  services: { q: 'What do you do? Tap all that fit.', help: 'Each one goes in your menu.' },
  cities: { q: 'What cities do you work in?', help: 'Type a city and watch it land on your website.', placeholder: 'Type a city', add: '+ Add another city' },
  color: { q: 'Pick your main color.', help: 'This can always change later. Shades can change. Color combinations can change. Everything can change. We just need a place to start.' },
  phone: { q: 'What number should the call button dial?', help: "There's a call button on every page." },
  send: { q: 'Last one. How should I reach you?', help: 'Tap all that work. I finish your preview and send you the link within 48 hours.', btn: 'Send me my preview', assure: "No credit card. Don't like it? You owe nothing." },
  done: {
    h: "You're all set. Your preview is next.",
    lead: "I'll text and email you the link within 48 hours from 402-698-4902.",
    watch: 'Watch for a text from me asking which job you want more of. Your answer goes at the top of your website.',
    optTag: 'Optional',
    optH: 'Want your own photos on it?',
    optP: "Add photos of your work or your logo and I'll put them on your preview. Skip this and I'll use stock photos for now.",
    optBtn: 'Add photos or a logo',
    askH: 'Have a question before then? Reach me here.',
    pick: 'Or pick a time for me to call you',
    textBody: 'Send my preview to this number.',
  },
  // On the little website itself
  site: {
    noName: 'Your Business Name', noSvc: 'Your services show up here', noCity: 'Your cities show up here',
    menuSvc: 'Services', menuArea: 'Areas We Serve', call: 'Call Now', estimate: 'Get a Free Estimate',
    svcK: 'What we do', svcH: 'Our Services', areaK: 'Where we work', areaH: 'Areas We Serve',
    formK: 'Free estimate', formH: 'Get Your Free Estimate', f1: 'Name', f2: 'Phone', f3: 'Tell us about the job', formBtn: 'Send My Request',
  },
};

export const BUILDER_COLORS = [['Orange', '#E0701F'], ['Red', '#C62828'], ['Blue', '#1F5FBF'], ['Navy', '#1B2A55'], ['Green', '#2C6B3F'], ['Black', '#1c1c1c'], ['Gold', '#B8860B'], ['Purple', '#6B3FA0']];

export const builderCss = `
.bb-sec{background:#cfcbc0;scroll-margin-top:0}
.bb{--bbh:100vh;height:var(--bbh);min-height:540px;max-height:940px;display:flex;flex-direction:column;background:#fff;overflow:hidden;position:relative}
@supports (height:100svh){.bb{--bbh:100svh}}
.bb.kb{min-height:0}
.bb-bar{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;background:var(--ink);color:var(--cream);min-width:0}
.bb-bar>span:first-child{display:flex;gap:5px;flex:1 1 0;min-width:0;white-space:nowrap;overflow:hidden}
.bb-bar .bf-tag{font-size:.8rem;padding:5px 7px 4px}
.bb-count{flex:none;font:600 .86rem var(--font-head);white-space:nowrap}
.bb-prog{flex:none;height:5px;background:#2a2a2c}.bb-prog i{display:block;height:100%;width:0;background:var(--acc);transition:width .3s}
.bb-pv{flex:0 0 46%;min-height:0;min-width:0;position:relative;background:#cfcbc0;padding:8px 10px 0;transition:flex-basis .35s}
.bb.end .bb-pv{flex-basis:40%}
.bb-pv__lab{position:absolute;left:50%;top:0;transform:translate(-50%,-2px);z-index:6;background:var(--ink);color:var(--cream);font:600 .7rem var(--font-head);padding:3px 10px;border-radius:0 0 8px 8px;white-space:nowrap}
.bs{height:100%;border-radius:12px 12px 0 0;overflow:hidden;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.18);position:relative;font-family:Inter,system-ui,sans-serif;--b:#E0701F;--bfoot:#3a2412}
.bs__scroll{height:100%;overflow-y:auto;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain}.bs__scroll::-webkit-scrollbar{display:none}
.bs-hd{position:sticky;top:0;z-index:4;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 12px;background:#fff;border-bottom:1px solid #e6e3da}
.bs-logo{display:flex;align-items:center;gap:8px;min-width:0;font:800 1rem Archivo,var(--font-head);color:#1c2228}
.bs-logo i{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:8px;background:var(--b);color:#fff;transition:background .3s}
.bs-logo i svg{width:17px;height:17px}
.bs-logo span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bs-logo span.ph{color:#a9a59b;font-weight:600}
.bs-bg{flex:none;width:36px;height:32px;border-radius:8px;background:#efece4;display:grid;place-items:center}
.bs-bg b{display:block;width:16px;height:2px;background:#1c2228;box-shadow:0 5px #1c2228,0 -5px #1c2228}
.bs-menu{position:absolute;left:0;right:0;top:51px;bottom:0;z-index:3;background:#fff;padding:12px 14px;overflow-y:auto;transform:translateY(-8px);opacity:0;pointer-events:none;transition:opacity .25s,transform .25s}
.bs-menu.open{opacity:1;transform:none;pointer-events:auto}
.bs-menu h4,.bs-sec .k{font:700 .68rem var(--font-head);letter-spacing:.1em;text-transform:uppercase;color:color-mix(in srgb,var(--b) 78%,#000)}
.bs-menu h4{margin:6px 0 4px}
.bs-menu ul{list-style:none;margin:0 0 10px;padding:0}
.bs-menu li{padding:8px 2px;border-bottom:1px solid #eeebe3;font:600 .98rem Archivo,var(--font-head);color:#1c2228;display:flex;align-items:center;justify-content:space-between}
.bs-menu li:after{content:"\\203A";color:#b5b1a6;font-size:1.1rem}
.bs-menu li.ph{color:#b5b1a6;font-weight:500;font-family:Inter,sans-serif;font-size:.86rem;border-bottom-style:dashed}.bs-menu li.ph:after{content:""}
.bs-menu li.live{color:#8a867c}
.bs-hero{position:relative;padding:22px 14px 20px;color:#fff;background:linear-gradient(180deg,rgba(0,0,0,.3),rgba(0,0,0,.72)),var(--photo) center/cover no-repeat}
.bs-kick{display:inline-block;font:600 .62rem var(--font-head);letter-spacing:.1em;text-transform:uppercase;background:rgba(255,255,255,.2);padding:4px 9px;border-radius:999px}
.bs-hero h3{font:800 1.5rem/1.1 Archivo,var(--font-head);margin:9px 0 7px;letter-spacing:-.01em;color:#fff;overflow-wrap:anywhere}
.bs-hero p{font-size:.84rem;color:rgba(255,255,255,.92);min-height:1.2em}
.bs-btns{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}
.bs-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 13px;border-radius:999px;font:700 .82rem Archivo,var(--font-head);background:var(--b);color:#fff;transition:background .3s}
.bs-btn svg{width:13px;height:13px}.bs-btn.o{background:none;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.7)}
.bs-sec{padding:16px 14px}.bs-sec h4{font:800 1.05rem Archivo,var(--font-head);color:#1c2228;margin:2px 0 9px}
.bs-sec.tint{background:color-mix(in srgb,var(--b) 9%,#fff)}
.bs-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.bs-card{border:1px solid #e3e0d7;border-radius:10px;overflow:hidden;background:#fff}
.bs-card u{display:block;height:56px;background:#ccc center/cover no-repeat}
.bs-card b{display:block;padding:7px 8px 8px;font:700 .78rem Archivo,var(--font-head);color:#1c2228}
.bs-card.ph{border-style:dashed;display:grid;place-items:center;min-height:74px;color:#b5b1a6;font-size:.74rem;grid-column:1/-1}
.bs-areas{display:flex;flex-wrap:wrap;gap:6px}
.bs-areas span{padding:5px 10px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px #e3e0d7;font:600 .78rem Archivo,var(--font-head);color:#1c2228}
.bs-areas span.ph{box-shadow:none;border:1px dashed #cbc7bc;color:#b5b1a6;font-weight:500;font-family:Inter,sans-serif}
.bs-form{background:#f4f2ec;border-radius:12px;padding:12px}
.bs-form div{height:30px;border-radius:7px;background:#fff;border:1px solid #e0ddd4;margin-bottom:7px;font-size:.74rem;color:#a9a59b;display:flex;align-items:center;padding:0 9px}
.bs-form .bs-btn{width:100%;justify-content:center}
.bs-ft{background:var(--bfoot);background:color-mix(in srgb,var(--b) 72%,#000);color:rgba(255,255,255,.85);padding:14px;font-size:.76rem;transition:background .3s}.bs-ft b{display:block;color:#fff;font:800 .92rem Archivo,var(--font-head);margin-bottom:3px}
@keyframes bb-pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}
@keyframes bb-glow{0%{box-shadow:0 0 0 0 var(--acc)}30%{box-shadow:0 0 0 3px var(--acc),0 0 18px 4px var(--acc)}100%{box-shadow:0 0 0 0 transparent}}
.bs .new{animation:bb-pop .35s cubic-bezier(.2,1.3,.4,1) both}
.bs .hit{animation:bb-glow 1.1s ease-out both;border-radius:8px}
@media (prefers-reduced-motion:reduce){.bs .new,.bs .hit{animation:none}.bs__scroll{scroll-behavior:auto}}
/* the question */
.bb-q{flex:1;min-height:0;min-width:0;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:14px 16px 18px;background:#fff;border-top:2px solid var(--ink)}
.bb-q h2{font:700 1.34rem/1.22 var(--font-head);margin-bottom:4px;letter-spacing:0}
.bb-help{color:var(--soft);font-size:.96rem;line-height:1.45;margin-bottom:12px}
.bb.kb .bb-help{display:none}.bb.kb .bb-q h2{font-size:1.1rem;margin-bottom:8px}.bb.kb .bb-q{padding-top:10px}
.bb-chips{display:grid;grid-template-columns:1fr 1fr;gap:8px}.bb-chips.three{grid-template-columns:repeat(3,1fr)}
.bb-chip{min-height:54px;padding:8px 10px;border:2px solid #cfc9ba;border-radius:12px;background:#fff;font:600 .98rem var(--font-head);line-height:1.2;color:var(--ink);cursor:pointer;text-align:center;-webkit-tap-highlight-color:transparent}
.bb-chip[aria-pressed=true]{border-color:var(--ink);background:var(--tint);box-shadow:inset 0 0 0 1px var(--ink)}
.bb-sw{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.bb-sw button{height:58px;border-radius:12px;border:2px solid rgba(0,0,0,.15);cursor:pointer;position:relative;-webkit-tap-highlight-color:transparent}
.bb-sw button[aria-pressed=true]{box-shadow:0 0 0 3px #fff,0 0 0 5px var(--ink)}
.bb-sw button span{position:absolute;inset:auto 0 4px;text-align:center;font:600 .68rem var(--font-head);color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.6)}
.bb-in{width:100%;padding:14px 14px;border:2px solid #cfc9ba;border-radius:12px;font:inherit;font-size:1.08rem;background:#fff;color:var(--ink)}
.bb-in:focus{outline:none;border-color:var(--ink)}
.bb-field{margin-top:10px}.bb-field label{display:block;margin-bottom:5px;font:600 .92rem var(--font-head)}
.bb-add{width:100%;margin-top:8px;min-height:50px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 2px var(--ink);color:var(--ink);font:700 .98rem var(--font-head);cursor:pointer}
.bb-mine{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.bb-mine:empty{display:none}
.bb-mine button{border:0;background:var(--tint);box-shadow:inset 0 0 0 1.5px var(--ink);border-radius:999px;padding:8px 12px;font:600 .88rem var(--font-head);color:var(--ink);cursor:pointer}
.bb-nav{display:flex;align-items:center;gap:10px;margin-top:14px}
.bb-next{flex:1;min-height:58px;border:0;border-radius:14px;background:var(--ink);color:#fff;font:700 1.1rem var(--font-head);cursor:pointer;-webkit-tap-highlight-color:transparent}
.bb-next.go{background:var(--acc);color:#0D0D0D}.bb-next[disabled]{opacity:.6}
.bb-back{border:0;background:none;color:var(--soft);font:inherit;font-size:.96rem;padding:12px 4px;cursor:pointer}
.bb-small{margin-top:10px;text-align:center;font-size:.9rem;color:var(--ink);font-weight:600}
.bb-consent{margin-top:8px;text-align:center;color:var(--soft);font-size:.76rem;line-height:1.4}.bb-consent a{color:var(--soft);text-decoration:underline}
.bb-err{margin-top:10px;color:#b3261e;font-weight:600;font-size:.96rem}
.bb-done{display:grid;gap:12px}.bb-done[hidden]{display:none}
.bb-done p{color:#2c2b28;font-size:.98rem}
.bb-opt{border:2px solid var(--ink);border-radius:14px;padding:13px 14px;background:var(--tint)}
.bb-opt .t{display:inline-block;font:700 .72rem 'Barlow Condensed',sans-serif;letter-spacing:.08em;text-transform:uppercase;background:var(--ink);color:#fff;padding:3px 7px;margin-bottom:6px}
.bb-opt h3{font:700 1.08rem var(--font-head);margin-bottom:3px}.bb-opt p{font-size:.92rem;margin-bottom:10px}
.bb-opt .pd__name,.bb-opt .pd__zone,.bb-opt .pd__hint{display:none}
.bb-opt .pd__btn{min-height:50px;border:0;border-radius:12px;background:var(--ink);color:#fff;font:700 1rem var(--font-head);box-shadow:none}
.bb-askh{font:700 1rem var(--font-head);color:var(--ink)!important}
.bb-acts{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.bb-acts a{display:flex;align-items:center;justify-content:center;gap:6px;min-height:50px;border-radius:12px;box-shadow:inset 0 0 0 2px var(--ink);font:700 1rem var(--font-head);color:var(--ink);text-decoration:none}
.bb-acts a svg{width:17px;height:17px}
.bb-pick{text-align:center}.bb-pick a{color:var(--ink);font-weight:600;font-size:.95rem;text-decoration:underline;text-underline-offset:3px;display:inline-block;padding:8px}
@media (min-width:900px){
  .bb-sec{padding:44px 20px;background:var(--paper2)}
  .bb{max-width:1040px;margin:0 auto;height:680px;min-height:0;border-radius:22px;border:2px solid var(--ink);display:grid;grid-template-columns:420px minmax(0,1fr);grid-template-rows:auto auto minmax(0,1fr)}
  .bb-bar,.bb-prog{grid-column:1/-1}
  .bb-pv{grid-column:1;grid-row:3;flex-basis:auto!important;padding:18px 18px 0}
  .bb-q{grid-column:2;grid-row:3;border-top:0;border-left:2px solid var(--ink);padding:34px 40px}
  .bb-q h2{font-size:1.7rem}.bb-help{font-size:1.05rem}
  .bb-q>div{max-width:520px}
}`;

const ICON_HOME = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>';
const ICON_PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 7a1 1 0 0 1 1-1Z"/></svg>';
const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/* The builder section. ctx: { PROMO, path, site, uploaderHtml, tags } */
export function builderHtml(t, ctx) {
  const W = WORDS, S = W.site, b = t.builder, smsBase = ctx.site.phoneHref.replace('tel:', 'sms:');
  // Hidden real form: Netlify reads the field list from here at deploy. The script fills and posts it.
  const fields = ['source', 'business', 'tagline', 'services', 'services_other', 'cities', 'colors', 'call_number', 'contact_pref', 'name', 'phone', 'email', 'has_logo', 'colors_other', 'anything_else'];
  const form = `<form id="bb-form" name="website-trial" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="${ctx.path}/thanks/" hidden>
    <input type="hidden" name="form-name" value="website-trial"><input type="hidden" name="form_version" value="${ctx.PROMO.formVersion} (builder)">
    <input type="hidden" name="promo" value="${ctx.PROMO.slug}"><input type="hidden" name="trade" value="${t.slug}"><input type="hidden" name="demo_pick" value="${attr(t.demo.name)}">
    <input name="bot-field">${fields.map(f => `<input type="hidden" name="${f}">`).join('')}</form>`;
  return `<section class="bb-sec" id="taps"><div class="bb" id="bb">
  <div class="bb-bar"><span>${ctx.tags}</span><span class="bb-count" id="bb-count" aria-live="polite"></span></div>
  <div class="bb-prog"><i id="bb-prog"></i></div>
  <div class="bb-pv" id="bb-pv"><span class="bb-pv__lab" id="bb-lab">${W.siteLabel}</span>
    <div class="bs" id="bs" aria-hidden="true" style="--photo:url('${b.hero}')">
      <div class="bs__scroll" id="bs-scroll">
        <div class="bs-hd"><div class="bs-logo"><i id="bs-icon">${ICON_HOME}</i><span id="bs-name" class="ph">${S.noName}</span></div><div class="bs-bg"><b></b></div></div>
        <div class="bs-hero"><span class="bs-kick">${b.kick}</span><h3 id="bs-h">${b.tagline}</h3><p id="bs-sub"></p>
          <div class="bs-btns"><span class="bs-btn" id="bs-call">${ICON_PHONE}<span id="bs-callt">${S.call}</span></span><span class="bs-btn o">${S.estimate}</span></div></div>
        <div class="bs-sec"><span class="k">${S.svcK}</span><h4>${S.svcH}</h4><div class="bs-cards" id="bs-cards"></div></div>
        <div class="bs-sec tint"><span class="k">${S.areaK}</span><h4>${S.areaH}</h4><div class="bs-areas" id="bs-areas"></div></div>
        <div class="bs-sec"><span class="k">${S.formK}</span><h4>${S.formH}</h4><div class="bs-form"><div>${S.f1}</div><div>${S.f2}</div><div>${S.f3}</div><span class="bs-btn" id="bs-send">${S.formBtn}</span></div></div>
        <div class="bs-ft"><b id="bs-ftname">${S.noName}</b><span id="bs-ftline"></span></div>
      </div>
      <div class="bs-menu" id="bs-menu"><h4>${S.menuSvc}</h4><ul id="bs-msvc"></ul><h4>${S.menuArea}</h4><ul id="bs-marea"></ul></div>
    </div>
  </div>
  <div class="bb-q" id="bb-q">
    <div id="bb-step"></div>
    <div class="bb-done" id="bb-done" hidden>
      <h2 tabindex="-1" id="bb-doneh">${W.done.h}</h2>
      <p>${W.done.lead.replace(ctx.site.phone, `<span style="white-space:nowrap">${ctx.site.phone}</span>`)}</p>
      <p>${W.done.watch}</p>
      <div class="bb-opt"><span class="t">${W.done.optTag}</span><h3>${W.done.optH}</h3><p>${W.done.optP}</p>${ctx.uploaderHtml}</div>
      <p class="bb-askh">${W.done.askH}</p>
      <div class="bb-acts" id="bb-acts">
        <a data-act="Text" id="bb-sms" href="${smsBase}?&body=${encodeURIComponent(W.done.textBody)}">Text</a>
        <a data-act="Call" href="${ctx.site.phoneHref}">Call</a>
        <a data-act="Email" href="mailto:${ctx.site.email}">Email</a>
      </div>
      <p class="bb-pick"><a href="${ctx.PROMO.callLink}" target="_blank" rel="noopener">${W.done.pick}</a></p>
    </div>
  </div>
  ${form}
</div></section>`;
}

export function builderScript(t, ctx) {
  const W = WORDS, b = t.builder;
  const data = { trade: t.slug, promo: ctx.PROMO.slug, services: t.services, colors: BUILDER_COLORS, def: { tagline: b.tagline, color: b.color }, cards: b.cards, other: b.other, eg: b.eg, sms: ctx.site.phoneHref.replace('tel:', 'sms:'), done: `${ctx.path}/thanks/`, W };
  return `<script>(function(){
  var D=${JSON.stringify(data)},W=D.W,KEY='bf_b1_'+D.trade,box=document.getElementById('bb');if(!box)return;
  var src=new URLSearchParams(location.search).get('src')||'direct',known=['form','text','email'].indexOf(src)>-1;
  var STEPS=['name','tagline','services','cities','color','phone','send'],S,cur=0,sent=false,ERR='';
  function $(id){return document.getElementById(id);}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function ga(n,p){try{p=p||{};p.promo=D.promo;p.trade=D.trade;if(window.gtag)gtag('event',n,p);}catch(e){}}
  function blank(){return {name:'',tagline:D.def.tagline,services:[],showOther:false,other:'',cities:[],draft:'',color:'',phone:'',reach:[],who:'',wphone:'',wemail:''};}
  function load(){try{var d=JSON.parse(localStorage.getItem(KEY)||'null');if(d&&d.S){S=Object.assign(blank(),d.S);cur=Math.max(0,Math.min(STEPS.length-1,d.q||0));return;}}catch(e){}S=blank();}
  function save(){try{localStorage.setItem(KEY,JSON.stringify({q:cur,S:S}));}catch(e){}}
  function norm(v){return String(v).trim().replace(/\\s+/g,' ');}
  function allCities(){var c=S.cities.slice(),d=norm(S.draft);if(d&&c.map(function(x){return x.toLowerCase();}).indexOf(d.toLowerCase())<0)c.push(d);return c;}
  function commitCity(){var v=norm(S.draft);S.draft='';if(v&&S.cities.map(function(c){return c.toLowerCase();}).indexOf(v.toLowerCase())<0){S.cities.push(v);return v;}return null;}
  function fmtPhone(v){var d=String(v).replace(/\\D/g,'');if(d.length===11&&d[0]==='1')d=d.slice(1);d=d.slice(0,10);if(!d)return '';if(d.length<4)return '('+d;if(d.length<7)return '('+d.slice(0,3)+') '+d.slice(3);return '('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);}
  function cityLine(){var c=allCities();if(!c.length)return '';if(c.length===1)return 'Serving '+c[0]+'.';return 'Serving '+c.slice(0,-1).join(', ')+' and '+c[c.length-1]+'.';}
  function svcList(){var s=S.services.slice();if(norm(S.other))s.push(norm(S.other));return s;}
  function flash(el){if(!el)return;el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit');}
  function colorName(){for(var i=0;i<D.colors.length;i++)if(D.colors[i][1]===S.color)return D.colors[i][0];return '';}

  // ----- the little website -----
  function paintSite(added){
    var site=$('bs');site.style.setProperty('--b',S.color||D.def.color);
    var nm=$('bs-name');nm.textContent=norm(S.name)||W.site.noName;nm.className=norm(S.name)?'':'ph';$('bs-ftname').textContent=norm(S.name)||W.site.noName;
    $('bs-h').textContent=norm(S.tagline)||D.def.tagline;$('bs-sub').textContent=cityLine();
    var ph=fmtPhone(S.phone);$('bs-callt').textContent=ph?'Call '+ph:W.site.call;
    var CS=allCities(),dr=CS.length>S.cities.length?CS[CS.length-1]:null;
    $('bs-ftline').textContent=[ph,CS.join(', ')].filter(Boolean).join('  \\u00b7  ');
    var svc=svcList();
    $('bs-msvc').innerHTML=svc.length?svc.map(function(s){return '<li'+(s===added?' class="new"':'')+'>'+esc(s)+'</li>';}).join(''):'<li class="ph">'+W.site.noSvc+'</li>';
    $('bs-cards').innerHTML=svc.length?svc.map(function(s){return '<div class="bs-card'+(s===added?' new':'')+'"><u style="background-image:url('+(D.cards[s]||D.other)+')"></u><b>'+esc(s)+'</b></div>';}).join(''):'<div class="bs-card ph">'+W.site.noSvc+'</div>';
    $('bs-marea').innerHTML=CS.length?CS.map(function(s){return '<li class="'+(s===added?'new':'')+(s===dr?' live':'')+'">'+esc(s)+'</li>';}).join(''):'<li class="ph">'+W.site.noCity+'</li>';
    $('bs-areas').innerHTML=CS.length?CS.map(function(s){return '<span'+(s===added?' class="new"':'')+'>'+esc(s)+'</span>';}).join(''):'<span class="ph">'+W.site.noCity+'</span>';
  }
  function focusSite(step){
    var menu=$('bs-menu'),sc=$('bs-scroll'),end=step==='send'||step==='done';
    menu.classList.toggle('open',step==='services'||step==='cities');
    box.classList.toggle('end',step==='done');$('bb-lab').textContent=end?W.siteLabelEnd:W.siteLabel;
    sc.scrollTop=0;
    if(step==='cities'){var h=menu.querySelectorAll('h4')[1];if(h)menu.scrollTop=Math.max(0,h.offsetTop-10);}else menu.scrollTop=0;
    if(step==='name')flash($('bs-name'));if(step==='tagline')flash($('bs-h'));if(step==='color')flash($('bs-icon'));if(step==='phone')flash($('bs-call'));
  }

  // ----- the questions -----
  function nav(label,go){return '<div class="bb-nav">'+(cur>0?'<button type="button" class="bb-back" data-back>\\u2190 Back</button>':'')+'<button type="button" class="bb-next'+(go?' go':'')+'" data-next>'+label+'</button></div>';}
  function paintMine(){var m=$('bb-mine');if(m)m.innerHTML=S.cities.map(function(c,i){return '<button type="button" data-rm="'+i+'" aria-label="Remove '+esc(c)+'">'+esc(c)+' \\u00d7</button>';}).join('');}
  function paintQ(){
    var step=STEPS[cur],w=W[step],h='<h2>'+w.q+'</h2><p class="bb-help">'+w.help+'</p>';
    $('bb-count').textContent=(cur+1)+' of '+STEPS.length;$('bb-prog').style.width=((cur+1)/STEPS.length*100)+'%';
    if(step==='name')h+='<input class="bb-in" id="bb-name" aria-label="'+esc(w.q)+'" autocomplete="organization" enterkeyhint="next" placeholder="'+esc(D.eg)+'" value="'+esc(S.name)+'">'+(ERR?'<p class="bb-err" id="bb-err" role="alert">'+esc(ERR)+'</p>':'')+nav('Next');
    else if(step==='tagline')h+='<input class="bb-in" id="bb-tag" aria-label="'+esc(w.q)+'" autocomplete="off" enterkeyhint="next" value="'+esc(S.tagline)+'">'+nav('Next');
    else if(step==='services')h+='<div class="bb-chips">'+D.services.map(function(s){return '<button type="button" class="bb-chip" data-svc="'+esc(s)+'" aria-pressed="'+(S.services.indexOf(s)>-1)+'">'+s+'</button>';}).join('')+'<button type="button" class="bb-chip" data-other aria-pressed="'+(!!S.showOther)+'">Other</button></div>'+(S.showOther?'<input class="bb-in" id="bb-other" style="margin-top:8px" aria-label="Other" enterkeyhint="next" value="'+esc(S.other)+'">':'')+nav('Next');
    else if(step==='cities')h+='<input class="bb-in" id="bb-city" aria-label="'+esc(w.q)+'" autocomplete="off" enterkeyhint="done" placeholder="'+esc(w.placeholder)+'" value="'+esc(S.draft)+'"><button type="button" class="bb-add" id="bb-addcity">'+w.add+'</button><div class="bb-mine" id="bb-mine"></div>'+nav('Next');
    else if(step==='color')h+='<div class="bb-sw">'+D.colors.map(function(c){return '<button type="button" data-color="'+c[1]+'" style="background:'+c[1]+'" aria-pressed="'+(S.color===c[1])+'" aria-label="'+c[0]+'"><span>'+c[0]+'</span></button>';}).join('')+'</div>'+nav('Next');
    else if(step==='phone')h+='<input class="bb-in" id="bb-phone" aria-label="'+esc(w.q)+'" type="tel" inputmode="tel" autocomplete="tel" enterkeyhint="next" placeholder="(402) 555-0123" value="'+esc(fmtPhone(S.phone))+'">'+nav('Next');
    else{h+='<div class="bb-chips three">'+['Text','Call','Email'].map(function(r){return '<button type="button" class="bb-chip" data-reach="'+r+'" aria-pressed="'+(S.reach.indexOf(r)>-1)+'">'+r+'</button>';}).join('')+'</div>';
      if(!known)h+='<div class="bb-field"><label for="bb-who">Your name</label><input class="bb-in" id="bb-who" autocomplete="name" value="'+esc(S.who)+'"></div><div class="bb-field"><label for="bb-wphone">Phone</label><input class="bb-in" id="bb-wphone" type="tel" inputmode="tel" autocomplete="tel" value="'+esc(S.wphone||fmtPhone(S.phone))+'"></div><div class="bb-field"><label for="bb-wemail">Email</label><input class="bb-in" id="bb-wemail" type="email" inputmode="email" autocomplete="email" value="'+esc(S.wemail)+'"></div>';
      h+=(ERR?'<p class="bb-err" id="bb-err" role="alert">'+esc(ERR)+'</p>':'')+nav(w.btn,true)+'<p class="bb-small">'+w.assure+'</p><p class="bb-consent">By sending this, you agree I can text and email you about your preview. Message and data rates may apply. Reply STOP to opt out. <a href="/privacy-policy/" target="_blank" rel="noopener">Privacy</a> and <a href="/terms/" target="_blank" rel="noopener">Terms</a>.</p>';}
    $('bb-step').innerHTML=h;$('bb-q').scrollTop=0;if(step==='cities')paintMine();
  }
  var fired={},seen=false;
  function track(){if(!seen||fired[cur]||sent)return;fired[cur]=1;ga('ft_step',{step:STEPS[cur],n:cur+1});}
  function go(i,tr){ERR='';cur=Math.max(0,Math.min(STEPS.length-1,i));paintQ();paintSite();focusSite(STEPS[cur]);save();if(tr){track();align();}}
  function jump(dy){try{window.scrollTo({top:window.scrollY+dy,behavior:'instant'});}catch(e){window.scrollBy(0,dy);}}
  function align(){var r=box.getBoundingClientRect();if(window.innerWidth<900&&Math.abs(r.top)>4)jump(r.top);}

  // ----- send -----
  function send(btn){
    if(!known){S.who=norm(($('bb-who')||{}).value||S.who);S.wphone=($('bb-wphone')||{}).value||S.wphone;S.wemail=norm(($('bb-wemail')||{}).value||S.wemail);}
    var miss=[];if(!known&&!S.who)miss.push('your name');if(!norm(S.name))miss.push('your business name');if(!known&&!S.wphone.replace(/\\D/g,'')&&!S.wemail)miss.push('a phone or email');
    if(miss.length){ERR='Add '+(miss.length>1?miss.slice(0,-1).join(', ')+' and '+miss[miss.length-1]:miss[0])+' so I know where to send your preview.';
      if(!norm(S.name))cur=0;paintQ();focusSite(STEPS[cur]);save();var f=$('bb-step').querySelector(cur===0?'#bb-name':(!S.who?'#bb-who':'#bb-wphone'));if(f)try{f.focus();}catch(x){}return;}
    btn.disabled=true;save();
    var form=$('bb-form'),v={source:src,business:norm(S.name),tagline:norm(S.tagline),services:S.services.concat(S.showOther&&norm(S.other)?['Other']:[]).join(', '),services_other:norm(S.other),cities:S.cities.join(', '),colors:colorName(),call_number:fmtPhone(S.phone),contact_pref:S.reach.join(', '),name:S.who,phone:known?'':fmtPhone(S.wphone)||S.wphone,email:S.wemail};
    Object.keys(v).forEach(function(k){var i=form.querySelector('[name="'+k+'"]');if(i)i.value=v[k];});
    try{localStorage.setItem('bf_who',JSON.stringify({business:v.business,pick:S.reach[0]||'',trade:D.trade}));}catch(x){}
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()})
      .then(function(r){if(!r.ok)throw 0;ga('trial_extras',{form_name:'website-trial'});ga('ft_submit',{src:src,builder:1});done();})
      .catch(function(){btn.disabled=false;HTMLFormElement.prototype.submit.call(form);});
  }
  function done(){
    sent=true;try{localStorage.setItem(KEY,JSON.stringify({q:0,S:S,sent:1}));}catch(e){}
    $('bb-step').hidden=true;var d=$('bb-done');d.hidden=false;$('bb-count').textContent='';$('bb-prog').style.width='100%';
    var acts=$('bb-acts');S.reach.slice().reverse().forEach(function(r){var a=acts.querySelector('[data-act="'+r+'"]');if(a)acts.insertBefore(a,acts.firstChild);});
    var biz=norm(S.name);if(biz)$('bb-sms').href=D.sms+'?&body='+encodeURIComponent('This is '+biz+'. '+W.done.textBody);
    var up=d.querySelector('.pd');if(up){if(up.pdSetName)up.pdSetName(biz||S.who||'Black Friday lead');var pb=up.querySelector('[data-pick]');if(pb)pb.textContent=W.done.optBtn;}
    [].slice.call(acts.querySelectorAll('a')).forEach(function(a){a.addEventListener('click',function(){ga('bf_contact_click',{kind:a.getAttribute('data-act')});});});
    paintSite();focusSite('done');$('bb-q').scrollTop=0;align();
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var sc=$('bs-scroll');setTimeout(function(){sc.scrollTop=sc.scrollHeight;},700);setTimeout(function(){sc.scrollTop=0;},3200);}
    try{$('bb-doneh').focus({preventScroll:true});}catch(e){}
  }

  // ----- events -----
  $('bb-step').addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-next')){if(STEPS[cur]==='cities')commitCity();if(cur===STEPS.length-1)send(b);else go(cur+1,true);return;}
    if(b.hasAttribute('data-back')){if(STEPS[cur]==='cities')commitCity();go(cur-1,false);return;}
    if(b.hasAttribute('data-svc')){var s=b.getAttribute('data-svc'),i=S.services.indexOf(s);if(i>-1)S.services.splice(i,1);else{S.services.push(s);S.services.sort(function(a,c){return D.services.indexOf(a)-D.services.indexOf(c);});}b.setAttribute('aria-pressed',i<0);paintSite(i<0?s:null);var n=$('bs-menu').querySelector('.new');if(n)try{$('bs-menu').scrollTop=Math.max(0,n.offsetTop-60);}catch(x){}save();return;}
    if(b.hasAttribute('data-other')){S.showOther=!S.showOther;if(!S.showOther)S.other='';paintQ();paintSite();var o=$('bb-other');if(o)o.focus();save();return;}
    if(b.id==='bb-addcity'){addCity();return;}
    if(b.hasAttribute('data-rm')){S.cities.splice(+b.getAttribute('data-rm'),1);paintMine();paintSite();save();return;}
    if(b.hasAttribute('data-color')){S.color=b.getAttribute('data-color');[].forEach.call($('bb-step').querySelectorAll('[data-color]'),function(x){x.setAttribute('aria-pressed',x===b);});paintSite();flash($('bs-call'));flash($('bs-icon'));save();return;}
    if(b.hasAttribute('data-reach')){var r=b.getAttribute('data-reach'),j=S.reach.indexOf(r);if(j>-1)S.reach.splice(j,1);else S.reach.push(r);b.setAttribute('aria-pressed',j<0);save();return;}
  });
  function addCity(){var v=commitCity(),i=$('bb-city');i.value='';paintMine();paintSite(v);var m=$('bs-menu'),n=m.querySelector('.new');if(n)m.scrollTop=Math.max(0,n.offsetTop-m.clientHeight+50);i.focus();save();}
  $('bb-step').addEventListener('input',function(e){var t=e.target,er=$('bb-err');if(er)er.hidden=true;ERR='';
    if(t.id==='bb-name'){S.name=t.value;paintSite();}
    else if(t.id==='bb-tag'){S.tagline=t.value;paintSite();}
    else if(t.id==='bb-other'){S.other=t.value;paintSite();var m=$('bs-menu');m.scrollTop=0;}
    else if(t.id==='bb-city'){S.draft=t.value;paintSite();var mm=$('bs-menu');mm.scrollTop=mm.scrollHeight;}
    else if(t.id==='bb-phone'){S.phone=t.value;var f=fmtPhone(t.value);if(t.value!==f)t.value=f;paintSite();}
    else if(t.id==='bb-who')S.who=t.value;else if(t.id==='bb-wphone')S.wphone=t.value;else if(t.id==='bb-wemail')S.wemail=t.value;
    save();});
  $('bb-step').addEventListener('keydown',function(e){if(e.key!=='Enter'||e.target.tagName!=='INPUT')return;e.preventDefault();
    if(e.target.id==='bb-city'){if(norm(e.target.value))addCity();else go(cur+1,true);}
    else if(cur<STEPS.length-1){e.target.blur();go(cur+1,true);}
    else{var n=$('bb-step').querySelector('[data-next]');if(n)send(n);}});

  // Phone keyboard: shrink the builder to the part of the screen the keyboard leaves, so the website stays in view.
  var vv=window.visualViewport,kt=0;
  function fit(){if(!vv||window.innerWidth>=900)return;var a=document.activeElement,typing=a&&a.tagName==='INPUT'&&box.contains(a),kb=typing&&vv.height<window.innerHeight*0.8;
    box.classList.toggle('kb',!!kb);if(kb){box.style.setProperty('--bbh',Math.round(vv.height)+'px');var r=box.getBoundingClientRect(),off=r.top-(vv.offsetTop||0);if(Math.abs(off)>3)jump(off);}else box.style.removeProperty('--bbh');}
  function fitSoon(){clearTimeout(kt);kt=setTimeout(fit,60);}
  if(vv){vv.addEventListener('resize',fitSoon);box.addEventListener('focusin',function(){setTimeout(fit,350);});box.addEventListener('focusout',function(){setTimeout(fit,150);});}

  if('IntersectionObserver' in window){new IntersectionObserver(function(en){if(en[0].isIntersecting&&!seen){seen=true;track();}},{threshold:.3}).observe(box);}else seen=true;
  load();go(cur,false);
})();</script>`;
}
