/* Black Friday 2026 industry landing pages (Lane C, 2026-11-14).
   Addresses are LOCKED and go in the Meta Instant Forms with ?src=form:
     /blackfriday/concrete   /blackfriday/tree
   They never change. Tonight each page is a PLACEHOLDER (Spencer 11/14 8:27pm); the real page is
   built at the same address before the ads go live. Every lead facing word comes from the Notion
   "2026-11-11 W100 Black Friday build doc" (titles and descriptions 3A, eyebrow 3B, lines 2 and 3K).
   noindex, out of the sitemap, Google tag and Clarity on (head() with fast), no menu, no footer links.
   Promo kit: everything that changes per promo or trade lives in PROMO and TRADES below. */

const PROMO = {
  slug: 'blackfriday',
  eyebrow: 'Black Friday deal. Requests close November 30.',
};

const TRADES = [
  {
    slug: 'concrete',
    title: 'Your Concrete Website, Before You Pay | EvoVero',
    desc: 'See how a website for your concrete business works, answer a few quick taps, and get your own preview within 48 hours. No credit card. Requests close November 30.',
  },
  {
    slug: 'tree',
    title: 'Your Tree Service Website, Before You Pay | EvoVero',
    desc: 'See how a website for your tree service business works, answer a few quick taps, and get your own preview within 48 hours. No credit card. Requests close November 30.',
  },
];

const css = `.bf-top{padding:18px 0;border-bottom:1px solid var(--line)}.bf-top .brand{display:inline-flex;align-items:center;gap:10px;font-family:Sora,sans-serif;font-weight:700;color:var(--ink);text-decoration:none}
.bf-hero{min-height:70vh;display:grid;place-items:center;text-align:center;padding:64px 0}.bf-hero .eyebrow{display:inline-block;margin-bottom:16px}
.bf-hero h1{font-size:clamp(2rem,6vw,3.4rem);line-height:1.1;margin:0 auto;max-width:16ch}.bf-hero .lead{margin:18px auto 0;max-width:34ch;font-size:clamp(1.05rem,2.6vw,1.25rem)}
.bf-foot{padding:24px 0;text-align:center;color:var(--ink-soft);font-size:.9rem;border-top:1px solid var(--line)}`;

export function makeBlackFridayPages({ head }) {
  const page = t => head({ title: t.title, desc: t.desc, path: `/${PROMO.slug}/${t.slug}`, noindex: true, schema: [], fast: true })
    + `<style>${css}</style>
<header class="bf-top"><div class="wrap wrap--wide"><span class="brand"><img src="/assets/evovero-logo-80.webp" alt="EvoVero" width="34" height="34"><span>EvoVero</span></span></div></header>
<main><section class="bf-hero" data-trade="${t.slug}"><div class="wrap">
  <span class="eyebrow">${PROMO.eyebrow}</span>
  <h1>Your preview is being built.</h1>
  <p class="lead">I'll text and email you the link within 48 hours.</p>
</div></section></main>
<footer class="bf-foot"><div class="wrap">&copy; ${new Date().getFullYear()} EvoVero</div></footer>
<script src="/site.js" defer></script></body></html>`;
  return TRADES.map(t => [`/${PROMO.slug}/${t.slug}`, page(t)]);
}
