// $100/mo website offer pages: /get-started, /get-started/thanks, /websites.
// All three are noindex, left out of the sitemap, and linked from NO site nav or footer.
// They are reached by URL only (the Meta ad and the follow up messages link here).
// Helpers (head, icon, site) are passed in from build.mjs so this file never duplicates them.

import { types, typeById } from './types.mjs';
import { reviews } from '../data/reviews.mjs';
import { dropboxCss, uploader, dropboxForm, dropboxScript, dropboxModal } from './dropbox.mjs';

const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const FORM_VERSION = '2026-10-17 v3';
const DETAILS_VERSION = '2026-10-17 v1';
const TRIAL_VERSION = '2026-10-20 F4 extras';


const css = `
.of-top{position:sticky;top:0;z-index:100;background:rgba(246,248,253,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.of-top .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:68px}
.of-top__cta{display:flex;gap:10px;align-items:center}
.of-top .btn{padding:11px 18px;font-size:.95rem}
.of-hero{background:var(--grad-hero);color:var(--on-dark);padding-block:clamp(56px,8vw,104px) clamp(48px,7vw,88px);position:relative;overflow:hidden}
.of-hero h1{color:#fff;max-width:820px}
.pl{position:relative;width:var(--s,104px);height:var(--s,104px);flex:none}
.pl img{width:100%;height:100%;border-radius:24%;position:relative;z-index:1;display:block;box-shadow:0 0 0 1px rgba(255,255,255,.18),0 14px 50px rgba(70,120,255,.55)}
.pl:before,.pl:after{content:"";position:absolute;inset:0;border-radius:24%;border:2px solid rgba(120,165,255,.75);animation:pl-ring 2.6s ease-out infinite}
.pl:after{animation-delay:1.3s}
.pl.is-warn:before,.pl.is-warn:after{border-color:rgba(245,165,36,.85)}
@keyframes pl-ring{0%{transform:scale(1);opacity:.85}100%{transform:scale(2);opacity:0}}
.of-hero__grid{display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center}
.of-hero__art{padding:60px 90px 60px 40px}
@media (max-width:900px){.of-hero__grid{grid-template-columns:1fr}.of-hero__art{display:none}}
@media (prefers-reduced-motion:reduce){.pl:before,.pl:after{animation:none;opacity:0}}
.of-hero h1 .grad{background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent}
.of-hero p.lead{margin-top:20px;font-size:clamp(1.05rem,1.6vw,1.25rem);color:var(--on-dark-soft);max-width:640px;line-height:1.55}
.of-hero .pills{margin-top:26px;display:flex;flex-wrap:wrap;gap:10px}
.of-hero .pills span{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:8px 14px;font-family:var(--font-head);font-weight:600;font-size:.92rem;color:#fff}
.of-sec{padding-block:clamp(48px,7vw,88px)}
.of-cta-row{margin-top:28px;text-align:center}
.of-faq{margin-top:26px;display:grid;gap:10px;max-width:860px}
.of-faq details{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px 20px;box-shadow:var(--sh-sm)}
.of-faq summary{cursor:pointer;font-family:var(--font-head);font-weight:600;color:var(--ink);list-style:none;display:flex;justify-content:space-between;gap:16px}
.of-faq summary::-webkit-details-marker{display:none}.of-faq summary:after{content:"+";color:var(--blue);font-size:1.3rem;line-height:1}.of-faq details[open] summary:after{content:"−"}
.of-faq p{margin-top:10px;color:var(--ink-soft);font-size:.98rem}
.of-rise.reveal{transform:translateY(34px) scale(.97);transition-duration:1.1s}.of-rise.reveal.in{transform:none}
.of-sticky{display:none}
@media (max-width:760px){.of-sticky{display:flex;position:fixed;left:12px;right:12px;bottom:12px;z-index:90;justify-content:center;align-items:center;gap:8px;padding:15px 18px;border-radius:999px;background:var(--grad-blue);color:#fff;font-family:var(--font-head);font-weight:700;box-shadow:0 12px 30px rgba(30,60,160,.4);transform:translateY(140%);transition:transform .3s}.of-sticky svg{width:18px;height:18px}.of-sticky.on{transform:none}}
.of-band{padding-block:clamp(26px,4vw,40px);border-block:1px solid var(--line);background:var(--surface)}
.of-sec--alt{background:var(--surface-2)}
.of-sec h2{font-size:clamp(1.6rem,3.2vw,2.3rem)}
.of-sec .sub{margin-top:12px;color:var(--ink-soft);max-width:680px}
.of-steps{margin-top:32px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.of-step{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:24px;box-shadow:var(--sh-sm)}
.of-step b{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--grad-blue);color:#fff;font-family:var(--font-head);margin-bottom:14px}
.of-step h3{font-size:1.08rem;margin-bottom:6px}
.of-step p{font-size:.96rem;color:var(--ink-soft)}
.of-types{margin-top:32px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.of-type{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:24px;box-shadow:var(--sh-sm)}
.of-type h3{font-size:1.15rem}
.of-type .pg{margin-top:8px;font-size:.9rem;color:var(--blue);font-family:var(--font-head);font-weight:600}
.of-type p{margin-top:8px;font-size:.96rem;color:var(--ink-soft)}
.of-type .biz{margin-top:12px;font-size:.9rem;color:var(--ink-soft);line-height:1.6}
.of-type .demo{margin-top:14px}
.of-types--list{grid-template-columns:1fr;gap:14px}
.of-types--list .of-type{display:grid;grid-template-columns:280px 1fr;gap:6px 32px;align-items:start}
.of-types--list .of-type h3{grid-column:1}.of-types--list .of-type .pg,.of-types--list .of-type p{grid-column:1}
.of-types--list .of-type .biz{grid-column:2;grid-row:1 / span 4;margin-top:0;font-size:.98rem}
.of-types--list .of-type .demo{grid-column:1}
@media (max-width:760px){.of-types--list .of-type{grid-template-columns:1fr}.of-types--list .of-type .biz{grid-column:1;grid-row:auto;margin-top:10px}}
.of-grid3{margin-top:32px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.of-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:24px;box-shadow:var(--sh-sm)}
.of-card h3{font-size:1.08rem;margin-bottom:8px}
.of-card p{font-size:.96rem;color:var(--ink-soft)}
.of-price{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center;background:var(--grad-hero);color:var(--on-dark);border-radius:var(--r-lg);padding:clamp(28px,4vw,48px)}
.of-price .big{font-family:var(--font-head);font-weight:700;font-size:clamp(2.6rem,6vw,4rem);color:#fff;line-height:1}
.of-price .big small{font-size:1.1rem;color:var(--on-dark-soft);font-weight:600}
.of-price ul{list-style:none;padding:0;margin:0;display:grid;gap:10px}
.of-price li{display:flex;gap:10px;align-items:flex-start;color:#fff}
.of-price li svg{width:20px;height:20px;flex:none;color:var(--blue-light);margin-top:2px}
.of-price p{color:var(--on-dark-soft);margin-top:12px}
.of-price .was{color:var(--on-dark-soft);font-family:var(--font-head);font-weight:600;margin-bottom:10px}.of-price .was s{text-decoration-thickness:2px}
.of-price .ticks{margin-top:18px;display:flex;flex-wrap:wrap;gap:8px 18px}.of-price .ticks span{display:flex;gap:6px;align-items:center;color:#fff;font-size:.95rem}.of-price .ticks svg{width:18px;height:18px;flex:none;color:var(--blue-light)}
.of-next{list-style:none;margin:0;padding:0;display:grid;gap:10px}.of-next li{display:flex;gap:14px;align-items:center;color:#fff;font-family:var(--font-head);font-weight:600;font-size:1.05rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:13px 16px}.of-next b{flex:none;width:32px;height:32px;border-radius:50%;background:var(--grad-blue);display:grid;place-items:center;font-size:.95rem}
.of-revs{margin-top:32px;display:grid;grid-template-columns:1fr 1fr;gap:16px}@media (max-width:760px){.of-revs{grid-template-columns:1fr}}.of-rev{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:26px;box-shadow:var(--sh-sm)}.of-rev .stars{color:#f5b301;letter-spacing:2px;font-size:1.1rem}.of-rev q{display:block;margin-top:10px;color:var(--ink);font-size:1.02rem;line-height:1.6;quotes:none}.of-rev--wide{grid-column:1 / -1}
.of-quote{max-width:640px;margin:0 auto;text-align:center}.of-quote q{display:block;quotes:none;font-size:1.08rem;line-height:1.55;color:var(--ink)}.of-quote .who{margin-top:8px;font-family:var(--font-head);font-weight:600;font-size:.95rem;color:var(--ink-soft)}.of-quote .who span{color:#f5b301;letter-spacing:1px;margin-left:8px}
.of-quote--dark q{color:#fff}.of-quote--dark .who{color:var(--on-dark-soft)}
.of-quote--card{max-width:900px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:28px 30px;box-shadow:var(--sh-sm);text-align:left}
.dm{position:fixed;inset:0;z-index:1000;background:rgba(6,10,25,.75);backdrop-filter:blur(4px);display:grid;place-items:center;padding:clamp(8px,3vw,32px)}.dm[hidden]{display:none}
.dm__box{width:min(1200px,100%);height:min(90vh,920px);background:#fff;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 80px rgba(0,0,0,.45)}
.dm__bar{display:flex;gap:10px;align-items:center;padding:8px 10px 8px 14px;border-bottom:1px solid var(--line);background:var(--surface-2)}
.dm .dm__bar .pf-tabs{display:flex!important;flex:1;min-width:0;padding-block:4px}
@media (max-width:640px){.dm{padding:0}.dm__box{height:100%;border-radius:0}.dm .pf-tabs button{padding:8px 14px;font-size:.88rem}}
.dm__x{flex:none;width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:#fff;font-size:24px;line-height:1;cursor:pointer;color:var(--ink)}
.dm__frame{flex:1;width:100%;border:0;background:#fff}.of-rev .who{margin-top:14px;font-family:var(--font-head);font-weight:600;font-size:.95rem;color:var(--ink-soft)}
.of-form{max-width:760px;margin:32px auto 0}
.of-form fieldset{border:0;padding:0;margin:0}
.of-form legend{font-family:var(--font-head);font-weight:600;color:var(--ink);margin-bottom:8px}
.of-form select,.of-form input:not([type=checkbox]),.of-form textarea{width:100%}
.of-form .checkrow input{width:auto}
.of-hidden{display:none}
.of-label{display:block;font-family:var(--font-head);font-weight:600;color:var(--ink);margin-bottom:8px}
.of-opt{font-weight:400;color:var(--ink-soft);font-size:.9em}
.of-form .hint{margin-top:6px;font-size:.88rem;color:var(--ink-soft)}
.of-form input[type=file]{padding:10px;background:var(--surface);border:1px dashed var(--line);border-radius:var(--r-sm)}
.of-tip{margin-top:20px;background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--blue);border-radius:var(--r);padding:22px 24px;box-shadow:var(--sh-sm);max-width:900px}
.of-tip h3{font-size:1.08rem;margin-bottom:6px}.of-tip p{color:var(--ink-soft);font-size:.98rem}
.of-foot{background:var(--navy-abyss);color:var(--on-dark-soft);padding-block:32px;font-size:.92rem}
.of-foot .wrap{display:flex;flex-wrap:wrap;gap:12px 24px;justify-content:space-between;align-items:center}
.of-foot a{color:var(--on-dark-soft)}
.pf-bar{position:sticky;top:68px;z-index:90;background:var(--canvas);border-bottom:1px solid var(--line)}
.pf-tabs{display:flex;gap:8px;overflow-x:auto;padding-block:12px;scrollbar-width:none}
.pf-tabs button{flex:none;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:10px 18px;font-family:var(--font-head);font-weight:600;font-size:.95rem;cursor:pointer;transition:all .2s}
.pf-tabs button:hover{border-color:var(--blue-light)}
.pf-tabs button[aria-selected="true"]{background:var(--grad-blue);color:#fff;border-color:transparent;box-shadow:var(--sh-glow)}
.pf-select{display:none;padding-block:12px}
.pf-select label{display:block;font-family:var(--font-head);font-weight:600;font-size:.9rem;margin-bottom:6px}
.pf-select select{width:100%;padding:13px 14px;border-radius:var(--r-sm);border:1px solid var(--line);background:var(--surface);font:inherit;font-size:1rem;color:var(--ink)}
.pf-frame{margin-top:18px;border-radius:var(--r);overflow:hidden;border:1px solid var(--line);box-shadow:var(--sh-lg);background:var(--surface)}
.pf-chrome{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface-2);border-bottom:1px solid var(--line)}
.pf-dots{display:flex;gap:6px}.pf-dots i{width:10px;height:10px;border-radius:50%;background:#cfd8ea;display:block}
.pf-url{flex:1;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:6px 14px;font-size:.85rem;color:var(--ink-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pf-open{font-size:.85rem;font-family:var(--font-head);font-weight:600;color:var(--blue);white-space:nowrap}
.pf-frame iframe{display:block;width:100%;height:min(78vh,860px);border:0;background:#fff}
.pf-note{margin-top:22px;text-align:center}
.pf-note p{max-width:640px;margin:0 auto;color:var(--ink)}
.pf-note .small{margin-top:10px;font-size:.9rem;color:var(--ink-soft)}
.pf-empty{padding:60px 24px;text-align:center;color:var(--ink-soft)}
@media (max-width:900px){.of-steps{grid-template-columns:repeat(2,1fr)}.of-grid3{grid-template-columns:1fr}.of-types{grid-template-columns:1fr}.of-price{grid-template-columns:1fr}}
@media (max-width:640px){
  .of-top .hide-sm{display:none}.of-top .brand span{display:none}
  .of-steps{grid-template-columns:1fr}
  .pf-tabs{display:none}.pf-select{display:block}
  .pf-bar{top:68px}
  .pf-frame iframe{height:72vh}
  .pf-open{display:none}
}`;

export function makeOfferPages({ head, icon, site, demos }) {
  const live = demos.filter(d => d.live);
  const demoUrl = d => `/websites/demo/${d.slug}/`;

  // Minimal shell: logo plus one or two buttons. No site navigation, by design.
  const top = (buttons, linkLogo = true) => `<header class="of-top"><div class="wrap wrap--wide">
    ${linkLogo ? `<a class="brand" href="/get-started/">` : `<span class="brand">`}<img src="/assets/evovero-logo-80.webp" alt="EvoVero" width="34" height="34"><span>EvoVero</span>${linkLogo ? '</a>' : '</span>'}
    <div class="of-top__cta">${buttons}</div></div></header>`;
  const foot = (reviewsLink = false) => `<footer class="of-foot"><div class="wrap wrap--wide">
    <span>&copy; ${new Date().getFullYear()} EvoVero</span>
    <span style="display:flex;gap:18px;flex-wrap:wrap"><a href="${site.phoneHref}">${site.phone}</a><a href="mailto:${site.email}">${site.email}</a>${reviewsLink ? '<a href="/reviews/" target="_blank" rel="noopener">Reviews</a>' : ''}<a href="/privacy-policy/">Privacy</a><a href="/terms/">Terms</a></span>
  </div></footer><script src="/site.js" defer></script></body></html>`;
  // Funnel pages (/get-started, /free-trial) get an unlinked logo (no outs) and the Reviews footer link.
  const isFunnel = path => path.startsWith('/get-started') || path.startsWith('/free-trial');
  const shell = (p, buttons, body) => head({ ...p, noindex: true, schema: [], fast: true }) + `<style>${css}${dropboxCss}</style>` + top(buttons, !isFunnel(p.path)) + body + foot(isFunnel(p.path));

  const examplesBtn = (cls = 'btn--ghost', label = 'See example sites') =>
    `<a class="btn ${cls}" href="/websites/" target="_blank" rel="noopener">${label} ${icon('arrow')}</a>`;

  const demoModalHtml = () => live.length ? `<div class="dm" id="demo-modal" hidden role="dialog" aria-modal="true" aria-label="Example websites"><div class="dm__box">
      <div class="dm__bar"><div class="pf-tabs" role="tablist">${live.map((d, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-src="${demoUrl(d)}">${d.tabLabel}</button>`).join('')}</div><button type="button" class="dm__x" aria-label="Close">&times;</button></div>
      <iframe class="dm__frame" title="Example website"></iframe></div></div>
    <script>(function(){var m=document.getElementById('demo-modal');if(!m)return;var f=m.querySelector('iframe'),tabs=[].slice.call(m.querySelectorAll('[data-src]'));
      function pick(b){tabs.forEach(function(t){t.setAttribute('aria-selected',t===b);});f.src=b.getAttribute('data-src');}
      function open(e){e.preventDefault();if(!f.src)pick(tabs[0]);m.hidden=false;document.body.style.overflow='hidden';if(window.gtag)gtag('event','view_examples');}
      function close(){m.hidden=true;document.body.style.overflow='';}
      tabs.forEach(function(t){t.addEventListener('click',function(){pick(t);});});
      f.addEventListener('load',function(){try{[].slice.call(f.contentDocument.querySelectorAll('a[href^="/get-started"]')).forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();close();document.getElementById('form').scrollIntoView({behavior:'smooth'});});});}catch(e){}});
      m.querySelector('.dm__x').addEventListener('click',close);m.addEventListener('click',function(e){if(e.target===m)close();});
      document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden)close();});
      [].slice.call(document.querySelectorAll('a[href="/websites/"]')).forEach(function(a){a.addEventListener('click',open);});
    })();</script>` : '';


  /* ---------------- /get-started ---------------- */
  function getStarted() {
    const steps = [
      ['Answer a few quick questions', 'Your contact info and three short questions about your business. About two minutes.'],
      ['Start with your first $100', 'Pay right under the form. The first month is normally $500. Through October 31 it is $100. Don\'t love it? You get your $100 back.'],
      ['Your site is live within 48 hours', 'I build it from your answers, then reach out about photos and the general look.'],
      ['Then the edits start', 'Send me everything you want changed, even one long email, and I keep revising until it is what you want.'],
    ];
    const typeCards = [
      { name: 'One page', pages: 'Everything on a single scrolling page', blurb: 'Good when you want something simple, fast and clean.' },
      ...types,
    ].map((t, i) => `<div class="of-type reveal" data-d="${i % 2}"><h3>${t.name}</h3><div class="pg">${t.pages}</div><p>${t.blurb}</p></div>`).join('');

    const typeOptions = types.map(t => `<option>${t.name}</option>`).join('') + '<option>Other</option>';
    const structOptions = ['One page', ...types.map(t => t.name), 'Not sure yet'].map(s => `<option>${s}</option>`).join('');
    const stateOptions = US_STATES.map(s => `<option>${s}</option>`).join('');
    const check = (name, items) => `<div class="checkrow">${items.map(v => `<label><input type="checkbox" name="${name}" value="${v}"> ${v}</label>`).join('')}</div>`;

    const form = `<form id="build-form" class="form-card of-form" name="website-offer" method="POST" enctype="multipart/form-data" data-netlify="true" netlify-honeypot="bot-field" action="/get-started/thanks/">
      <input type="hidden" name="form-name" value="website-offer">
      <input type="hidden" name="form_version" value="${FORM_VERSION}">
      <p hidden><label>Skip this<input name="bot-field"></label></p>
      <div class="field-row">
        <div class="field"><label for="w-name">Your name</label><input id="w-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="w-biz">Business name</label><input id="w-biz" name="business_name" autocomplete="organization"></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="w-ph">Phone</label><input id="w-ph" name="phone" type="tel" autocomplete="tel" required></div>
        <div class="field"><label for="w-em">Email</label><input id="w-em" name="email" type="email" autocomplete="email" required></div>
      </div>
      <div class="field"><label for="w-city">City and state</label><input id="w-city" name="city_state" autocomplete="address-level2" placeholder="Omaha, NE"></div>
      <div class="field"><label for="w-first">When someone lands on your new site, what's the first thing you want them to see?</label><input id="w-first" name="first_thing" placeholder="Our best project photos, our reviews, a free quote button"></div>
      <div class="field"><label for="w-stand">What are you known for in your area?</label><input id="w-stand" name="stand_out" placeholder="Fast quotes, family owned, always on time"></div>
      <div class="field"><fieldset><legend>How do you want new customers to get in touch with you?</legend>${check('customer_contact', ['Call', 'Text', 'A form on my site'])}</fieldset></div>
      <button class="btn btn--primary btn--lg" type="submit" style="width:100%">Next: start my site ${icon('arrow')}</button>
      <p class="form-note">I never sell your info. You hear from me, nobody else.</p>
    </form>
    <div id="pay" class="form-card of-form of-pay of-hidden" aria-live="polite">
      <h3 style="margin:0 0 8px">Your answers are in. Now start your site.</h3>
      <p style="margin:0 0 6px">$100 today covers your first month, and that includes building and launching your site. It is live within 48 hours. After that it's $100 a month, cancel anytime.</p>
      <p style="margin:0 0 18px"><strong>Don't love it in your first month? You get your $100 back.</strong></p>
      <div id="checkout"><p class="hint" id="checkout-loading">Loading secure checkout...</p></div>
    </div>
    <script>(function(){
      function toggle(sel, wrap, show){var s=document.getElementById(sel),w=document.getElementById(wrap);if(!s||!w)return;function f(){w.classList.toggle('of-hidden',!show(s.value));}s.addEventListener('change',f);f();}
      toggle('w-type','w-other-wrap',function(v){return v==='Other';});

      var SALE_LINK='https://buy.stripe.com/8x2cN5dl68QR9PP5zNdfG09';
      var form=document.getElementById('build-form'),pay=document.getElementById('pay'),box=document.getElementById('checkout');
      function fail(email){box.innerHTML='<a class="btn btn--primary btn--lg" style="width:100%;justify-content:center" href="'+SALE_LINK+(email?'?prefilled_email='+encodeURIComponent(email):'')+'" target="_blank" rel="noopener">Pay your first $100 securely on Stripe</a><p class="hint" style="margin-top:10px;text-align:center">Trouble paying? Text <a href="sms:+14026984902">402-698-4902</a> and I will send you a link.</p>';}
      function loadStripe(){return new Promise(function(ok,no){if(window.Stripe)return ok();var s=document.createElement('script');s.src='https://js.stripe.com/v3/';s.onload=ok;s.onerror=no;document.head.appendChild(s);});}
      function startCheckout(fd){
        var info={email:fd.get('email'),business:fd.get('business_name'),name:fd.get('name')};
        fetch('/.netlify/functions/create-checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(info)})
          .then(function(r){if(!r.ok)throw 0;return r.json();})
          .then(function(d){return loadStripe().then(function(){return Stripe(d.publishableKey).initEmbeddedCheckout({fetchClientSecret:function(){return Promise.resolve(d.clientSecret);}});});})
          .then(function(c){box.innerHTML='';c.mount('#checkout');if(window.gtag)gtag('event','begin_checkout',{currency:'USD',value:100});})
          .catch(function(){fail(info.email);});
      }
      if(form&&pay&&window.fetch&&window.FormData){
        form.addEventListener('submit',function(e){
          if(e.defaultPrevented)return;
          e.preventDefault();
          var btn=form.querySelector('button[type=submit]');btn.disabled=true;
          var fd=new FormData(form);
          fetch('/',{method:'POST',body:fd})
            .then(function(r){if(!r.ok)throw 0;
              form.classList.add('of-hidden');pay.classList.remove('of-hidden');if(window.gtag)gtag('event','generate_lead',{form_name:'website-offer'});
              pay.scrollIntoView({behavior:'smooth',block:'start'});
              startCheckout(fd);})
            .catch(function(){btn.disabled=false;form.submit();});
        });
      }
    })();</script>`;

    const rv = n => reviews.find(r => r.name.startsWith(n));
    const faq = [
      ['What do you need from me?', 'The short form below, then a few details after you start, like your logo, colors and hours. Your own photos work best, and phone photos are fine. Send them anytime. Until then your site launches with stock photos.'],
      ['I already have a website. Can you still help?', 'Yes. Add the link in the details after you start and I use what works from it.'],
      ['How do edits work?', 'Text or email what you want changed and I change it. Unlimited, for as long as you have the site. You never log into anything.'],
      ['What if I don\'t love it?', 'Tell me in your first month and you get your first $100 back.'],
    ];
    const quote = (r, cls = '', anim = 'reveal of-rise') => r ? `<figure class="of-quote ${cls} ${anim}"><q>${r.text}</q><figcaption class="who">${r.name}<span aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></figcaption></figure>` : '';
    const demoModal = demoModalHtml();

    const body = `<main>
    <section class="of-hero"><div class="wrap wrap--wide reveal of-hero__grid"><div>
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Websites for small businesses</span>
      <h1 style="margin-top:16px">A real website for your business. <span class="grad">$100 a month.</span></h1>
      <p class="lead">Your first month is $100 instead of the regular $500, through October 31. Your site is live within 48 hours, with unlimited edits after that.</p>
      <div class="pills"><span>First month $100, regular $500</span><span>Ends October 31</span><span>Cancel anytime</span></div>
      <div class="hero__cta"><a class="btn btn--primary btn--lg" href="#form">Start my site ${icon('arrow')}</a>${examplesBtn('btn--on-dark btn--lg')}</div>
    </div><div class="of-hero__art" aria-hidden="true"><div class="pl" style="--s:150px"><img src="/assets/evovero-logo-300.webp" alt="" width="150" height="150"></div></div></div></section>

    <section class="of-band"><div class="wrap wrap--wide">${quote(rv('Chris'), '', '')}</div></section>

    <section class="of-sec"><div class="wrap wrap--wide">
      <h2 class="reveal">How this works</h2>
      <div class="of-steps">${steps.map((s, i) => `<div class="of-step reveal" data-d="${i}"><b>${i + 1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div>
      <div class="of-cta-row"><a class="btn btn--primary btn--lg" href="#form">Start my site ${icon('arrow')}</a></div>
    </div></section>

    <section class="of-band"><div class="wrap wrap--wide">${quote(rv('Yadira'))}</div></section>

    <section class="of-sec of-sec--alt"><div class="wrap wrap--wide">
      <h2 class="reveal">Questions people ask</h2>
      <div class="of-faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
      <div class="pd-box reveal" style="margin-top:16px"><p><b>Already have a logo or photos?</b> Send them anytime.</p><a class="btn btn--ghost" href="/photos/" data-dropbox-open>Send photos ${icon('arrow')}</a></div>
      <div class="of-cta-row"><a class="btn btn--primary btn--lg" href="#form">Start my site ${icon('arrow')}</a></div>
    </div></section>

    <section class="of-sec" id="form"><div class="wrap wrap--wide">
      ${quote(rv('Jesse'), 'of-quote--card')}
      <div class="of-price reveal" style="margin-top:28px">
        <div>
          <div class="was">Regular first month <s>$500</s></div>
          <div class="big">$100<small> first month</small></div>
          <p>Through October 31. Your first payment starts the build and your site is live within 48 hours. After that it is $100 a month.</p>
          <div class="ticks"><span>${icon('check')} Cancel anytime</span><span>${icon('check')} First $100 back if you don't love it</span><span>${icon('check')} Hosting and unlimited edits included</span></div>
        </div>
        <ol class="of-next"><li><b>1</b>Fill out the form below</li><li><b>2</b>Pay your first $100</li><li><b>3</b>I build it, live within 48 hours</li><li><b>4</b>I reach out about photos and the look</li></ol>
      </div>
      ${form}
    </div></section>
    </main>${demoModal}${dropboxModal('get-started', { site })}${dropboxForm}${dropboxScript}
    <a class="of-sticky" id="of-sticky" href="#form">Start my site, $100 ${icon('arrow')}</a>
    <script>(function(){var b=document.getElementById('of-sticky'),f=document.getElementById('form'),h=document.querySelector('.of-hero');if(!b||!f)return;var t=0;
      function u(){t=0;var show=h.getBoundingClientRect().bottom<0&&f.getBoundingClientRect().top>window.innerHeight*0.6;b.classList.toggle('on',show);}
      window.addEventListener('scroll',function(){if(!t)t=requestAnimationFrame(u);},{passive:true});})();</script>`;

    return shell({
      title: 'Small Business Website, $100 a Month, No Build Fee | EvoVero',
      desc: 'Get a real website for your small business for $100 a month. No build fee, unlimited edits, month to month. See how it works, then fill out the short form.',
      path: '/get-started',
    }, examplesBtn(), body);
  }

  /* ---------------- /get-started/thanks ---------------- */
  function getStartedThanks() {
    const body = `<main><section class="of-hero"><div class="wrap wrap--wide reveal">
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Got it</span>
      <h1 style="margin-top:16px">Your answers are in. <span class="grad">I'll reach out.</span></h1>
      <p class="lead">Next, I reach out the way you asked so we can go over the details. Questions in the meantime? Text <span style="white-space:nowrap"><a style="color:#fff" href="${site.phoneHref}">${site.phone}</a></span>.</p>
      <div class="hero__cta">${examplesBtn('btn--on-dark btn--lg')}</div>
    </div></section></main>`;
    return shell({
      title: 'Website Form Received, Here Is What Happens Next | EvoVero',
      desc: 'Your website form reached Spencer at EvoVero. Next he reaches out the way you asked to talk through your site. Questions in the meantime? Text 402-698-4902.',
      path: '/get-started/thanks',
    }, examplesBtn(), body);
  }

  /* ---------------- /get-started/welcome (Stripe return page) ---------------- */
  // Asks /.netlify/functions/get-session whether the Stripe checkout actually completed.
  // complete -> "You're in"; open -> "payment didn't go through"; no id or error -> neutral thanks.
  function getStartedWelcome() {
    const next = [
      ['I start building', 'I build your site from your form answers. It goes live within 48 hours.'],
      ['Questions go your way', 'If I need anything, I reach out the way you picked on the form: text, call or email.'],
      ['Photos', 'Your site launches with stock photos where we need them. Send real photos of your work, your trucks and your team anytime and I swap them in.'],
      ['You review it', 'When it is live, I send you the link. Go through it and tell me everything you want changed. One long email is fine. I keep revising until it looks the way you want.'],
      ['Billing', 'After today it is $100 a month and you can cancel anytime. Don\'t love it in your first month? You get your $100 back.'],
    ];
    const steps = next.map(([h, p], i) => `<li class="wl-step" style="--i:${i}"><span class="wl-num">${i + 1}</span><div><h3>${h}</h3><p>${p}</p></div></li>`).join('');
    const typeCards = [
      { name: 'One page', pages: 'Everything on a single scrolling page', blurb: 'Good when you want something simple, fast and clean.' },
      ...types,
    ].map(t => `<div class="of-type"><h3>${t.name}</h3><div class="pg">${t.pages}</div><p>${t.blurb}</p></div>`).join('');
    const typeOptions = types.map(t => `<option>${t.name}</option>`).join('') + '<option>Other</option>';
    const structOptions = ['One page', ...types.map(t => t.name), 'Not sure yet'].map(x => `<option>${x}</option>`).join('');
    const chk = (name, items) => `<div class="checkrow">${items.map(v => `<label><input type="checkbox" name="${name}" value="${v}"> ${v}</label>`).join('')}</div>`;
    const details = `<section class="wl-sec wl-form-sec" id="details"><div class="wrap wrap--wide">
      <h2>Last step: the details</h2>
      <p class="wl-sub">These help me build it right the first time. Skip anything you are not sure about.</p>
      <h3 class="wl-h3">Pick your structure</h3>
      <div class="of-types">${typeCards}</div>
      <form id="details-form" class="form-card of-form" name="website-details" method="POST" enctype="multipart/form-data" data-netlify="true" netlify-honeypot="bot-field" action="/get-started/welcome/">
        <input type="hidden" name="form-name" value="website-details">
        <input type="hidden" name="form_version" value="${DETAILS_VERSION}">
        <input type="hidden" name="session_id" id="d-session">
        <input type="hidden" name="email" id="d-email">
        <p hidden><label>Skip this<input name="bot-field"></label></p>
        <div class="field-row">
          <div class="field"><label for="d-type">What kind of business is it?</label><select id="d-type" name="business_type"><option value="">Choose one</option>${typeOptions}</select></div>
          <div class="field"><label for="d-struct">Which structure fits?</label><select id="d-struct" name="structure"><option value="">Choose one</option>${structOptions}</select></div>
        </div>
        <div class="field"><label for="d-what">What does your company do, and what services should be on the site?</label><textarea id="d-what" name="what_you_do"></textarea></div>
        <div class="field"><label for="d-hours">Business hours</label><input id="d-hours" name="hours" placeholder="Mon to Fri 7 to 5, Sat by appointment"></div>
        <div class="field-row">
          <div class="field"><label for="d-site">Current website, if you have one</label><input id="d-site" name="current_website" inputmode="url" placeholder="yourbusiness.com"></div>
          <div class="field"><label for="d-gbp">Do you have a Google Business Profile?</label><select id="d-gbp" name="google_business_profile"><option value="">Choose one</option><option>Yes</option><option>No</option><option>Not sure</option></select></div>
        </div>
        <div class="field"><label for="d-social">Social pages, like Facebook or Instagram</label><input id="d-social" name="social_pages" placeholder="Paste links, or type None"></div>
        <div class="field"><span class="of-label">Your logo and photos</span><div class="pd-box"><p id="d-up-note">Send your logo and any photos of your work, full quality.</p><a class="btn btn--ghost" href="/photos/" data-dropbox-open>Upload ${icon('arrow')}</a></div><input type="hidden" name="uploads" id="d-uploads"><p class="hint">No logo yet? Describe the colors you want below instead.</p></div>
        <div class="field"><label for="d-colors">Colors you want on the site</label><input id="d-colors" name="colors" placeholder="Navy and orange, match my truck, not sure yet"></div>
        <div class="field"><fieldset><legend>Best way for me to reach you</legend>${chk('contact_pref', ['Text', 'Call', 'Email'])}</fieldset></div>
        <div class="field"><label for="d-more">Anything else?</label><textarea id="d-more" name="anything_else" placeholder="Specific information you want on the site, or special features like booking, a menu or online ordering."></textarea></div>
        <button class="btn btn--primary btn--lg" type="submit" style="width:100%">Send my details ${icon('arrow')}</button>
      </form>
      ${dropboxModal('welcome', { site })}${dropboxForm}
      <div id="details-done" class="form-card of-hidden"><h3 style="margin:0 0 6px">Got it. I'm on it.</h3><p style="margin:0">Your site is live within 48 hours. If I need anything, I reach out the way you picked.</p></div>
    </div></section>`;
    const wcss = `
.wl-hero{background:var(--grad-hero);color:var(--on-dark);padding-block:clamp(60px,9vw,120px) clamp(56px,8vw,96px);position:relative;overflow:hidden}
.wl-hero:before{content:"";position:absolute;inset:-40% -10% auto auto;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(110,160,255,.28),transparent 65%);animation:wl-float 9s ease-in-out infinite}
@keyframes wl-float{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,30px)}}
.wl-check{width:84px;height:84px;border-radius:50%;background:var(--grad-blue);display:grid;place-items:center;box-shadow:0 0 0 0 rgba(110,160,255,.6);animation:wl-pop .7s cubic-bezier(.2,1.4,.4,1) both,wl-ring 2.4s 1s ease-out infinite}
.wl-check svg{width:42px;height:42px;stroke:#fff;stroke-width:3.2;fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:40;stroke-dashoffset:40;animation:wl-draw .6s .5s ease forwards}
.wl-check.is-warn{background:linear-gradient(135deg,#f5a524,#e2761b)}
.wl-check.is-warn svg{stroke-dashoffset:0;animation:none}
@keyframes wl-pop{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes wl-draw{to{stroke-dashoffset:0}}
@keyframes wl-ring{0%{box-shadow:0 0 0 0 rgba(110,160,255,.55)}80%,100%{box-shadow:0 0 0 22px rgba(110,160,255,0)}}
.wl-hero h1{color:#fff;margin-top:26px;max-width:820px;animation:wl-up .7s .3s both}
.wl-hero h1 .grad{background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent}
.wl-hero .lead{margin-top:18px;font-size:clamp(1.05rem,1.6vw,1.25rem);color:var(--on-dark-soft);max-width:640px;line-height:1.55;animation:wl-up .7s .45s both}
.wl-hero .hero__cta{animation:wl-up .7s .6s both}
@keyframes wl-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.wl-sec{padding-block:clamp(48px,7vw,88px)}
.wl-sec h2{font-size:clamp(1.6rem,3.2vw,2.3rem)}
.wl-list{list-style:none;padding:0;margin:30px 0 0;display:grid;gap:14px;max-width:820px;position:relative}
.wl-list:before{content:"";position:absolute;left:27px;top:28px;bottom:28px;width:2px;background:linear-gradient(var(--blue-light),transparent)}
.wl-step{display:grid;grid-template-columns:56px 1fr;gap:18px;align-items:start;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:20px 22px;box-shadow:var(--sh-sm);opacity:0;transform:translateY(16px);animation:wl-up .6s calc(.9s + var(--i) * .15s) both;transition:transform .2s,box-shadow .2s}
.wl-step:hover{transform:translateY(-2px);box-shadow:var(--sh-lg)}
.wl-num{width:40px;height:40px;border-radius:50%;background:var(--grad-blue);color:#fff;display:grid;place-items:center;font-family:var(--font-head);font-weight:700;position:relative;z-index:1}
.wl-step h3{font-size:1.1rem;margin-bottom:4px}.wl-step p{color:var(--ink-soft);font-size:.98rem}
.wl-help{margin-top:26px;color:var(--ink-soft)}
.wl-hero .wrap,.wl-sec .wrap{max-width:900px;margin-inline:auto;padding-inline:clamp(20px,5vw,40px);text-align:center}
.wl-logo{margin:18px auto 56px;animation:wl-pop .7s cubic-bezier(.2,1.4,.4,1) both}
@media (max-width:640px){.wl-logo{--s:80px;margin-bottom:44px}}
.wl-hero h1,.wl-hero .lead{margin-inline:auto}
.wl-hero .lead{max-width:760px}
.wl-hero .hero__cta{justify-content:center}
.wl-list{margin-inline:auto;text-align:left}
.wl-help{text-align:center}
.wl-form-sec{background:var(--surface-2)}
.wl-form-sec .wrap{text-align:left}
.wl-form-sec h2{text-align:center}
.wl-sub{text-align:center;color:var(--ink-soft);margin-top:10px}
.wl-h3{margin-top:30px;font-size:1.15rem}
.wl-form-sec .of-types{margin-top:14px}
@media (prefers-reduced-motion:reduce){.wl-hero *,.wl-step,.wl-hero:before{animation:none!important;opacity:1!important;transform:none!important}}`;
    const body = `<style>${wcss}</style><main>
    <section class="wl-hero"><div class="wrap wrap--wide">
      <div class="pl wl-logo" id="wl-check"><img src="/assets/evovero-logo-300.webp" alt="EvoVero" width="104" height="104"></div>
      <h1 id="wl-title">Thanks. <span class="grad">Here's what happens next.</span></h1>
      <p class="lead" id="wl-lead">Questions anytime? Text <span style="white-space:nowrap"><a style="color:#fff" href="${site.phoneHref}">${site.phone}</a></span>.</p>
      <div class="hero__cta" id="wl-cta" style="margin-top:26px"><a class="btn btn--primary btn--lg" href="#details">Last step: the details ${icon('arrow')}</a></div>
    </div></section>
    ${details}
    <section class="wl-sec"><div class="wrap wrap--wide">
      <h2>What happens next</h2>
      <ol class="wl-list">${steps}</ol>
      <p class="wl-help">Questions in the meantime? Text <a href="${site.phoneHref}">${site.phone}</a> or email <a href="mailto:${site.email}">${site.email}</a>.</p>
    </div></section>
    </main>${dropboxScript}
    <script>(function(){
      var up=document.getElementById('d-uploads'),un=document.getElementById('d-up-note'),all=[];
      document.addEventListener('pd:uploaded',function(e){all=all.concat(e.detail.files);if(up)up.value=all.join('\\n');if(un)un.textContent=all.length+(all.length===1?' file':' files')+' sent. Add more anytime.';});
    })();</script>
    <script>(function(){
      var df=document.getElementById('details-form'),dd=document.getElementById('details-done');
      if(df&&window.fetch&&window.FormData){df.addEventListener('submit',function(e){e.preventDefault();var b=df.querySelector('button[type=submit]');b.disabled=true;
        fetch('/',{method:'POST',body:new FormData(df)}).then(function(r){if(!r.ok)throw 0;df.classList.add('of-hidden');dd.classList.remove('of-hidden');if(window.gtag)gtag('event','details_submitted');dd.scrollIntoView({behavior:'smooth',block:'center'});})
        .catch(function(){b.disabled=false;df.submit();});});}
      var id=new URLSearchParams(location.search).get('session_id');if(!id)return;
      var ds=document.getElementById('d-session');if(ds)ds.value=id;
      var t=document.getElementById('wl-title'),l=document.getElementById('wl-lead'),c=document.getElementById('wl-check'),cta=document.getElementById('wl-cta');
      fetch('/.netlify/functions/get-session?session_id='+encodeURIComponent(id)).then(function(r){return r.ok?r.json():null;}).then(function(d){
        if(!d)return;
        if(d.email){var de=document.getElementById('d-email');if(de)de.value=d.email;}
        if(d.status==='complete'){var seen=false;try{seen=sessionStorage.getItem('paid_'+id);sessionStorage.setItem('paid_'+id,'1');}catch(e){}if(!seen&&window.gtag)gtag('event','purchase',{transaction_id:id,currency:'USD',value:100});t.innerHTML='You\\'re in. <span class="grad">Your site is live within 48 hours.</span>';l.innerHTML='Your payment went through. Questions anytime? Text <span style="white-space:nowrap"><a style="color:#fff" href="${site.phoneHref}">${site.phone}</a></span>.';}
        else if(d.status==='open'){c.classList.add('is-warn');t.innerHTML='Your payment didn\\'t go through. <span class="grad">Your answers are saved.</span>';l.textContent='Nothing was charged. You can try again, or text me and I\\'ll send you a link.';cta.innerHTML='<a class="btn btn--primary btn--lg" href="/get-started/#build-form">Try again</a>';[].forEach.call(document.querySelectorAll('.wl-sec'),function(x){x.style.display='none';});}
      }).catch(function(){});
    })();</script>`;
    return shell({
      title: 'You Are In, Your Website Is Live Within 48 Hours | EvoVero',
      desc: 'Your first payment is in and Spencer is building your site. It goes live within 48 hours, then he reaches out about photos and the look. Questions? Text him.',
      path: '/get-started/welcome',
    }, examplesBtn(), body);
  }

  /* ---------------- /free-trial (2 week free trial, Halloween 2026) ---------------- */
  // W100 F4 (2026-10-20): the Meta instant form is the intake. Everyone landing here already gave
  // name, phone, email, company, city, state and services. This page confirms what happens next and
  // takes OPTIONAL extras only (logo and photos, colors, anything specific). Ask nothing twice.
  function freeTrial() {
    const steps = [
      ['I build your first version', 'From what you told me, plus your logo and photos if you send them.'],
      ['You get a preview link', 'Within 48 hours, I text and email it to you.'],
      ['Send me every change', 'You get 2 weeks to look it over. I keep revising until it is right.'],
      ['Keep it, or don\'t', 'Keep it for $100 a month. No credit card, no contract. Don\'t love it? You owe nothing.'],
    ];
    const group = t => `<h3 class="ft-group">${t}</h3>`;

    const form = `<form id="trial-form" class="form-card of-form" name="website-trial" method="POST" enctype="multipart/form-data" data-netlify="true" netlify-honeypot="bot-field" action="/free-trial/thanks/">
      <input type="hidden" name="form-name" value="website-trial">
      <input type="hidden" name="form_version" value="${TRIAL_VERSION}">
      <input type="hidden" name="source" id="t-src">
      <input type="hidden" name="uploads" id="t-uploads">
      <p hidden><label>Skip this<input name="bot-field"></label></p>
      <p class="ft-note">None of this is required. Anything you send goes on your first version.</p>
      ${group('So I know it is you')}
      <div class="field-row">
        <div class="field"><label for="t-name">Your name</label><input id="t-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="t-contact">Email or phone</label><input id="t-contact" name="email_or_phone" autocomplete="email" required></div>
      </div>
      ${group('Logo and photos')}
      <div class="field"><div class="pd-box"><p id="t-up-note">Send your logo and photos of your work, full quality. No photos yet? I start with stock photos and you can swap yours in later.</p><a class="btn btn--ghost" href="/photos/" data-dropbox-open>Upload ${icon('arrow')}</a></div></div>
      ${group('Colors')}
      <div class="field"><label for="t-colors">Send a logo and I'll match it. No logo? A couple of colors, or I'll go with a clean black and white look.</label><input id="t-colors" name="colors" placeholder="Navy and orange, match my truck, black and white"></div>
      ${group('Anything specific')}
      <div class="field"><label for="t-more">A tagline, a catchphrase, or something that sets you apart. Describe what you'd like to see.</label><textarea id="t-more" name="anything_else"></textarea></div>
      <button class="btn btn--primary btn--lg" type="submit" style="width:100%">Send it over ${icon('arrow')}</button>
      <p class="form-note">I never sell your info. You hear from me, nobody else.</p>
    </form>
    <script>(function(){
      var src=new URLSearchParams(location.search).get('src');var s=document.getElementById('t-src');if(s)s.value=src||'direct';
      var up=document.getElementById('t-uploads'),un=document.getElementById('t-up-note'),all=[];
      document.addEventListener('pd:uploaded',function(e){all=all.concat(e.detail.files);if(up)up.value=all.join('\\n');if(un)un.textContent=all.length+(all.length===1?' file':' files')+' sent. Add more anytime.';});
      var form=document.getElementById('trial-form');
      if(form&&window.fetch&&window.FormData){form.addEventListener('submit',function(e){
        e.preventDefault();var btn=form.querySelector('button[type=submit]');btn.disabled=true;
        fetch('/',{method:'POST',body:new FormData(form)})
          .then(function(r){if(!r.ok)throw 0;if(window.gtag)gtag('event','trial_extras',{form_name:'website-trial'});setTimeout(function(){location.href='/free-trial/thanks/';},300);})
          .catch(function(){btn.disabled=false;form.submit();});
      });}
    })();</script>`;

    const rv = n => reviews.find(r => r.name.startsWith(n));
    const faq = [
      ['Do I need a credit card?', 'No. Nothing up front, and nothing until you approve your site. When you\'re ready to keep it, I send you a secure link to set up your payment with a credit or debit card. Your $100 comes out on the same day each month, and you can change the card on file anytime with a link I send you.'],
      ['How long do I have to decide?', 'Two weeks from the day I send you your preview. Send me every change you want in that time, and I keep revising.'],
      ['What if I keep it?', '$100 a month with no build fee, and I launch it on your web address. Edits stay unlimited. No contract, and you can cancel anytime with a text or email.'],
      ['What if I don\'t?', 'No hard feelings. The preview comes down and you owe nothing.'],
      ['What happens after October 31?', 'Free builds close October 31. After that, it\'s regular pricing: $500 to get started, then $100 a month.'],
    ];
    const quote = (r, cls = '', anim = 'reveal of-rise') => r ? `<figure class="of-quote ${cls} ${anim}"><q>${r.text}</q><figcaption class="who">${r.name}<span aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></figcaption></figure>` : '';
    const tcss = `.ft-group{margin:30px 0 14px;padding-top:22px;border-top:1px solid var(--line);font-size:1.12rem}.ft-group:first-of-type{margin-top:6px;padding-top:0;border-top:0}
.ft-note{margin:0 0 6px;color:var(--ink-soft);font-size:.95rem}
.ft-ex{text-align:center}.ft-ex p{max-width:620px;margin:10px auto 22px;color:var(--ink-soft)}`;

    const body = `<style>${tcss}</style><main>
    <section class="of-hero"><div class="wrap wrap--wide reveal of-hero__grid"><div>
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Your request is in</span>
      <h1 style="margin-top:16px">See your website first. <span class="grad">Love it or owe nothing.</span></h1>
      <p class="lead">Your preview is on the way. Within 48 hours, I'll text and email you the link. Want it to look more like your business? Send your logo, photos and colors below.</p>
      <div class="pills"><span>No credit card</span><span>Built in 48 hours</span><span>2 weeks to decide</span></div>
      <div class="hero__cta"><a class="btn btn--primary btn--lg" href="#form">Make it yours ${icon('arrow')}</a>${examplesBtn('btn--on-dark btn--lg')}</div>
    </div><div class="of-hero__art" aria-hidden="true"><div class="pl" style="--s:150px"><img src="/assets/evovero-logo-300.webp" alt="" width="150" height="150"></div></div></div></section>

    <section class="of-sec"><div class="wrap wrap--wide">
      <h2 class="reveal">How this works</h2>
      <div class="of-steps">${steps.map((s, i) => `<div class="of-step reveal" data-d="${i}"><b>${i + 1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div>
    </div></section>

    <section class="of-sec of-sec--alt" id="form"><div class="wrap wrap--wide">
      <h2 class="reveal">Make it yours</h2>
      ${form}
    </div></section>

    <section class="of-sec"><div class="wrap wrap--wide ft-ex reveal">
      <h2>See the kind of sites I build</h2>
      <p>Coffee shops, lawn care, concrete, salons, photographers and more. Tap through a few to picture yours.</p>
      ${examplesBtn('btn--primary btn--lg')}
    </div></section>

    <section class="of-band"><div class="wrap wrap--wide">${quote(rv('Chris'), '', '')}</div></section>
    <section class="of-sec"><div class="wrap wrap--wide">${quote(rv('Yadira'))}${quote(rv('Jesse'), 'of-quote--card')}</div></section>

    <section class="of-sec of-sec--alt"><div class="wrap wrap--wide">
      <h2 class="reveal">Questions people ask</h2>
      <div class="of-faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
      <div class="of-cta-row"><a class="btn btn--primary btn--lg" href="#form">Make it yours ${icon('arrow')}</a></div>
    </div></section>
    </main>${demoModalHtml()}${dropboxModal('free-trial', { site })}${dropboxForm}${dropboxScript}
    <a class="of-sticky" id="of-sticky" href="#form">Make it yours ${icon('arrow')}</a>
    <script>(function(){var b=document.getElementById('of-sticky'),f=document.getElementById('form'),h=document.querySelector('.of-hero');if(!b||!f)return;var t=0;
      function u(){t=0;var show=h.getBoundingClientRect().bottom<0&&f.getBoundingClientRect().top>window.innerHeight*0.6;b.classList.toggle('on',show);}
      window.addEventListener('scroll',function(){if(!t)t=requestAnimationFrame(u);},{passive:true});})();</script>`;

    return shell({
      title: 'Free Website for Your Business, Built in 48 Hours | EvoVero',
      desc: 'I build your small business website free in 48 hours. No credit card. Then you get 2 weeks to decide. Keep it for $100 a month, or walk away and owe nothing.',
      path: '/free-trial',
    }, examplesBtn(), body);
  }

  /* ---------------- /free-trial/thanks ---------------- */
  function freeTrialThanks() {
    const steps = [
      ['I build your site', 'Within 48 hours. Stock photos fill in until I have yours.'],
      ['You get your preview link', 'I text and email it to you. Your 2 weeks to decide start that day.'],
      ['Send your changes', 'Everything you want changed, even one long email. I keep revising until it is right.'],
      ['Keep it, or don\'t', 'Keep it for $100 a month, no build fee, no contract. Don\'t like it? No hard feelings, you owe nothing.'],
    ];
    const body = `<main><section class="of-hero"><div class="wrap wrap--wide reveal">
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Got it</span>
      <h1 style="margin-top:16px">Got it. <span class="grad">It all goes on your first version.</span></h1>
      <p class="lead">I build it within 48 hours and send you the link. Questions in the meantime? Text <span style="white-space:nowrap"><a style="color:#fff" href="${site.phoneHref}">${site.phone}</a></span>.</p>
    </div></section>
    <section class="of-sec"><div class="wrap wrap--wide">
      <h2 class="reveal">What happens next</h2>
      <div class="of-steps">${steps.map((s, i) => `<div class="of-step reveal" data-d="${i}"><b>${i + 1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div>
      <div class="pd-box reveal" style="margin-top:28px"><p><b>Have your logo or photos handy?</b> Send them now and they go on your first version.</p><a class="btn btn--ghost" href="/photos/" data-dropbox-open>Send photos ${icon('arrow')}</a></div>
    </div></section></main>${dropboxModal('free-trial-thanks', { site })}${dropboxForm}${dropboxScript}`;
    return shell({
      title: 'Free Trial Received, Your Website Is on the Way | EvoVero',
      desc: 'Your free website request reached Spencer at EvoVero. He builds your site within 48 hours and sends the preview link. Your 2 weeks start the day it is ready.',
      path: '/free-trial/thanks',
    }, '', body);
  }

  /* ---------------- /photos (Photo Dropbox, one link for everyone) ---------------- */
  function photoDropbox() {
    const p = {
      title: 'Send Your Photos and Logo for Your New Website | EvoVero',
      desc: 'Send your photos and logo straight to Spencer at EvoVero in full quality. Add your name, pick photos from your phone, and they arrive ready for your website.',
      path: '/photos',
    };
    const body = `<main><section class="of-sec of-sec--alt" style="min-height:calc(100vh - 140px)"><div class="wrap" style="max-width:600px">
      <h1 style="font-size:clamp(1.7rem,4vw,2.4rem)">Send your photos</h1>
      <p class="sub" style="margin:10px 0 24px">Add your name, then pick photos straight from your phone. Your logo, your work, your trucks, your team. They arrive at full quality.</p>
      <div class="form-card">${uploader('pd-page', 'dropbox', { site })}</div>
    </div></section></main>${dropboxForm}${dropboxScript}`;
    return head({ ...p, noindex: true, schema: [], fast: true }) + `<style>${css}${dropboxCss}</style>` + top('', false) + body + foot(false);
  }

  /* ---------------- /websites ---------------- */
  function websites() {
    const tabs = live.map((d, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-src="${demoUrl(d)}" data-label="${d.urlLabel}">${d.tabLabel}</button>`).join('');
    const opts = live.map((d, i) => `<option value="${demoUrl(d)}" data-label="${d.urlLabel}"${i === 0 ? ' selected' : ''}>${d.tabLabel}</option>`).join('');
    const first = live[0];

    const frame = first ? `<div class="pf-frame reveal">
        <div class="pf-chrome"><span class="pf-dots"><i></i><i></i><i></i></span><span class="pf-url" id="pf-url">${first.urlLabel}</span><a class="pf-open" id="pf-open" href="${demoUrl(first)}" target="_blank" rel="noopener">Open full screen</a></div>
        <iframe id="pf-iframe" src="${demoUrl(first)}" title="Example website" loading="eager"></iframe>
      </div>` : `<div class="pf-frame"><div class="pf-empty">Example sites are on the way.</div></div>`;

    const typeCards = types.map((t, i) => {
      const demo = live.find(d => d.type === t.id);
      return `<div class="of-type reveal" data-d="${i % 2}"><h3>${t.name}</h3><div class="pg">${t.pages}</div><p>${t.blurb}</p>
        <div class="biz">${t.businesses.join(', ')}</div>
        ${demo ? `<div class="demo"><a class="link-arrow" href="#top-demos" data-pick="${demoUrl(demo)}">See the ${demo.tabLabel.toLowerCase()} demo ${icon('arrow')}</a></div>` : ''}</div>`;
    }).join('');

    const script = `<script>(function(){
      var ifr=document.getElementById('pf-iframe'),url=document.getElementById('pf-url'),open=document.getElementById('pf-open'),sel=document.getElementById('pf-select');
      var tabs=[].slice.call(document.querySelectorAll('.pf-tabs button'));
      function show(src){if(!ifr)return;ifr.src=src;open.href=src;
        tabs.forEach(function(b){var on=b.getAttribute('data-src')===src;b.setAttribute('aria-selected',on);if(on)url.textContent=b.getAttribute('data-label');});
        if(sel)sel.value=src;}
      tabs.forEach(function(b){b.addEventListener('click',function(){show(b.getAttribute('data-src'));});});
      if(sel)sel.addEventListener('change',function(){show(sel.value);});
      [].slice.call(document.querySelectorAll('[data-pick]')).forEach(function(a){a.addEventListener('click',function(){show(a.getAttribute('data-pick'));});});
    })();</script>`;

    const body = `<main>
    <section class="of-sec of-sec--alt"><div class="wrap wrap--wide">
      <span class="eyebrow reveal"><span class="dot"></span> Example websites</span>
      <h1 class="reveal" style="margin-top:14px;font-size:clamp(1.9rem,4vw,2.8rem)">Websites I build</h1>
      <p class="sub reveal">Find your type of business below. Every business in a group gets the same layout, set up for you. Then scroll down to click around a full demo site.</p>
      <div class="of-types of-types--list">${typeCards}</div>
    </div></section>
    <section class="of-sec" style="padding-bottom:12px"><div class="wrap wrap--wide reveal">
      <h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem)">Click around a demo site</h2>
      <p class="sub" style="margin-top:12px;color:var(--ink-soft);max-width:680px">Pick a business type to load a full demo site below. Every demo is a made up business, so tap anything you want.</p>
    </div></section>
    <div class="pf-bar" id="top-demos"><div class="wrap wrap--wide">
      <div class="pf-tabs" role="tablist" aria-label="Business type">${tabs}</div>
      <div class="pf-select"><label for="pf-select">Business type</label><select id="pf-select">${opts}</select></div>
    </div></div>
    <section style="padding-bottom:clamp(48px,7vw,88px)"><div class="wrap wrap--wide">
      ${frame}
      <div class="pf-note reveal">
        <p>Don't see your business? The structure is the same for nearly every business. If you have customers, I can build it.</p>
        <p style="margin-top:16px"><a class="btn btn--primary" href="/get-started/#build-form">Tell me about your business ${icon('arrow')}</a></p>
        <p class="small">The photos in these demos are AI generated or stock photos. I recommend real photos of you, your team and your work. Phone photos are fine.</p>
      </div>
    </div></section>
    </main>${script}`;

    return shell({
      title: 'Example Small Business Websites to Click Through | EvoVero',
      desc: 'Click through full demo websites for service businesses, coffee shops, trips and rentals, and more. Every one can be built for your business for $100 a month.',
      path: '/websites',
    }, `<a class="btn btn--ghost" href="/get-started/">Back to Getting Started</a><a class="btn btn--primary hide-sm" href="/get-started/#build-form">Start my website</a>`, body);
  }

  return [
    ['/get-started', getStarted()],
    ['/get-started/thanks', getStartedThanks()],
    ['/get-started/welcome', getStartedWelcome()],
    ['/free-trial', freeTrial()],
    ['/free-trial/thanks', freeTrialThanks()],
    ['/websites', websites()],
    ['/photos', photoDropbox()],
  ];
}
