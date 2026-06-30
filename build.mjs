// EvoVero static site generator — zero dependencies (Node 20+)
import { mkdirSync, writeFileSync, readdirSync, readFileSync, copyFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, nav } from './src/data/site.mjs';
import { serviceDetail, industryDetail } from './src/data/content.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, 'dist');
const PUB = join(__dir, 'public');

/* ----------------------------------------------------------------
   Inline SVG icons (stroke-based, inherit currentColor)
---------------------------------------------------------------- */
const I = {
  seo:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>`,
  meta:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-4.5A8.4 8.4 0 1 1 21 11.5Z"/></svg>`,
  web:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18"/><circle cx="6.5" cy="6.6" r=".6" fill="currentColor"/><circle cx="9" cy="6.6" r=".6" fill="currentColor"/></svg>`,
  ai:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="12" rx="3.5"/><path d="M12 7V4M9 13h.01M15 13h.01M2 12v2M22 12v2"/></svg>`,
  star:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z"/></svg>`,
  slab:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 12 4l9 4.5L12 13 3 8.5Z"/><path d="M3 8.5V15l9 4.5L21 15V8.5"/></svg>`,
  tree:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c2.5 0 4 1.8 4 3.6 1.6.3 2.6 1.6 2.6 3 0 1.7-1.4 3-3.2 3H8.6C6.8 15.6 5.4 14.3 5.4 12.6c0-1.4 1-2.7 2.6-3C8 7.8 9.5 6 12 6"/><path d="M12 15.6V21M9.5 21h5"/></svg>`,
  arrow:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  check:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  cal:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9h18M8 3v3M16 3v3"/></svg>`,
  phone:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 7a1 1 0 0 1 1-1Z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  bolt:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>`,
  key:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="4.5"/><path d="m11 11 8 8M16 16l2-2M19 19l2-2"/></svg>`,
  tow:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13h9l3-4h3l3 4v4h-2"/><path d="M7 17H5v-4"/><circle cx="8" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M3 9l6 2"/></svg>`,
  spark:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>`,
};
const icon = (k) => I[k] || I.bolt;

/* ----------------------------------------------------------------
   Signature flowing "ribbon" motif (layered translucent waves)
---------------------------------------------------------------- */
function ribbon(id = 'r') {
  return `<div class="hero__ribbon" aria-hidden="true">
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="top:0">
      <defs>
        <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#5B8DEF" stop-opacity=".55"/>
          <stop offset="1" stop-color="#1E2A52" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#8FB0E0" stop-opacity=".5"/>
          <stop offset="1" stop-color="#3A6BB5" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="${id}c" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stop-color="#3A6BB5" stop-opacity=".45"/>
          <stop offset="1" stop-color="#5B8DEF" stop-opacity="0"/>
        </linearGradient>
        <filter id="${id}blur"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>
      <g filter="url(#${id}blur)">
        <path d="M-100 300 C 300 120 560 460 880 320 C 1140 210 1320 380 1560 250 L1560 -60 -100 -60 Z" fill="url(#${id}a)"/>
        <path d="M-100 540 C 280 420 540 700 860 560 C 1160 430 1360 640 1560 520" fill="none" stroke="url(#${id}b)" stroke-width="120" stroke-linecap="round"/>
        <path d="M-100 720 C 320 620 600 860 940 720 C 1200 610 1380 800 1560 690" fill="none" stroke="url(#${id}c)" stroke-width="90" stroke-linecap="round"/>
      </g>
    </svg>
  </div>`;
}

/* ----------------------------------------------------------------
   Head / Header / Footer
---------------------------------------------------------------- */
function head(p) {
  const title = p.title;
  const desc = p.desc;
  const url = site.domain + (p.path === '/' ? '/' : p.path);
  const ld = (p.schema || []).map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.domain}${site.og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0E1733">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/styles.css">
<noscript><style>.nav--hero{transform:none!important;opacity:1!important;pointer-events:auto!important;background:rgba(246,248,253,.9);backdrop-filter:blur(14px);border-bottom-color:var(--line)}.reveal{opacity:1!important;transform:none!important}</style></noscript>
${ld}
</head>
<body>
<div class="progress" aria-hidden="true"></div>`;
}

function dropdown(kind) {
  if (kind === 'services') {
    return `<div class="drop">${site.services.map(s =>
      `<a href="/services/${s.slug}/"><span class="ic">${icon(s.icon)}</span><span><span class="t">${s.name}</span><span class="d">${s.short}</span></span></a>`
    ).join('')}</div>`;
  }
  return `<div class="drop" style="grid-template-columns:1fr">${site.industries.map(s =>
    `<a href="/industries/${s.slug}/"><span class="ic">${icon(s.icon)}</span><span><span class="t">${s.name}</span><span class="d">${s.blurb}</span></span></a>`
  ).join('')}<a href="/industries/"><span class="ic">${icon('arrow')}</span><span><span class="t">All industries</span><span class="d">See who I help, and what's next</span></span></a></div>`;
}

function header(navClass = 'nav--solid') {
  const links = nav.map(n => n.drop
    ? `<div class="has-drop"><a href="/${n.drop}/">${n.label}</a>${dropdown(n.drop)}</div>`
    : `<a href="${n.href}">${n.label}</a>`).join('');
  return `<nav class="nav ${navClass}"><div class="wrap wrap--wide nav__inner">
    <a class="brand" href="/"><img src="${site.logo}" alt="EvoVero" width="34" height="34"><span>EvoVero</span></a>
    <div class="nav__links">${links}</div>
    <div class="nav__cta">
      <a class="btn btn--ghost" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>
      <a class="btn btn--primary" href="${site.booking}">Book a Call</a>
      <button class="nav__toggle" aria-label="Menu"><span></span></button>
    </div>
  </div></nav>`;
}

function footer() {
  const col = (h, items) => `<div class="footer__col"><h4>${h}</h4>${items.map(i => `<a href="${i[1]}">${i[0]}</a>`).join('')}</div>`;
  return `<footer class="footer"><div class="wrap wrap--wide">
    <div class="footer__top">
      <div>
        <a class="brand" href="/"><img src="${site.logoLight}" alt="EvoVero" width="34" height="34" style="border-radius:9px"><span>EvoVero</span></a>
        <p>The marketing platform local service businesses actually own. Built to bring in leads, and built to last.</p>
        <a class="btn btn--primary" href="${site.booking}" style="margin-top:20px">Book a Call ${icon('arrow')}</a>
      </div>
      ${col('Services', site.services.map(s => [s.name.replace(' (Facebook & Instagram)',''), `/services/${s.slug}/`]))}
      ${col('Industries', [...site.industries.map(s => [s.name, `/industries/${s.slug}/`]), ['All industries','/industries/']])}
      ${col('Company', [['About','/about/'],['Results','/results/'],['Blog','/blog/'],['Contact','/contact/'],['Book a Call', site.booking]])}
    </div>
    <div class="footer__bottom">
      <span>&copy; ${new Date().getFullYear()} EvoVero. ${site.city}.</span>
      <span style="display:flex;gap:18px">
        <a href="${site.phoneHref}">${site.phone}</a>
        <a href="mailto:${site.email}">${site.email}</a>
        <a href="/privacy-policy/">Privacy</a>
        <a href="/terms/">Terms</a>
      </span>
    </div>
  </div></footer>
<script src="/site.js" defer></script>
<script>window.salesmateSettings = {	workspace_id: "325e0426-e1c1-4732-b879-778675ff956c", 	app_key:"67dbffa0-98e1-11f0-8d37-af0225045642", 	tenant_id:"nomavis.salesmate.io", 	channel_id:"6c3ba817-fb16-4fb9-aac5-142faa563901", 	widget_style:"floating"  }</script><script>!function(e,t,a,i,d,n,o){e.Widget=i,e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement(a),o=t.getElementsByTagName(a)[0],n.id=i,n.src=d,window._salesmate_widget_script_url=d,n.async=1,o.parentNode.insertBefore(n,o)}(window,document,"script","loadwidget", "https://nomavis.salesmate.io/messenger-platform/messenger-platform-main.js"),loadwidget("init",{}),loadwidget("load_widget","Widget Loading...!");</script>
</body></html>`;
}

function page(p) { return head(p) + header(p.nav || 'nav--solid') + p.body + footer(); }

/* ----------------------------------------------------------------
   Reusable section blocks
---------------------------------------------------------------- */
const btnPrimary = (label = 'Book a Call') => `<a class="btn btn--primary btn--lg" href="${site.booking}">${label} ${icon('arrow')}</a>`;
const btnCall = (dark) => `<a class="btn ${dark ? 'btn--on-dark' : 'btn--ghost'} btn--lg" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>`;

function ctaBand() {
  return `<section class="section panel"><div class="wrap"><div class="cta-band reveal">
    ${ribbon('cta')}
    <h2>Your phone should ring whether you answer or not.</h2>
    <p>Let's map out what a marketing platform you actually own would look like for your business. No pressure, no jargon.</p>
    <div class="hero__cta">${btnPrimary()}${btnCall(true)}</div>
  </div></div></section>`;
}

/* ----------------------------------------------------------------
   HOME
---------------------------------------------------------------- */
function home() {
  const schema = [
    { "@context": "https://schema.org", "@type": "Organization", name: "EvoVero", url: site.domain,
      logo: site.domain + site.logo, email: site.email, telephone: site.phone,
      founder: { "@type": "Person", name: site.founder },
      areaServed: "United States",
      description: "Digital marketing for local service businesses: SEO, Google Ads, Meta Ads, websites, and AI lead capture you own." },
    { "@context": "https://schema.org", "@type": "WebSite", name: "EvoVero", url: site.domain },
    { "@context": "https://schema.org", "@type": "ProfessionalService", "@id": site.domain + "/#localbusiness",
      name: "EvoVero", url: site.domain, image: site.domain + site.logo, telephone: site.phone, email: site.email,
      priceRange: "$$", areaServed: { "@type": "Country", name: "United States" },
      address: { "@type": "PostalAddress", addressLocality: "Omaha", addressRegion: "NE", addressCountry: "US" },
      hasMap: "https://www.google.com/maps?cid=" + site.gbpCid,
      founder: { "@type": "Person", name: site.founder } },
  ];

  const hero = `<header class="hero">
    ${ribbon('hero')}<div class="hero__grain"></div>
    <div class="wrap hero__inner">
      <div>
        <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Lead Generation, Evolved</span>
        <h1 style="margin-top:20px">Marketing that brings the jobs in. <span class="grad">And that you own.</span></h1>
        <p class="hero__sub">I build local service businesses a complete marketing platform, website, search, ads, and an AI agent that captures every lead, then put real budget behind what's working. You keep all of it.</p>
        <div class="hero__cta">${btnPrimary()}${btnCall(true)}</div>
        <div class="hero__trust">
          <span><b>You own</b> every account &amp; asset</span>
          <span>Flat monthly &middot; month to month</span>
        </div>
      </div>
      <div class="hero__visual reveal">
        <div class="glass-card">
          <div class="glass-head">
            <span class="t"><span class="pulse"></span> Metrics that matter</span>
            <span class="live">Live</span>
          </div>
          <div class="glass-bars">
            <i style="height:42%"></i><i style="height:58%"></i><i style="height:50%"></i><i style="height:72%"></i><i style="height:64%"></i><i style="height:88%"></i><i style="height:100%"></i>
          </div>
          <div class="glass-chips">
            <span>${icon('phone')} Real leads</span>
            <span>${icon('cal')} Booked jobs</span>
            <span>${icon('star')} 5-star reviews</span>
          </div>
          <div class="lead-pill"><span class="av">AI</span><span class="tx"><b>New lead booked</b> &mdash; estimate request, Tue 9:00a</span><span class="badge">Qualified</span></div>
          <div class="lead-pill"><span class="av">AI</span><span class="tx"><b>Missed call answered</b> &mdash; replied in 4 seconds</span><span class="badge">Captured</span></div>
        </div>
      </div>
    </div>
  </header>`;

  // problem / over-hero panel
  const problem = `<section class="panel over-hero"><div class="section"><div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow"><span class="dot"></span> The real problem</span>
      <h2 style="margin-top:18px">Word of mouth doesn't scale. Rented leads aren't yours.</h2>
      <p class="lead">Most local businesses are stuck between chasing referrals and renting leads from Angi, where you own nothing and the moment you stop paying, it all stops. There's a better way to build.</p>
    </div>
    <div class="grid grid-3">
      ${[['phone','Leads slip through','The phone rings while you\'re on a job. A form sits for hours. By the time you call back, they\'ve booked someone else.'],
         ['key','You rent, you don\'t own','Agencies keep control of your accounts and ads. Stop paying and the leads vanish overnight. That\'s not an asset, it\'s a leash.'],
         ['bolt','Spend with nowhere to land','Running ads to a weak website or no website at all just burns budget. The foundation has to convert before the spend can work.']]
        .map((c,i) => `<div class="card reveal" data-d="${i+1}"><span class="ic">${icon(c[0])}</span><h3>${c[1]}</h3><p>${c[2]}</p></div>`).join('')}
    </div>
  </div></div></section>`;

  // method (3 phase)
  const method = `<section class="panel panel--dark panel--rise"><div class="section"><div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> How I work</span>
      <h2 style="margin-top:18px">A platform first. Then leads. Then scale.</h2>
      <p class="lead" style="color:var(--on-dark-soft)">The order matters. I don't run ads on a weak foundation, and I don't let leads go unanswered. Three phases, sequenced to your business.</p>
    </div>
    <div class="grid grid-3">
      ${[['1','Foundation','I research your local market, then build the platform: a fast website you own, an optimized Google Business Profile, call tracking, and SEO content. Something worth sending traffic to.'],
         ['2','AI lead capture','An AI agent goes live on your site and social channels. It answers, qualifies, and books every lead in seconds, 24/7, even at 10pm when you\'re done for the day.'],
         ['3','Paid acceleration','Once the foundation converts and no lead slips, I layer in Google and Meta ads to multiply what\'s already working. You scale something proven, not a guess.']]
        .map((c,i) => `<div class="step reveal" data-d="${i+1}"><span class="step__n">${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p></div>`).join('')}
    </div>
  </div></div></section>`;

  // services grid
  const services = `<section class="panel panel--rise"><div class="section"><div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow"><span class="dot"></span> What I do</span>
      <h2 style="margin-top:18px">Everything your growth needs, under one roof.</h2>
      <p class="lead">Pick the pieces you need now and add the rest as you grow. It all connects, and it all stays yours.</p>
    </div>
    <div class="grid grid-3">
      ${site.services.map((s,i) => `<a class="card card--feature reveal" data-d="${(i%3)+1}" href="/services/${s.slug}/">
        <span class="ic">${icon(s.icon)}</span><h3>${s.name.replace(' (Facebook & Instagram)','')}</h3><p>${s.blurb}</p>
        <span class="link-arrow card__link">Learn more ${icon('arrow')}</span></a>`).join('')}
    </div>
  </div></div></section>`;

  // stats band
  const stats = `<section class="panel panel--dark"><div class="section"><div class="wrap">
    <div class="stats">
      ${[['24/7','AI coverage, every channel'],['100%','You own your accounts'],['3','Phases, sequenced to you'],['1','Partner who answers, me']]
        .map((s,i) => `<div class="stat center reveal" data-d="${i+1}"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}
    </div>
  </div></div></section>`;

  // industries
  const industries = `<section class="panel"><div class="section"><div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow"><span class="dot"></span> Who I help</span>
      <h2 style="margin-top:18px">Built for the trades that live on the phone.</h2>
      <p class="lead">If your business runs on local calls and booked jobs, the platform fits. Here's where I'm already getting results.</p>
    </div>
    <div class="grid grid-3">
      ${site.industries.map((s,i) => `<a class="card reveal" data-d="${(i%3)+1}" href="/industries/${s.slug}/">
        <span class="ic">${icon(s.icon)}</span><h3>${s.name}</h3><p>${s.blurb}</p>
        <span class="link-arrow card__link">See the playbook ${icon('arrow')}</span></a>`).join('')}
    </div>
    <p class="center reveal" style="margin-top:30px;color:var(--ink-soft)">Coming into focus: ${site.industriesSoon.join(' &middot; ')}</p>
  </div></div></section>`;

  // stage-based pricing
  const pricing = `<section class="panel panel--dark panel--rise"><div class="section"><div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Investment</span>
      <h2 style="margin-top:18px">Priced to your stage, not a rate card.</h2>
      <p class="lead" style="color:var(--on-dark-soft)">What you need starting out is different from what you need while scaling, or preparing to sell. I build the plan around where your business actually is, then run and grow it for a flat monthly fee. Month to month, no long contracts, and you own everything we build.</p>
    </div>
    <div class="grid grid-3">
      ${[['Starting out','Get found and get your first predictable leads. Website, Google Business Profile, local SEO, and call tracking, on a foundation you own.',['Owned website + GBP','Local SEO + content','Call tracking','AI lead capture']],
         ['Scaling','Add fuel to a foundation that\'s working. AI booking plus paid acquisition tuned to fill the calendar without you lifting a finger.',['Everything in Starting out','Google &amp; Meta ads','AI receptionist + booking','Monthly reporting']],
         ['Preparing to sell','Make the business run, and look, like an asset. Documented systems, clean reporting, and a presence that holds value beyond you.',['Everything in Scaling','Systemized lead engine','Reputation automation','Transferable, documented assets']]]
        .map((s,i) => `<div class="stage reveal" data-d="${i+1}"><span class="stage__tag">${s[0]}</span><h3>${s[1].split('.')[0]}.</h3><p>${s[1]}</p>
          <ul>${s[2].map(f => `<li>${icon('check')} ${f}</li>`).join('')}</ul></div>`).join('')}
    </div>
    <p class="center reveal" style="margin-top:30px"><a class="btn btn--primary btn--lg" href="${site.booking}">Get your custom plan ${icon('arrow')}</a></p>
  </div></div></section>`;

  // founder note
  const founder = `<section class="panel panel--rise"><div class="section"><div class="wrap" style="max-width:880px">
    <div class="card reveal" style="padding:clamp(30px,5vw,56px)">
      <span class="eyebrow"><span class="dot"></span> Why work with me</span>
      <h2 style="margin:18px 0 16px;font-size:clamp(1.6rem,3vw,2.3rem)">You get a partner, not a portal.</h2>
      <p class="lead">I'm Spencer. I run EvoVero myself, which means when you text, you get me, not a ticket. I only take on businesses I believe I can grow with for years, and I back the work with a simple promise: if your phone isn't ringing, you don't pay until it is. Your site, your accounts, your leads. I build it, you own it.</p>
      <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:26px">${btnPrimary('Book a call with Spencer')}<a class="btn btn--ghost btn--lg" href="/about/">More about me ${icon('arrow')}</a></div>
    </div>
  </div></div></section>`;

  // faq
  const faqs = [
    ['Do I actually own everything you build?','Yes. Your website, domain, Google Business Profile, ad accounts, and lead data are all in your name. If we ever part ways, you keep all of it. That\'s the whole point.'],
    ['What if it doesn\'t work?','My promise is simple: if your phone isn\'t ringing within the first stretch of work, you don\'t keep paying until it is. And if you\'re ever unhappy, you\'re free to walk with everything I\'ve built.'],
    ['How much does it cost?','It depends on your stage and goals, so there\'s no fixed rate card. On a quick call I\'ll map what you need now versus later, and you\'ll get a clear number with no surprises.'],
    ['Do you only work with concrete and tree service?','Those are where I get the strongest results today, but the platform works for any local service business. If you\'re in a trade that lives on the phone, let\'s talk.'],
    ['What\'s the AI receptionist, really?','An AI agent on your website and social channels that answers questions, qualifies the lead, and books the job, in seconds, around the clock. It means you stop losing the leads you\'re already earning.'],
  ];
  const faq = `<section class="panel"><div class="section"><div class="wrap">
    <div class="section-head center reveal"><span class="eyebrow"><span class="dot"></span> Questions</span><h2 style="margin-top:18px">Straight answers.</h2></div>
    <div class="faq reveal">${faqs.map(f => `<details><summary>${f[0]}<span class="pm">${icon2plus()}</span></summary><p>${f[1]}</p></details>`).join('')}</div>
  </div></div></section>`;

  schema.push({ "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f[0], acceptedAnswer: { "@type": "Answer", text: f[1] } })) });

  return page({
    title: "EvoVero | Marketing That Brings Jobs In, And You Own It",
    desc: "Marketing for local service businesses: a website, SEO, Google & Meta ads, and AI lead capture you own. I build it, run it, and grow it month to month.",
    path: "/", schema, nav: "nav--hero",
    body: hero + `<div class="after-hero">` + problem + method + services + stats + industries + pricing + founder + faq + ctaBand() + `</div>`,
  });
}
function icon2plus(){ return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`; }

/* ----------------------------------------------------------------
   Shared inner-page builders
---------------------------------------------------------------- */
function pageHero({ eyebrow, h1, sub, crumb, cta = true }) {
  return `<header class="page-hero">${ribbon('ph')}<div class="hero__grain"></div>
    <div class="wrap page-hero__inner reveal">
      ${crumb ? `<nav class="breadcrumb">${crumb}</nav>` : ''}
      <span class="eyebrow eyebrow--on-dark" style="margin-top:14px"><span class="dot"></span> ${eyebrow}</span>
      <h1>${h1}</h1>
      <p>${sub}</p>
      ${cta ? `<div class="hero__cta">${btnPrimary()}${btnCall(true)}</div>` : ''}
    </div></header>`;
}
const crumbNav = (...parts) => parts.map((p,i) => i < parts.length-1 ? `<a href="${p[1]}">${p[0]}</a> ${icon('arrow')}` : `<span style="color:#fff">${p[0]}</span>`).join(' ');

function faqBlock(faqs) {
  return `<div class="faq reveal">${faqs.map(f => `<details><summary>${f[0]}<span class="pm">${icon2plus()}</span></summary><p>${f[1]}</p></details>`).join('')}</div>`;
}
function faqSchema(faqs) {
  return { "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f[0], acceptedAnswer: { "@type": "Answer", text: f[1] } })) };
}
function breadcrumbSchema(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i+1, name: it[0], item: site.domain + it[1] })) };
}
function serviceCard(slug, d) {
  const s = site.services.find(x => x.slug === slug);
  return `<a class="card card--feature reveal" data-d="${d||1}" href="/services/${slug}/">
    <span class="ic">${icon(s.icon)}</span><h3>${s.name.replace(' (Facebook & Instagram)','')}</h3><p>${s.blurb}</p>
    <span class="link-arrow card__link">Learn more ${icon('arrow')}</span></a>`;
}
function industryCard(s, d) {
  return `<a class="card reveal" data-d="${d||1}" href="/industries/${s.slug}/">
    <span class="ic">${icon(s.icon)}</span><h3>${s.name}</h3><p>${s.blurb}</p>
    <span class="link-arrow card__link">See the playbook ${icon('arrow')}</span></a>`;
}

/* ----------------------------------------------------------------
   Services hub + service pages
---------------------------------------------------------------- */
function servicesHub() {
  const body = pageHero({
    eyebrow: "Services", crumb: crumbNav(["Home","/"],["Services","/services/"]),
    h1: `Everything your growth needs, <span class="grad">under one roof.</span>`,
    sub: "Pick the pieces you need now and add the rest as you grow. It all connects, and it all stays yours.",
  }) + `<div class="page-body"><section class="section"><div class="wrap">
      <div class="grid grid-3">${site.services.map((s,i) => serviceCard(s.slug, (i%3)+1)).join('')}</div>
    </div></section>${ctaBand()}</div>`;
  return page({
    title: "Services | EvoVero Digital Marketing", path: "/services",
    desc: "SEO, Google Ads, Meta Ads, websites, AI lead capture, and reputation, the full marketing platform for local service businesses, built so you own it.",
    schema: [breadcrumbSchema([["Home","/"],["Services","/services/"]])],
    body,
  });
}

function servicePage(slug) {
  const s = site.services.find(x => x.slug === slug), d = serviceDetail[slug];
  const crumb = crumbNav(["Home","/"],["Services","/services/"],[s.name.replace(' (Facebook & Instagram)','')]);
  const included = `<section class="section"><div class="wrap">
    <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span> What's included</span><h2 style="margin-top:16px">What you get</h2></div>
    <div class="incl">${d.included.map(it => `<div class="incl-item reveal"><span class="c">${icon('check')}</span><div><h4>${it[0]}</h4><p>${it[1]}</p></div></div>`).join('')}</div>
  </div></section>`;
  const how = `<section class="panel panel--dark panel--rise"><div class="section"><div class="wrap">
    <div class="section-head center reveal"><span class="eyebrow eyebrow--on-dark"><span class="dot"></span> How it works</span><h2 style="margin-top:16px">A simple, proven process</h2></div>
    <div class="grid grid-4">${d.how.map((c,i) => `<div class="step reveal" data-d="${i+1}"><span class="step__n">${i+1}</span><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('')}</div>
  </div></div></section>`;
  const why = `<section class="panel panel--rise"><div class="section"><div class="wrap" style="max-width:880px">
    <div class="card reveal" style="padding:clamp(30px,5vw,52px)"><span class="eyebrow"><span class="dot"></span> Why it matters</span>
      <p class="lead" style="margin-top:18px;color:var(--ink)">${d.why}</p>
      <div style="margin-top:24px">${btnPrimary()}</div>
    </div>
  </div></div></section>`;
  const faq = `<section class="panel"><div class="section"><div class="wrap">
    <div class="section-head center reveal"><span class="eyebrow"><span class="dot"></span> Questions</span><h2 style="margin-top:16px">Good to know</h2></div>
    ${faqBlock(d.faqs)}
  </div></div></section>`;
  const related = `<section class="panel"><div class="section"><div class="wrap">
    <div class="section-head center reveal"><span class="eyebrow"><span class="dot"></span> Pairs well with</span><h2 style="margin-top:16px">Works even better together</h2></div>
    <div class="grid grid-3">${d.related.map((rs,i) => serviceCard(rs,(i%3)+1)).join('')}</div>
  </div></div></section>`;
  return page({
    title: d.metaTitle, desc: d.metaDesc, path: "/services/" + slug,
    schema: [
      { "@context":"https://schema.org","@type":"Service", serviceType: s.name, name: d.h1,
        provider: { "@type":"Organization", name:"EvoVero", url: site.domain }, areaServed: "United States", description: d.metaDesc },
      faqSchema(d.faqs),
      breadcrumbSchema([["Home","/"],["Services","/services/"],[s.name, "/services/"+slug+"/"]]),
    ],
    body: pageHero({ eyebrow:"Services", crumb, h1:d.h1, sub:d.sub })
      + `<div class="page-body">` + included + how + why + faq + related + ctaBand() + `</div>`,
  });
}

/* ----------------------------------------------------------------
   Industries hub + industry pages
---------------------------------------------------------------- */
function industriesHub() {
  const body = pageHero({
    eyebrow:"Industries", crumb: crumbNav(["Home","/"],["Industries","/industries/"]),
    h1: `Built for the trades that <span class="grad">live on the phone.</span>`,
    sub: "If your business runs on local calls and booked jobs, the platform fits. Here's where I'm already getting results, with room to grow into any local service trade.",
  }) + `<div class="page-body"><section class="section"><div class="wrap">
      <div class="grid grid-3">${site.industries.map((s,i) => industryCard(s,(i%3)+1)).join('')}</div>
      <p class="center reveal" style="margin-top:30px;color:var(--ink-soft)">Coming into focus: ${site.industriesSoon.join(' &middot; ')}</p>
    </div></section>${ctaBand()}</div>`;
  return page({
    title: "Industries I Serve | EvoVero", path: "/industries",
    desc: "Marketing for concrete, tree service, towing, masonry, insulation, home cleaning, and any local service business that runs on the phone.",
    schema: [breadcrumbSchema([["Home","/"],["Industries","/industries/"]])],
    body,
  });
}

function industryPage(slug) {
  const s = site.industries.find(x => x.slug === slug), d = industryDetail[slug];
  const crumb = crumbNav(["Home","/"],["Industries","/industries/"],[s.name]);
  const pains = `<section class="section"><div class="wrap">
    <div class="section-head center reveal"><span class="eyebrow"><span class="dot"></span> Sound familiar?</span><h2 style="margin-top:16px">The problems I solve</h2></div>
    <div class="grid grid-3">${d.pains.map((p,i) => `<div class="card reveal" data-d="${i+1}"><span class="ic">${icon('bolt')}</span><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join('')}</div>
  </div></section>`;
  const process = `<section class="panel panel--dark panel--rise"><div class="section"><div class="wrap">
    <div class="section-head center reveal"><span class="eyebrow eyebrow--on-dark"><span class="dot"></span> The playbook</span><h2 style="margin-top:16px">How I get you booked</h2></div>
    <div class="grid grid-3">${d.process.map((c,i) => `<div class="step reveal" data-d="${i+1}"><span class="step__n">${i+1}</span><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('')}</div>
  </div></div></section>`;
  const fit = `<section class="panel panel--rise"><div class="section"><div class="wrap">
    <div class="section-head center reveal"><span class="eyebrow"><span class="dot"></span> What fits</span><h2 style="margin-top:16px">The services that move the needle here</h2></div>
    <div class="grid grid-${d.fit.length >= 4 ? '4' : '3'}">${d.fit.map((rs,i) => serviceCard(rs,(i%4)+1)).join('')}</div>
  </div></div></section>`;
  const faq = `<section class="panel"><div class="section"><div class="wrap">
    <div class="section-head center reveal"><span class="eyebrow"><span class="dot"></span> Questions</span><h2 style="margin-top:16px">Straight answers</h2></div>
    ${faqBlock(d.faqs)}
  </div></div></section>`;
  return page({
    title: d.metaTitle, desc: d.metaDesc, path: "/industries/" + slug,
    schema: [ faqSchema(d.faqs), breadcrumbSchema([["Home","/"],["Industries","/industries/"],[s.name,"/industries/"+slug+"/"]]) ],
    body: pageHero({ eyebrow:"Industries", crumb, h1:d.h1, sub:d.sub })
      + `<div class="page-body">` + pains + process + fit + faq + ctaBand() + `</div>`,
  });
}

/* ----------------------------------------------------------------
   About
---------------------------------------------------------------- */
function about() {
  const principles = [
    ["key","You own everything","Your website, accounts, ads, and leads are in your name. I build it, you keep it, always."],
    ["shield","A guarantee, not a pitch","If your phone isn't ringing, you don't keep paying until it is. Unhappy any time? You walk with everything."],
    ["phone","A partner, not a portal","I run EvoVero myself. When you text, you get me, not a ticket queue and a stranger."],
    ["bolt","Foundation first","I don't run ads on a weak platform or let leads sit unanswered. The order is what makes it work."],
  ];
  const body = pageHero({
    eyebrow:"About", crumb: crumbNav(["Home","/"],["About","/about/"]),
    h1: `A partner, <span class="grad">not a portal.</span>`,
    sub: "I'm Spencer Hagen. I build local service businesses a marketing platform they own, then run and grow it like it's my own name on the line.",
  }) + `<div class="page-body">
    <section class="section"><div class="wrap" style="max-width:820px">
      <div class="reveal">
        <p class="lead" style="color:var(--ink)">Most marketing agencies sell you dependence. They keep control of your accounts, report on clicks you don't care about, and the moment you stop paying, everything disappears. I built EvoVero to do the opposite.</p>
        <p style="margin-top:18px">I work with a small number of local service businesses, concrete, tree service, towing, masonry, insulation, home cleaning, and put together the whole system: a website you own, a Google presence that ranks, ads when you're ready, and an AI agent that answers and books every lead around the clock. Then I run it month to month and grow it with you. No long contracts. No lock-in. Just a steady stream of jobs and a platform that's yours to keep.</p>
        <p style="margin-top:18px">I only take on businesses I believe I can grow with for years. If that's you, let's talk.</p>
        <div style="margin-top:26px">${btnPrimary('Book a call with Spencer')}</div>
      </div>
    </div></section>
    <section class="panel panel--dark panel--rise"><div class="section"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow eyebrow--on-dark"><span class="dot"></span> How I work</span><h2 style="margin-top:16px">What you can count on</h2></div>
      <div class="grid grid-4">${principles.map((p,i) => `<div class="card card--dark reveal" data-d="${i+1}"><span class="ic">${icon(p[0])}</span><h3>${p[1]}</h3><p>${p[2]}</p></div>`).join('')}</div>
    </div></div></section>
    ${ctaBand()}</div>`;
  return page({
    title: "About EvoVero | Spencer Hagen", path: "/about",
    desc: "EvoVero is Spencer Hagen, a founder-led marketing partner for local service businesses. You own the platform; I build, run, and grow it, backed by a guarantee.",
    schema: [breadcrumbSchema([["Home","/"],["About","/about/"]])],
    body,
  });
}

/* ----------------------------------------------------------------
   Results
---------------------------------------------------------------- */
function results() {
  const pts = [
    ["web","Built to convert","A foundation engineered to turn visitors into calls, the thing most agencies skip straight past."],
    ["ai","No lead left behind","An AI agent answering in seconds, 24/7, so you capture the leads you're already earning."],
    ["target","Spend that works","Ads layered onto a platform that converts, so budget produces booked jobs, not just clicks."],
    ["star","Reputation that compounds","Automated reviews that lift your ranking and your close rate at the same time."],
  ];
  const body = pageHero({
    eyebrow:"Results", crumb: crumbNav(["Home","/"],["Results","/results/"]),
    h1: `The work speaks. <span class="grad">So will the calls.</span>`,
    sub: "I'd rather show you a system that works than dazzle you with numbers out of context. Here's the honest version of what I build and what to expect.",
  }) + `<div class="page-body">
    <section class="section"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow"><span class="dot"></span> What I deliver</span><h2 style="margin-top:16px">Where the results come from</h2></div>
      <div class="grid grid-4">${pts.map((p,i) => `<div class="card reveal" data-d="${i+1}"><span class="ic">${icon(p[0])}</span><h3>${p[1]}</h3><p>${p[2]}</p></div>`).join('')}</div>
    </div></section>
    <section class="panel panel--dark panel--rise"><div class="section"><div class="wrap" style="max-width:820px">
      <div class="reveal center">
        <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Straight talk</span>
        <h2 style="margin-top:16px">No fabricated stats here</h2>
        <p class="lead" style="color:var(--on-dark-soft);margin-top:16px">Plenty of agencies post screenshots you can't verify. I'd rather earn your trust on a call and prove it in your own dashboard. As client results come in and I have permission to share them, real case studies will live right here.</p>
        <p style="margin-top:20px">Want to be one of the first case studies? <a class="link-arrow" href="${site.booking}" style="color:var(--blue-light)">Let's talk ${icon('arrow')}</a></p>
      </div>
    </div></div></section>
    ${ctaBand()}</div>`;
  return page({
    title: "Results | EvoVero", path: "/results",
    desc: "How EvoVero produces results for local service businesses: a converting foundation, 24/7 AI lead capture, ads that work, and compounding reputation.",
    schema: [breadcrumbSchema([["Home","/"],["Results","/results/"]])],
    body,
  });
}

/* ----------------------------------------------------------------
   Contact / Book a Call
---------------------------------------------------------------- */
function contact() {
  const methods = `
    <a class="contact-method" href="${site.booking}"><span class="c">${icon('cal')}</span><span><span class="t">Book a call</span><span class="d">Grab a time that works, no pressure</span></span></a>
    <a class="contact-method" href="${site.phoneHref}"><span class="c">${icon('phone')}</span><span><span class="t">Call or text</span><span class="d">${site.phone}</span></span></a>
    <a class="contact-method" href="mailto:${site.email}"><span class="c">${icon('arrow')}</span><span><span class="t">Email</span><span class="d">${site.email}</span></span></a>
    <div class="contact-method"><span class="c">${icon('shield')}</span><span><span class="t">Hours</span><span class="d">Mon&ndash;Fri 7a&ndash;7p &middot; Sat&ndash;Sun 7a&ndash;3p CT</span></span></div>`;
  const form = `<form class="form-card" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you/">
    <input type="hidden" name="form-name" value="contact">
    <p hidden><label>Skip this<input name="bot-field"></label></p>
    <div class="field-row">
      <div class="field"><label for="fn">First name</label><input id="fn" name="first_name" required></div>
      <div class="field"><label for="ln">Last name</label><input id="ln" name="last_name" required></div>
    </div>
    <div class="field"><label for="ph">Phone</label><input id="ph" name="phone" type="tel" required placeholder="(555) 555-5555"></div>
    <div class="field"><label for="em">Email <span style="color:var(--ink-soft);font-weight:400">(optional)</span></label><input id="em" name="email" type="email"></div>
    <div class="field"><label for="biz">What's your business?</label><input id="biz" name="business" placeholder="Trade & city"></div>
    <div class="field"><label>How should I reach you?</label><div class="checkrow">
      <label><input type="checkbox" name="contact_pref" value="Call"> Call</label>
      <label><input type="checkbox" name="contact_pref" value="Text"> Text</label>
      <label><input type="checkbox" name="contact_pref" value="Email"> Email</label>
    </div></div>
    <div class="field"><label for="msg">What do you need?</label><textarea id="msg" name="message" required placeholder="Tell me a bit about your business and your goals"></textarea></div>
    <button class="btn btn--primary" type="submit" style="width:100%">Send it over ${icon('arrow')}</button>
    <p class="form-note">No pressure, no spam. I never sell your info.</p>
  </form>`;
  const body = pageHero({
    eyebrow:"Get started", crumb: crumbNav(["Home","/"],["Contact","/contact/"]),
    h1: `Let's get your phone <span class="grad">ringing.</span>`,
    sub: "Book a quick call and I'll map out what a marketing platform you own would look like for your business. Prefer to write? The form works too.",
    cta: false,
  }) + `<div class="page-body"><section class="section"><div class="wrap">
      <div class="contact-grid">
        <div class="reveal"><h2 style="font-size:clamp(1.5rem,3vw,2rem)">The fastest way is a call.</h2>
          <p style="margin:14px 0 24px">Pick a time and we'll talk through your business, your goals, and whether I'm the right fit. Ten minutes will tell us both a lot.</p>
          ${methods}
        </div>
        <div class="reveal" data-d="1">${form}</div>
      </div>
    </div></section>${ctaBand()}</div>`;
  return page({
    title: "Contact & Book a Call | EvoVero", path: "/contact",
    desc: "Book a call with EvoVero or send a message. Let's map out a marketing platform your local service business owns.",
    schema: [breadcrumbSchema([["Home","/"],["Contact","/contact/"]])],
    body,
  });
}

function thankYou() {
  const body = pageHero({
    eyebrow:"Thank you", crumb: crumbNav(["Home","/"],["Contact","/contact/"],["Thanks"]),
    h1: `Got it. <span class="grad">Talk soon.</span>`,
    sub: "Thanks for reaching out. I'll get back to you fast, usually the same day. If it's urgent, call or text 402-698-4902.",
    cta: false,
  }) + `<div class="page-body"><section class="section"><div class="wrap center reveal">
      <a class="btn btn--primary btn--lg" href="${site.booking}">Book a time now ${icon('arrow')}</a>
      <p style="margin-top:18px"><a class="link-arrow" href="/">Back to home ${icon('arrow')}</a></p>
    </div></section></div>`;
  return page({ title: "Thank You | EvoVero", desc: "Thanks for reaching out to EvoVero.", path: "/thank-you", schema: [], body });
}

/* ----------------------------------------------------------------
   Legal
---------------------------------------------------------------- */
function legalPage(slug, title, intro, sections) {
  const body = pageHero({ eyebrow:"Legal", crumb: crumbNav(["Home","/"],[title]), h1:title, sub:intro, cta:false })
    + `<div class="page-body"><section class="section"><div class="wrap"><div class="prose reveal">
      <p style="color:var(--ink-soft)">Last updated: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</p>
      ${sections.map(s => `<h2>${s[0]}</h2>${s[1]}`).join('')}
      <h2>Contact</h2><p>Questions about this policy? Reach me at <a href="mailto:${site.email}">${site.email}</a> or ${site.phone}.</p>
    </div></div></section></div>`;
  return page({ title: `${title} | EvoVero`, desc: intro, path: "/" + slug, schema: [], body });
}
function privacy() {
  return legalPage("privacy-policy", "Privacy Policy",
    "How EvoVero collects, uses, and protects the information you share. The short version: I only collect what I need to help you, and I never sell it.",
    [
      ["Information I collect", "<p>When you contact me, book a call, or submit a form, I collect the details you provide, such as your name, phone number, email, and information about your business. If you use this site, standard analytics may collect anonymous usage data like pages viewed and general location.</p>"],
      ["How I use it", "<ul><li>To respond to your inquiry and provide the services you ask about.</li><li>To follow up about your project and send relevant updates.</li><li>To improve this website and how I serve local businesses.</li></ul>"],
      ["How I share it", "<p>I do not sell your information. I share it only with trusted tools I use to run my business (for example, scheduling, email, and CRM software), and only as needed to serve you. I may disclose information if required by law.</p>"],
      ["Your choices", "<p>You can ask me to update or delete your information at any time. You can opt out of follow-up messages whenever you like.</p>"],
      ["Cookies & analytics", "<p>This site may use cookies and analytics to understand how visitors use it. You can disable cookies in your browser settings.</p>"],
    ]);
}
function terms() {
  return legalPage("terms", "Terms of Service",
    "The basic terms for using this website and working with EvoVero.",
    [
      ["Using this site", "<p>This website is provided for information about EvoVero's services. Content may change at any time. By using the site you agree to use it lawfully and not to misuse it.</p>"],
      ["Services & engagements", "<p>Specific services, deliverables, pricing, and terms are agreed in writing before any work begins. Engagements are month to month with no long-term contract unless agreed otherwise. You own the accounts and assets I build for you.</p>"],
      ["Ad spend", "<p>Where advertising is part of your plan, ad spend is paid by you directly to the ad platform on your own account. My fee covers building and managing campaigns, not the ad budget itself.</p>"],
      ["Guarantee", "<p>Any performance guarantee or refund terms are defined in your individual agreement. Nothing on this website constitutes a binding guarantee on its own.</p>"],
      ["Liability", "<p>This site and its content are provided as is. EvoVero is not liable for indirect or incidental damages arising from use of the site.</p>"],
    ]);
}

/* ----------------------------------------------------------------
   Blog (autoblog-ready) — reads posts/*.md
---------------------------------------------------------------- */
const POSTS = join(__dir, 'posts');
function parseFront(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':'); if (i === -1) continue;
    let v = line.slice(i+1).trim().replace(/^["']|["']$/g, '');
    meta[line.slice(0,i).trim()] = v;
  }
  return { meta, body: m[2].trim() };
}
function mdToHtml(src) {
  if (/<(p|h2|h3|ul|div|section)\b/i.test(src)) return src; // already HTML (autoblog)
  const lines = src.split('\n'); let html = '', list = false;
  const inline = t => t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  for (let ln of lines) {
    ln = ln.trim();
    if (!ln) { if (list){html+='</ul>';list=false;} continue; }
    if (/^- /.test(ln)) { if(!list){html+='<ul>';list=true;} html+=`<li>${inline(ln.slice(2))}</li>`; continue; }
    if (list){html+='</ul>';list=false;}
    if (/^### /.test(ln)) html+=`<h3>${inline(ln.slice(4))}</h3>`;
    else if (/^## /.test(ln)) html+=`<h2>${inline(ln.slice(3))}</h2>`;
    else html+=`<p>${inline(ln)}</p>`;
  }
  if (list) html+='</ul>';
  return html;
}
function loadPosts() {
  if (!existsSync(POSTS)) return [];
  return readdirSync(POSTS).filter(f => f.endsWith('.md')).map(f => {
    const { meta, body } = parseFront(readFileSync(join(POSTS, f), 'utf8'));
    return { slug: meta.slug || f.replace(/\.md$/,''), title: meta.title || 'Untitled',
      description: meta.description || '', date: meta.date || '', keyword: meta.keyword || '',
      html: mdToHtml(body) };
  }).sort((a,b) => (b.date||'').localeCompare(a.date||''));
}
function postThumb(title) {
  return `<div class="thumb">${ribbon('pt').replace('class="hero__ribbon"','class="hero__ribbon" style="opacity:.7"')}<span class="pl">${title}</span></div>`;
}
function fmtDate(d) { if(!d) return ''; const dt = new Date(d); return isNaN(dt) ? d : dt.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}); }

function blogIndex(posts) {
  const grid = posts.length
    ? `<div class="post-grid">${posts.map((p,i) => `<a class="post-card reveal" data-d="${(i%3)+1}" href="/blog/${p.slug}/">
        ${postThumb(p.title)}
        <div class="body"><span class="meta">${fmtDate(p.date)}</span><h3>${p.title}</h3><p>${p.description}</p><span class="link-arrow">Read ${icon('arrow')}</span></div></a>`).join('')}</div>`
    : `<div class="empty-note reveal"><h3>Fresh content is on the way.</h3><p style="margin-top:8px">New articles on getting more local jobs publish here every week.</p></div>`;
  const body = pageHero({
    eyebrow:"Blog", crumb: crumbNav(["Home","/"],["Blog","/blog/"]),
    h1: `Marketing that <span class="grad">actually moves jobs.</span>`,
    sub: "Practical, no-fluff guidance on getting found, capturing leads, and growing a local service business. New posts every week.",
    cta: false,
  }) + `<div class="page-body"><section class="section"><div class="wrap">${grid}</div></section>${ctaBand()}</div>`;
  return page({
    title: "Blog | EvoVero", desc: "Practical marketing guidance for local service businesses: SEO, ads, AI lead capture, and reputation.",
    path: "/blog", schema: [breadcrumbSchema([["Home","/"],["Blog","/blog/"]])], body,
  });
}
function faqFromHtml(html) {
  const idx = html.search(/<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i);
  if (idx === -1) return null;
  const tail = html.slice(idx);
  const qa = []; const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi; let m;
  while ((m = re.exec(tail))) qa.push([m[1].replace(/<[^>]+>/g,'').trim(), m[2].replace(/<[^>]+>/g,'').trim()]);
  return qa.length ? qa : null;
}
function blogPost(p) {
  const schema = [
    { "@context":"https://schema.org","@type":"BlogPosting", headline: p.title, description: p.description,
      datePublished: p.date || undefined, author: { "@type":"Person", name: site.founder },
      publisher: { "@type":"Organization", name:"EvoVero", logo: { "@type":"ImageObject", url: site.domain+site.logo } },
      mainEntityOfPage: site.domain + "/blog/" + p.slug + "/" },
    breadcrumbSchema([["Home","/"],["Blog","/blog/"],[p.title,"/blog/"+p.slug+"/"]]),
  ];
  const fq = faqFromHtml(p.html);
  if (fq) schema.push(faqSchema(fq));
  const body = pageHero({
    eyebrow: p.keyword ? p.keyword : "Blog", crumb: crumbNav(["Home","/"],["Blog","/blog/"],[p.title]),
    h1: p.title, sub: p.description || ('Published ' + fmtDate(p.date)), cta: false,
  }) + `<div class="page-body"><section class="section"><div class="wrap"><article class="article reveal">${p.html}</article>
      <div class="center" style="margin-top:40px"><a class="link-arrow" href="/blog/">&#8592; All posts</a></div>
    </div></section>${ctaBand()}</div>`;
  // Keep the <title> tag <= ~60 chars: append brand only when there's room
  const titleTag = (p.title.length <= 48) ? `${p.title} | EvoVero` : p.title;
  return page({ title: titleTag, desc: p.description, path: "/blog/" + p.slug, schema, body });
}

/* ----------------------------------------------------------------
   Write helpers
---------------------------------------------------------------- */
function writePage(path, html) {
  const dir = path === '/' ? OUT : join(OUT, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}
function copyPublic() {
  if (!existsSync(PUB)) return;
  const walk = (src, dst) => {
    mkdirSync(dst, { recursive: true });
    for (const e of readdirSync(src)) {
      const s = join(src, e), d = join(dst, e);
      if (statSync(s).isDirectory()) walk(s, d);
      else copyFileSync(s, d);
    }
  };
  for (const e of readdirSync(PUB)) {
    const s = join(PUB, e);
    if (statSync(s).isDirectory()) walk(s, join(OUT, e));
    else copyFileSync(s, join(OUT, e));
  }
}
function sitemap(paths) {
  const urls = paths.map(p => `  <url><loc>${site.domain}${p === '/' ? '/' : p + '/'}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/* ----------------------------------------------------------------
   Build
---------------------------------------------------------------- */
mkdirSync(OUT, { recursive: true });
copyPublic();

const posts = loadPosts();

const pages = [
  ['/', home()],
  ['/services', servicesHub()],
  ...site.services.map(s => ['/services/' + s.slug, servicePage(s.slug)]),
  ['/industries', industriesHub()],
  ...site.industries.map(s => ['/industries/' + s.slug, industryPage(s.slug)]),
  ['/about', about()],
  ['/results', results()],
  ['/contact', contact()],
  ['/thank-you', thankYou()],
  ['/blog', blogIndex(posts)],
  ...posts.map(p => ['/blog/' + p.slug, blogPost(p)]),
  ['/privacy-policy', privacy()],
  ['/terms', terms()],
];

for (const [path, html] of pages) writePage(path, html);

// Sitemap: exclude the thank-you page (utility, noindex-style)
writeFileSync(join(OUT, 'sitemap.xml'), sitemap(pages.map(p => p[0]).filter(p => p !== '/thank-you')));
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /thank-you/\nSitemap: ${site.domain}/sitemap.xml\n`);

console.log(`Built ${pages.length} pages (${posts.length} blog post(s)) to dist/`);
