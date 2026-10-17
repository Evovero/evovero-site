// $100/mo website offer pages: /get-started, /get-started/thanks, /websites.
// All three are noindex, left out of the sitemap, and linked from NO site nav or footer.
// They are reached by URL only (the Meta ad and the follow up messages link here).
// Helpers (head, icon, site) are passed in from build.mjs so this file never duplicates them.

import { types, typeById } from './types.mjs';

const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const FORM_VERSION = '2026-10-16 v2';

const css = `
.of-top{position:sticky;top:0;z-index:100;background:rgba(246,248,253,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.of-top .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:68px}
.of-top__cta{display:flex;gap:10px;align-items:center}
.of-top .btn{padding:11px 18px;font-size:.95rem}
.of-hero{background:var(--grad-hero);color:var(--on-dark);padding-block:clamp(56px,8vw,104px) clamp(48px,7vw,88px);position:relative;overflow:hidden}
.of-hero h1{color:#fff;max-width:820px}
.of-hero h1 .grad{background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent}
.of-hero p.lead{margin-top:20px;font-size:clamp(1.05rem,1.6vw,1.25rem);color:var(--on-dark-soft);max-width:640px;line-height:1.55}
.of-hero .pills{margin-top:26px;display:flex;flex-wrap:wrap;gap:10px}
.of-hero .pills span{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:8px 14px;font-family:var(--font-head);font-weight:600;font-size:.92rem;color:#fff}
.of-sec{padding-block:clamp(48px,7vw,88px)}
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
.of-form{max-width:760px;margin:32px auto 0}
.of-form fieldset{border:0;padding:0;margin:0}
.of-form legend{font-family:var(--font-head);font-weight:600;color:var(--ink);margin-bottom:8px}
.of-form select,.of-form input:not([type=checkbox]),.of-form textarea{width:100%}
.of-form .checkrow input{width:auto}
.of-hidden{display:none}
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
  const top = (buttons) => `<header class="of-top"><div class="wrap wrap--wide">
    <a class="brand" href="/get-started/"><img src="${site.logo}" alt="EvoVero" width="34" height="34"><span>EvoVero</span></a>
    <div class="of-top__cta">${buttons}</div></div></header>`;
  const foot = () => `<footer class="of-foot"><div class="wrap wrap--wide">
    <span>&copy; ${new Date().getFullYear()} EvoVero</span>
    <span style="display:flex;gap:18px;flex-wrap:wrap"><a href="${site.phoneHref}">${site.phone}</a><a href="mailto:${site.email}">${site.email}</a><a href="/privacy-policy/">Privacy</a><a href="/terms/">Terms</a></span>
  </div></footer><script src="/site.js" defer></script></body></html>`;
  const shell = (p, buttons, body) => head({ ...p, noindex: true, schema: [] }) + `<style>${css}</style>` + top(buttons) + body + foot();

  const examplesBtn = (cls = 'btn--ghost', label = 'See example sites') =>
    `<a class="btn ${cls}" href="/websites/" target="_blank" rel="noopener">${label} ${icon('arrow')}</a>`;

  /* ---------------- /get-started ---------------- */
  function getStarted() {
    const steps = [
      ['Tell me about your business', 'Fill out the form at the bottom of this page with the information you want on your site.'],
      ['Start with your first $100', 'Pay right under the form. No build fee and no contract. Don\'t love it in your first month? You get your $100 back.'],
      ['Your site is live within 48 hours', 'I build it from your answers, then reach out the way you asked to go over photos and the general look.'],
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
      <div class="field"><fieldset><legend>Best way to reach you</legend>${check('contact_pref', ['Text', 'Call', 'Email'])}</fieldset></div>
      <div class="field"><label for="w-city">City and state</label><input id="w-city" name="city_state" autocomplete="address-level2" placeholder="Omaha, NE"></div>
      <div class="field"><label for="w-type">What kind of business is it?</label>
        <select id="w-type" name="business_type"><option value="">Choose one</option>${typeOptions}</select></div>
      <div class="field of-hidden" id="w-other-wrap"><label for="w-other">What kind of business?</label><input id="w-other" name="business_type_other"></div>
      <div class="field"><label for="w-what">What does your company do, and what sets you apart from your competition?</label><textarea id="w-what" name="what_you_do"></textarea></div>
      <div class="field"><label for="w-struct">Which structure fits?</label>
        <select id="w-struct" name="structure"><option value="">Choose one</option>${structOptions}</select></div>
      <div class="field"><label for="w-site">Current website, if you have one</label><input id="w-site" name="current_website" inputmode="url" placeholder="yourbusiness.com"></div>
      <div class="field"><label for="w-social">Social pages, like Facebook or Instagram</label><input id="w-social" name="social_pages" placeholder="Paste links, or type None"></div>
      <div class="field"><label for="w-gbp">Do you have a Google Business Profile?</label>
        <select id="w-gbp" name="google_business_profile"><option value="">Choose one</option><option>Yes</option><option>No</option><option>Not sure</option></select></div>
      <div class="field"><label for="w-like">Two or three websites you like, and what you like about them</label><textarea id="w-like" name="websites_you_like"></textarea></div>
      <div class="field"><label for="w-logo">Your logo</label><input id="w-logo" name="logo" type="file" accept="image/*,.pdf,.svg,.ai,.eps">
        <p class="hint">No logo yet? Describe the colors you want below instead.</p></div>
      <div class="field"><label for="w-colors">Colors you want on the site</label><input id="w-colors" name="colors" placeholder="Navy and orange, match my truck, not sure yet"></div>
      <div class="field"><label for="w-more">Anything else?</label><textarea id="w-more" name="anything_else" placeholder="Specific information you want on the site, special features like booking, a menu or online ordering, or questions for me."></textarea></div>
      <button class="btn btn--primary btn--lg" type="submit" style="width:100%">Next: start my site ${icon('arrow')}</button>
      <p class="form-note">I never sell your info. You hear from me, nobody else.</p>
    </form>
    <div id="pay" class="form-card of-form of-pay of-hidden" aria-live="polite">
      <h3 style="margin:0 0 8px">Your answers are in. Now start your site.</h3>
      <p style="margin:0 0 6px">$100 today covers your first month, and that includes building and launching your site. It is live within 48 hours. After that it's $100 a month, cancel anytime.</p>
      <p style="margin:0 0 18px"><strong>Don't love it in your first month? You get your $100 back.</strong></p>
      <div id="checkout"><p class="hint" id="checkout-loading">Loading secure checkout...</p></div>
      <p class="form-note" id="pay-later">Not ready to pay yet? Your answers are saved and I'll reach out the way you asked.</p>
    </div>
    <script>(function(){
      function toggle(sel, wrap, show){var s=document.getElementById(sel),w=document.getElementById(wrap);if(!s||!w)return;function f(){w.classList.toggle('of-hidden',!show(s.value));}s.addEventListener('change',f);f();}
      toggle('w-type','w-other-wrap',function(v){return v==='Other';});

      var SALE_LINK='https://buy.stripe.com/8x2cN5dl68QR9PP5zNdfG09';
      var form=document.getElementById('build-form'),pay=document.getElementById('pay'),box=document.getElementById('checkout');
      function fail(email){box.innerHTML='<p>The card form did not load. <a href="'+SALE_LINK+(email?'?prefilled_email='+encodeURIComponent(email):'')+'" target="_blank" rel="noopener">Pay the first $100 on Stripe</a>, or text me and I will send you a link.</p>';}
      function loadStripe(){return new Promise(function(ok,no){if(window.Stripe)return ok();var s=document.createElement('script');s.src='https://js.stripe.com/v3/';s.onload=ok;s.onerror=no;document.head.appendChild(s);});}
      function startCheckout(fd){
        var info={email:fd.get('email'),business:fd.get('business_name'),name:fd.get('name')};
        fetch('/.netlify/functions/create-checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(info)})
          .then(function(r){if(!r.ok)throw 0;return r.json();})
          .then(function(d){return loadStripe().then(function(){return Stripe(d.publishableKey).initEmbeddedCheckout({fetchClientSecret:function(){return Promise.resolve(d.clientSecret);}});});})
          .then(function(c){box.innerHTML='';c.mount('#checkout');})
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
              form.classList.add('of-hidden');pay.classList.remove('of-hidden');
              pay.scrollIntoView({behavior:'smooth',block:'start'});
              startCheckout(fd);})
            .catch(function(){btn.disabled=false;form.submit();});
        });
      }
    })();</script>`;

    const body = `<main>
    <section class="of-hero"><div class="wrap wrap--wide reveal">
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Websites for small businesses</span>
      <h1 style="margin-top:16px">A real website for your business. <span class="grad">$100 a month.</span></h1>
      <p class="lead">Here is how it works and the few decisions you make. Read top to bottom, fill out the form at the end, and I reach out.</p>
      <div class="pills"><span>No build fee</span><span>Unlimited edits</span><span>Month to month</span></div>
      <div class="hero__cta"><a class="btn btn--primary btn--lg" href="#build-form">Start the form ${icon('arrow')}</a>${examplesBtn('btn--on-dark btn--lg')}</div>
    </div></section>

    <section class="of-sec"><div class="wrap wrap--wide">
      <h2 class="reveal">How this works</h2>
      <div class="of-steps">${steps.map((s, i) => `<div class="of-step reveal" data-d="${i}"><b>${i + 1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div>
      <div class="of-tip reveal"><h3>Skip the long planning</h3><p>From experience, the fastest way to a site you love is to give me the basics and a general idea of the look, then react to the real thing. It is a lot easier to say what you don't like on a finished site than to describe what you want before it exists. So we don't spend weeks planning. I build it, you critique it, I fix it.</p></div>
    </div></section>

    <section class="of-sec of-sec--alt"><div class="wrap wrap--wide">
      <h2 class="reveal">Pick your structure</h2>
      <p class="sub reveal">These are the common setups. Pick the closest one. Any of them can change later.</p>
      <div class="of-types">${typeCards}</div>
      <p class="reveal" style="margin-top:26px">${examplesBtn()}</p>
    </div></section>

    <section class="of-sec"><div class="wrap wrap--wide">
      <h2 class="reveal">What I need from you</h2>
      <div class="of-grid3">
        <div class="of-card reveal"><h3>Business basics</h3><p>The form below covers it, including a spot for your logo if you have one.</p></div>
        <div class="of-card reveal" data-d="1"><h3>Photos</h3><p>Your own photos work best, and phone photos are fine. After the form you get a separate link to upload them.</p></div>
        <div class="of-card reveal" data-d="2"><h3>Your domain</h3><p>Already have one? I connect it. Need one? I register it for you.</p></div>
      </div>
      <div class="of-tip reveal"><h3>Two or three websites you like</h3><p>Find two or three websites from businesses like yours and tell me what you like about each one. They do not have to be local. If you run a lawn care company in Florida, look up lawn care companies in Texas or Ohio and pick the sites you like best. I use them as the starting point for yours.</p></div>
    </div></section>

    <section class="of-sec of-sec--alt"><div class="wrap wrap--wide">
      <h2 class="reveal">After launch</h2>
      <p class="sub reveal">Unlimited edits for as long as you have the site. Text or email what you want changed and I change it. You never log into anything.</p>
    </div></section>

    <section class="of-sec"><div class="wrap wrap--wide">
      <div class="of-price reveal">
        <div><div class="big">$100<small> a month</small></div><p>Your first payment starts the build, and your site is live within 48 hours of it.</p></div>
        <ul>
          <li>${icon('check')} No build fee</li>
          <li>${icon('check')} No contract. Cancel anytime</li>
          <li>${icon('check')} Don't love it? Your first $100 back</li>
          <li>${icon('check')} Hosting, security and backups included</li>
          <li>${icon('check')} Unlimited edits by text or email</li>
        </ul>
      </div>
    </div></section>

    <section class="of-sec of-sec--alt" id="form"><div class="wrap wrap--wide">
      <div class="center reveal"><h2>Tell me about your business</h2>
      <p class="sub" style="margin-inline:auto">Fill this out, then start your site with your first $100 right below it. Questions first? Text <a href="${site.phoneHref}">${site.phone}</a>.</p>
      <p style="margin-top:18px">${examplesBtn('btn--ghost', 'See example sites first')}</p></div>
      ${form}
    </div></section>
    </main>`;

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
      <p class="lead">Next, I reach out the way you asked so we can go over the details. Questions in the meantime? Text <a style="color:#fff" href="${site.phoneHref}">${site.phone}</a>.</p>
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
@media (prefers-reduced-motion:reduce){.wl-hero *,.wl-step,.wl-hero:before{animation:none!important;opacity:1!important;transform:none!important}}`;
    const body = `<style>${wcss}</style><main>
    <section class="wl-hero"><div class="wrap wrap--wide">
      <div class="wl-check" id="wl-check"><svg viewBox="0 0 24 24"><path id="wl-icon" d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
      <h1 id="wl-title">Thanks. <span class="grad">Here's what happens next.</span></h1>
      <p class="lead" id="wl-lead">Questions anytime? Text <a style="color:#fff" href="${site.phoneHref}">${site.phone}</a>.</p>
      <div class="hero__cta" id="wl-cta" style="margin-top:26px">${examplesBtn('btn--on-dark btn--lg')}</div>
    </div></section>
    <section class="wl-sec"><div class="wrap wrap--wide">
      <h2>What happens next</h2>
      <ol class="wl-list">${steps}</ol>
      <p class="wl-help">Questions in the meantime? Text <a href="${site.phoneHref}">${site.phone}</a> or email <a href="mailto:${site.email}">${site.email}</a>.</p>
    </div></section>
    </main>
    <script>(function(){
      var id=new URLSearchParams(location.search).get('session_id');if(!id)return;
      var t=document.getElementById('wl-title'),l=document.getElementById('wl-lead'),c=document.getElementById('wl-check'),cta=document.getElementById('wl-cta');
      fetch('/.netlify/functions/get-session?session_id='+encodeURIComponent(id)).then(function(r){return r.ok?r.json():null;}).then(function(d){
        if(!d)return;
        if(d.status==='complete'){t.innerHTML='You\\'re in. <span class="grad">Your site is live within 48 hours.</span>';l.innerHTML='Your payment went through. Questions anytime? Text <a style="color:#fff" href="${site.phoneHref}">${site.phone}</a>.';}
        else if(d.status==='open'){c.classList.add('is-warn');document.getElementById('wl-icon').setAttribute('d','M12 7v6M12 17h.01');t.innerHTML='Your payment didn\\'t go through. <span class="grad">Your answers are saved.</span>';l.textContent='Nothing was charged. You can try again, or text me and I\\'ll send you a link.';cta.innerHTML='<a class="btn btn--primary btn--lg" href="/get-started/#build-form">Try again</a>';var s=document.querySelector('.wl-sec');if(s)s.style.display='none';}
      }).catch(function(){});
    })();</script>`;
    return shell({
      title: 'You Are In, Your Website Is Live Within 48 Hours | EvoVero',
      desc: 'Your first payment is in and Spencer is building your site. It goes live within 48 hours, then he reaches out about photos and the look. Questions? Text him.',
      path: '/get-started/welcome',
    }, examplesBtn(), body);
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
    ['/websites', websites()],
  ];
}
