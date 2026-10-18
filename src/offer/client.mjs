// Client pages for $100/mo website clients: /client-guide and /referrals.
// Both are noindex, out of the sitemap, and linked from no site nav. They are sent by link
// (welcome email, email signature) and link to each other. Built 2026-10-18.
// Kept in their own module so the funnel pages in pages.mjs are never touched by this file.

const css = `
.cg-top{position:sticky;top:0;z-index:100;background:rgba(246,248,253,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.cg-top .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:68px}
.cg-top .btn{padding:11px 18px;font-size:.95rem}
.cg-hero{background:var(--grad-hero);color:var(--on-dark);padding-block:clamp(52px,7vw,92px) clamp(44px,6vw,76px)}
.cg-hero h1{color:#fff;max-width:780px;margin-top:16px}
.cg-hero p{margin-top:18px;font-size:clamp(1.05rem,1.6vw,1.22rem);color:var(--on-dark-soft);max-width:640px;line-height:1.55}
.cg-sec{padding-block:clamp(44px,6vw,80px)}
.cg-sec--alt{background:var(--surface-2,#f3f6fc)}
.cg-sec h2{font-size:clamp(1.55rem,3vw,2.15rem)}
.cg-sec .sub{margin-top:12px;color:var(--ink-soft);max-width:680px;line-height:1.6}
.cg-grid{margin-top:28px;display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.cg-card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px 22px 20px}
.cg-card h3{font-size:1.12rem}
.cg-card p{margin-top:8px;color:var(--ink-soft);line-height:1.6}
.cg-card a.src{display:inline-flex;gap:6px;align-items:center;margin-top:12px;font-weight:600;font-size:.94rem;text-decoration:underline;text-underline-offset:3px}
.cg-card a.src svg{width:15px;height:15px;flex:none}
.cg-card p a,.cg-steps p a,.cg-fine a,.cg-sec .sub a{text-decoration:underline;text-underline-offset:2px}
.cg-steps{margin-top:28px;display:grid;gap:14px;max-width:760px;counter-reset:s;padding:0;list-style:none}
.cg-steps li{display:flex;gap:16px;align-items:flex-start;background:#fff;border:1px solid var(--line);border-radius:18px;padding:20px}
.cg-steps li:before{counter-increment:s;content:counter(s);flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--grad-hero);color:#fff;font-family:var(--font-head);font-weight:700}
.cg-steps h3{font-size:1.08rem}
.cg-steps p{margin-top:6px;color:var(--ink-soft);line-height:1.6}
.cg-fine{margin-top:22px;max-width:760px;padding:0 0 0 22px;color:var(--ink-soft);line-height:1.7;list-style:disc}
.cg-fine li{margin-top:6px}
.cg-band{margin-top:28px;border-radius:20px;background:var(--grad-hero);color:#fff;padding:26px;display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:space-between}
.cg-band p{color:var(--on-dark-soft);max-width:560px;line-height:1.55}
.cg-band strong{color:#fff;display:block;font-family:var(--font-head);font-size:1.2rem;margin-bottom:4px}
.cg-foot{border-top:1px solid var(--line);padding-block:26px;font-size:.92rem;color:var(--ink-soft)}
.cg-foot .wrap{display:flex;flex-wrap:wrap;gap:12px 22px;justify-content:space-between}
.cg-foot a{color:inherit}
@media (max-width:600px){.cg-top .hide-sm{display:none}}
`;

export function makeClientPages({ head, icon, site }) {
  const top = buttons => `<header class="cg-top"><div class="wrap wrap--wide">
    <a class="brand" href="/"><img src="/assets/evovero-logo-80.webp" alt="EvoVero" width="34" height="34"><span>EvoVero</span></a>
    <div style="display:flex;gap:10px">${buttons}</div></div></header>`;
  const foot = `<footer class="cg-foot"><div class="wrap wrap--wide">
    <span>&copy; ${new Date().getFullYear()} EvoVero</span>
    <span style="display:flex;gap:18px;flex-wrap:wrap"><a href="${site.phoneHref}">${site.phone}</a><a href="mailto:${site.email}">${site.email}</a><a href="/client-guide/">Client guide</a><a href="/referrals/">Referrals</a><a href="/terms/">Terms</a></span>
  </div></footer><script src="/site.js" defer></script></body></html>`;
  const shell = (p, buttons, body) => head({ ...p, noindex: true, schema: [], fast: true }) + `<style>${css}</style>` + top(buttons) + body + foot;
  const ext = (href, label) => `<a class="src" href="${href}" target="_blank" rel="noopener">${label} ${icon('arrow')}</a>`;
  const mail = `mailto:${site.email}`;

  /* ---------------- /client-guide ---------------- */
  function clientGuide() {
    const how = [
      ['Changes', `Email <a href="${mail}">${site.email}</a> whenever an idea comes up. One line or a long list, either works. Text works too.`],
      ['Photos', 'Send photos anytime at <a href="/photos/">evovero.com/photos</a>. Phone photos are fine. Your work, your trucks, your team.'],
      ['Billing', 'You are billed once a month on the same day. To change the day, just email me.'],
      ['Cancelling', `Call, text or email me. No notice period and no fee. Your site stays up through the month you already paid for. Full details are in the <a href="/terms/">terms</a>.`],
    ].map(([h, p]) => `<div class="cg-card"><h3>${h}</h3><p>${p}</p></div>`).join('');

    const guide = [
      ['Google Business Profile', 'This is the listing that shows up on Google Maps and in Google results when someone looks up a business like yours. Adding or claiming it is free, and Google asks you to verify that the business is yours before it goes live.',
        'https://support.google.com/business/answer/2911778?hl=en', 'Google: add or claim your profile'],
      ['Google reviews', 'Google suggests asking customers directly and sending them your review link or QR code so it takes one tap. Reply to every review, the good ones and the critical ones. Google does not allow offering discounts or freebies in exchange for reviews.',
        'https://support.google.com/business/answer/7035772', 'Google: tips to get more reviews'],
      ['Apple Maps', 'iPhone users see your business on Apple Maps. Apple Business Connect is free and lets you claim your location and keep your photos, logo and details current.',
        'https://www.apple.com/newsroom/2023/01/introducing-apple-business-connect/', 'Apple: about Business Connect'],
      ['Facebook Page', 'A business Page is separate from your personal profile. It gives customers a place to see your work, send you a message and check your hours.',
        'https://www.facebook.com/business/help/473994396650734', 'Facebook: create a Page for your business'],
      ['Nextdoor', 'A Nextdoor Business Page is free. Neighbors can recommend you, and you can post updates to people who live nearby.',
        'https://business.nextdoor.com/en-us/getting-started/business-page', 'Nextdoor: free Business Page'],
      ['Bing Places', 'Bing Places controls how your business shows up on Bing Maps and in Bing results. It is worth a few minutes once your Google profile is set.',
        'https://support.microsoft.com/en-us/bing/add-and-manage-your-business-listing', 'Microsoft: add your business listing'],
    ].map(([h, p, href, label]) => `<div class="cg-card"><h3>${h}</h3><p>${p}</p>${ext(href, label)}</div>`).join('');

    const body = `<main>
    <section class="cg-hero"><div class="wrap wrap--wide">
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> For website clients</span>
      <h1>Your website, and how this works</h1>
      <p>Everything in one place: how to send changes, how billing works, and a free guide to the other places customers look for you. Bookmark this page.</p>
    </div></section>
    <section class="cg-sec"><div class="wrap wrap--wide">
      <h2>How this works</h2>
      <div class="cg-grid">${how}</div>
    </div></section>
    <section class="cg-sec cg-sec--alt"><div class="wrap wrap--wide">
      <h2>Free guide: get found beyond your website</h2>
      <p class="sub">Customers look for local businesses in more places than search results. Each of these is free and you can set it up yourself. Every card links to the official instructions.</p>
      <div class="cg-grid">${guide}</div>
      <p class="sub" style="margin-top:22px">Questions about any of these? Email <a href="${mail}">${site.email}</a>.</p>
    </div></section>
    <section class="cg-sec"><div class="wrap wrap--wide">
      <div class="cg-band"><div><strong>Know a business that needs a website?</strong><p>Every business you refer that becomes a client earns you a free month of your website.</p></div>
      <a class="btn btn--on-dark btn--lg" href="/referrals/">How referrals work ${icon('arrow')}</a></div>
    </div></section>
    </main>`;
    return shell({
      title: 'Client Guide: Changes, Billing and Free Listings | EvoVero',
      desc: 'How your EvoVero website works: send changes by email, billing, cancelling, photos, plus a free guide to Google, Apple Maps, Facebook and Nextdoor listings.',
      path: '/client-guide',
    }, `<a class="btn btn--ghost hide-sm" href="/referrals/">Referrals</a><a class="btn btn--primary" href="${mail}">Email Spencer</a>`, body);
  }

  /* ---------------- /referrals ---------------- */
  function referrals() {
    const steps = [
      ['Send them my way', `Have them mention your name when they reach out, or email me their name and business at <a href="${mail}">${site.email}</a> and I will reach out.`],
      ['They become a client', 'Your credit is earned once their first payment clears and their 30 day refund window passes.'],
      ['Your next month is free', 'Each earned credit is worth $100 and covers one month of your website, starting with your next charge. Refer ten businesses and you get ten free months. There is no cap.'],
    ].map(([h, p]) => `<li><div><h3>${h}</h3><p>${p}</p></div></li>`).join('');

    const body = `<main>
    <section class="cg-hero"><div class="wrap wrap--wide">
      <span class="eyebrow eyebrow--on-dark"><span class="dot"></span> Referral program</span>
      <h1>Refer a business. Get a free month.</h1>
      <p>Every business you send my way that becomes a website client earns you a $100 credit, which covers a month of your website.</p>
    </div></section>
    <section class="cg-sec"><div class="wrap wrap--wide">
      <h2>How it works</h2>
      <ol class="cg-steps">${steps}</ol>
      <h2 style="margin-top:48px">The fine print</h2>
      <ul class="cg-fine">
        <li>Credits keep your site live. They are never paid out in cash and cannot be added to a refund.</li>
        <li>If you take your own first month refund, any credits you have go with it.</li>
        <li>One credit per business. A business that already had a site with me, or another business you own, does not count.</li>
        <li>Credits apply while your plan is active and end if you cancel.</li>
        <li>Full details are in the <a href="/terms/">terms</a>.</li>
      </ul>
      <div class="cg-band"><div><strong>Have someone in mind?</strong><p>Send me their name and business, or have them mention you when they reach out.</p></div>
      <a class="btn btn--on-dark btn--lg" href="${mail}?subject=Referral">Email a referral ${icon('arrow')}</a></div>
    </div></section>
    </main>`;
    return shell({
      title: 'Refer a Business, Get a Free Month of Your Website | EvoVero',
      desc: 'Refer a business to EvoVero. When they become a website client, you earn a $100 credit, a free month of your website. No cap. See how it works and fine print.',
      path: '/referrals',
    }, `<a class="btn btn--ghost hide-sm" href="/client-guide/">Client guide</a><a class="btn btn--primary" href="${mail}?subject=Referral">Email a referral</a>`, body);
  }

  return [
    ['/client-guide', clientGuide()],
    ['/referrals', referrals()],
  ];
}
