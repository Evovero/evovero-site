/* Black Friday 2026 industry landing pages (Lane C, built 2026-11-15).
   Addresses are LOCKED and sit in the Meta Instant Forms with ?src=form:
     /blackfriday/concrete   /blackfriday/tree        (each has a /thanks screen)
   They never change. noindex, out of the sitemap, Google tag and Clarity on (head() with fast),
   no menu, no footer links.

   WORDS: every lead facing word here is copied from the Notion page
   "2026-11-11 W100 Black Friday build doc", section 3 (the "ADDED 11/15 10:00am" block wins, then the
   11/14 build notes, then 3A to 3K) and section 7 NEW for the reworded 3J lines. Do not edit words here.
   A wording problem goes on the Black Friday Build Tracker under Cross lane notes.

   PROMO KIT: everything that changes per promo lives in PROMO and COPY, everything that changes per
   trade lives in TRADES. Next promo: copy this file, change those three blocks.

   VIDEO SLOT: until the intro video is recorded, a phone scrolling that trade's sample site stands in
   (public/assets/bf/<trade>-scroll.webp, made by a capture of the built sample site; `stops` are where the
   scroll pauses, as a percent of the image height). The "Sample website. The business is made up." line (3B)
   is the banner inside each sample site itself. To swap the real video in, set PROMO.video.

   FORM: the taps post to the Netlify form "website-trial" (the same form /free-trial uses, so the
   notification that already works keeps working) with promo, trade and services added. */

import { reviews } from '../data/reviews.mjs';
import { SWATCH } from './viewer.mjs';
import { builderCss, builderHtml, builderScript } from './bf-builder.mjs';
import { dropboxCss, uploader, dropboxForm, dropboxScript } from './dropbox.mjs';

const PROMO = {
  slug: 'blackfriday',
  formVersion: '2026-11-15 Black Friday industry page',
  tag: 'Black Friday Deal',
  // Set to { src: '/assets/bf/intro.mp4', poster: '/assets/bf/intro.jpg' } once the video is recorded.
  video: null,
  // Spencer's 10 minute call scheduler (Notion: Salesmate Scheduling Links, the untagged link).
  callLink: 'https://nomavis.salesmate.io/meetings/#/nomavis/scheduler/10-minute-call',
  ink: '#0D0D0D',
  cream: '#F6F2EA',
};

const TRADES = [
  {
    slug: 'concrete',
    tag: 'Concrete Contractors',
    accent: '#FFD21F',
    title: 'Your Concrete Website, Before You Pay | EvoVero',
    desc: 'See how a website for your concrete business works, answer a few quick taps, and get your own preview within 48 hours. No credit card. Requests close November 30.',
    sampleHeading: "Here's how your concrete website works.",
    services: ['Driveways', 'Patios', 'Sidewalks', 'Foundations and footings', 'Stamped or decorative', 'Commercial flatwork'],
    demo: { name: 'Ironline Concrete', url: '/websites/demo/concrete/' },
    // Preview builder in place of the quick taps (Spencer 2026-11-15; concrete first, tree follows once this is dialed in).
    builder: {
      kick: 'Concrete contractor', tagline: 'Driveways and Patios Built to Last.', color: '#E0701F', eg: 'Smith Concrete',
      hero: '/assets/bf/builder/concrete-hero.jpg', other: '/assets/bf/builder/concrete-other.jpg',
      cards: { 'Driveways': '/assets/bf/builder/concrete-driveways.jpg', 'Patios': '/assets/bf/builder/concrete-patios.jpg', 'Sidewalks': '/assets/bf/builder/concrete-sidewalks.jpg', 'Foundations and footings': '/assets/bf/builder/concrete-foundations.jpg', 'Stamped or decorative': '/assets/bf/builder/concrete-stamped.jpg', 'Commercial flatwork': '/assets/bf/builder/concrete-commercial.jpg' },
    },
    scroll: { img: '/assets/bf/concrete-scroll.webp', w: 585, h: 6123, stops: [19.378, 42.896, 83.023] },
  },
  {
    slug: 'tree',
    tag: 'Tree Service Owners',
    accent: '#FF5B14',
    title: 'Your Tree Service Website, Before You Pay | EvoVero',
    desc: 'See how a website for your tree service business works, answer a few quick taps, and get your own preview within 48 hours. No credit card. Requests close November 30.',
    sampleHeading: "Here's how your tree service website works.",
    services: ['Tree removal', 'Trimming and pruning', 'Stump grinding', 'Storm cleanup', 'Lot clearing'],
    demo: { name: 'Highlimb Tree Service', url: '/websites/demo/highlimb-tree-service/' },
    scroll: { img: '/assets/bf/tree-scroll.webp', w: 585, h: 5821, stops: [17.574, 41.05, 82.151] },
  },
];

/* Build doc words shared by both trades. <b> marks the words that take the trade's accent color. */
const COPY = {
  // First screen (11/14 build notes, first screen draft)
  h1Form: 'Your preview is <b>being built.</b>',
  h1Other: 'See your website <b>before you pay</b> anything.',
  lead: 'Make it yours. It takes about a minute, and your answers are how I make it look like your business.',
  heroBtn: 'Make it mine',
  // Taps (3D, plus the services tap from the 11/14 build notes)
  tapsTitle: 'A few quick taps',
  tapsNote: 'Your answers are how I make the preview look like yours. Nothing is final.',
  qServices: 'What do you do? Tap all that fit.',
  qLogo: 'Do you have a logo?',
  logoYes: 'Yes, I have one',
  logoNo: 'No, not yet',
  qColorsYes: 'What colors are in your logo?',
  qColorsNo: 'Pick a few colors you like.',
  colorsNoHelp: 'This can always change later.',
  colorsOther: 'Which colors?',
  qReach: 'If I have a question, how should I reach you?',
  qMore: 'Anything specific you want on it?',
  moreHelp: 'A tagline, your best service, something that sets you apart. Skip it if nothing comes to mind.',
  qLast: 'Last one.',
  lastKnown: 'So I match this to the right business. I already have your phone and email from the form.',
  lastOther: "So this matches the right business, enter your name, business name, phone and email. I'll get you your preview within 48 hours.",
  send: 'Send me my preview',
  assure: "No credit card. Don't like it? You owe nothing.",
  // Sample site (3B)
  sampleLead: 'Scroll through the sample below. Yours gets built the same way, with your business name, your services and your area, and you see it within 48 hours. No card to start.',
  // 3H2
  builtTitle: 'Built to bring in more business',
  built: [
    'When someone looks up your business, they see your work, your services and your area.',
    'An estimate form sends job requests straight to you.',
    'A call button is on every page, so reaching you takes one tap.',
  ],
  // 3E
  catchTitle: "What's the catch?",
  catches: [
    ['No card to start', 'Nothing is charged until you tell me you want the website. Then you tap Get this website on your preview, or I text you a link to pay.'],
    ['You see it first', 'You get 7 days with your preview, starting the day I text and email you the link. Send me every change you want in that time.'],
    ['Like it or walk away', "Like it? Say yes within your 7 days and it's $0 to start, just $100 a month. No contract, cancel anytime with a text. Don't? Let it go and you owe nothing."],
    ['Why $0 to start?', '$0 to start is my Black Friday price, and it has an end date. My regular price is $1,000 to start, then $100 a month.'],
    ["What's yours", 'Your business name, logo, photos, words and web address (like yourbusiness.com) are yours. The website itself is part of the $100 a month, like any monthly website service. If you stop paying, the website comes down. No contract, and you can cancel anytime.'],
  ],
  // 3F, 3G, 3H, then 3J with the two lines reworded in 7 NEW. All tap to open rows under 3E.
  rows: [
    ['What $100 a month covers', ["The website itself. I keep it online and working, and I make any change you send me by text or email. You never log in or touch any code. Month to month.", "If you want something that needs another company's software, like online booking, that software is on you. I'll help you pick one and set it up."]],
    ['How paying works', ["You only pay once you tell me you want the website. You pay through a secure link. Say yes within your 7 days and your first payment is $100, then $100 a month on the same card until you cancel. Cancel anytime with a text and you won't be charged again."]],
    ["How often you'll hear from me", ["While your 7 days run, I'll text, call or email you about once a day, each time with one thing to look at on your preview. If you'd rather I stop, just tell me."]],
    ['Do I need a credit card?', ['No. You see your website first, and you only pay if you want it.']],
    ['How long do I have to decide?', ['7 days, starting the day I text and email you your preview.']],
    ['What if I want it?', ["Tap Get this website on your preview, or tell me and I'll text you the link. Say yes within your 7 days and it's $0 to start, just $100 a month."]],
    ['What if I need more time?', ["When your 7 days end, you can add 24 hours yourself, right on the preview. Need longer than that? Tell me the day you can decide. Get this website by the day we agree on and it's still $0 to start. After it, it's my regular price: $1,000 to start, then $100 a month."]],
    ["What if I don't want it?", ["Let it go and you owe nothing. Your preview stays saved. After your time is up, it's my regular price."]],
    ['What happens after November 30?', ['Requests for this deal close November 30. If yours is in by then, you still get your full 7 days at $0 to start, even if they run into December. New requests after November 30 are at my regular price: $1,000 to start, then $100 a month.']],
  ],
  // 3I (heading from the 11/15 block)
  proofTitle: "What it's like to work with me",
  proofLink: 'See my Google reviews',
  // Bottom button and phone sticky button (3J)
  bottomBtn: 'Get my preview',
  // Thank you screen (11/15 block, replaces 3K)
  tyH1: "You're all set. <b>Your preview is next.</b>",
  tyLead: "I'll text and email you the link within 48 hours from 402-698-4902.",
  tyWatch: 'Watch for a text from me asking which job you want more of. Your answer goes at the top of your website.',
  tyText: 'Text me',
  tyCall: 'Call me',
  tyPick: 'Pick a time for me to call',
  tyEmail: 'Email me',
  tyTextBody: 'Send my preview to this number.', // sent as "This is [business name]. Send my preview to this number."
  // Photo line (CHANGED 11/15 10:12am): one small text link under the buttons, no button, no reason line.
  // [[ ]] marks the words that link to /photos in a new tab.
  tyPhotos: 'Have a logo or photos of your work? [[Send them here]] anytime.',
};

const COLORS = ['Black', 'White', 'Gray', 'Navy', 'Blue', 'Light blue', 'Green', 'Red', 'Orange', 'Yellow', 'Purple', 'Pink', 'Brown', 'Gold'];
const plain = s => s.replace(/<[^>]+>/g, '');
const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const css = `
.bf{--ink:${PROMO.ink};--cream:${PROMO.cream};--soft:#4a4a48;--rule:#dcd7ca;--paper:#fff;--paper2:#f6f3ec;color:var(--ink);background:var(--paper);font-size:18px;line-height:1.55}
.bf *{box-sizing:border-box}
.bf-in{width:100%;max-width:780px;margin:0 auto;padding:0 20px}.bf-in--wide{max-width:1160px}
.bf h2{font-family:var(--font-head);font-weight:700;font-size:clamp(1.7rem,5.4vw,2.5rem);line-height:1.15;color:var(--ink);letter-spacing:-.01em}
.bf-sec{padding:clamp(44px,7vw,84px) 0}.bf-sec--alt{background:var(--paper2)}
.bf-sub{margin-top:12px;color:var(--soft);font-size:clamp(1.05rem,2.6vw,1.2rem)}
.bf-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:62px;padding:16px 30px;border:0;border-radius:14px;background:var(--acc);color:#0D0D0D;font-family:var(--font-head);font-weight:700;font-size:1.15rem;line-height:1.2;text-decoration:none;cursor:pointer;-webkit-tap-highlight-color:transparent}
.bf-btn svg{width:20px;height:20px;flex:none}
.bf-btn--ink{background:var(--ink);color:#fff}.bf-btn--line{background:#fff;color:var(--ink);box-shadow:inset 0 0 0 2px var(--ink)}
.bf-btn:focus-visible,.bf-chip input:focus-visible+span,.bf-rows summary:focus-visible{outline:3px solid #2f6fe0;outline-offset:3px}
/* first screen: carries the ad (dark, trade accent, Black Friday Deal tag) */
.bf-hero{background:var(--ink);color:var(--cream);padding:16px 0 clamp(34px,6vw,72px);overflow:hidden}
.bf-brand{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-head);font-weight:700;font-size:.95rem;color:var(--cream);opacity:.9}
.bf-hero__g{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);grid-template-areas:"copy phone" "cta phone";gap:8px 56px;align-items:center;margin-top:clamp(16px,3vw,34px)}
.bf-hero__copy{grid-area:copy;align-self:end}.bf-hero__cta{grid-area:cta;align-self:start;margin-top:18px}.bf-hero__vid{grid-area:phone}
.bf-tags{display:flex;flex-wrap:wrap;gap:8px}
.bf-tag{display:inline-block;padding:8px 12px 7px;background:var(--cream);color:#0D0D0D;font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:700;font-size:1.05rem;line-height:1;letter-spacing:.06em;text-transform:uppercase}
.bf-tag--t{background:var(--acc)}
.bf-hero h1{margin:18px 0 14px;font-family:Anton,Impact,'Arial Narrow',sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(2.7rem,11.5vw,5.6rem);line-height:1.02;letter-spacing:.01em;color:var(--cream)}
.bf-hero h1 b{font-weight:400;color:var(--acc)}
.bf-lead{max-width:36ch;color:#ddd8cc;font-size:clamp(1.08rem,2.6vw,1.32rem);line-height:1.5}
.bf-phone{width:min(300px,100%);margin:0 auto;padding:10px;border-radius:40px;background:#1a1a1c;box-shadow:0 0 0 2px #303034,0 30px 80px rgba(0,0,0,.65)}
.bf-phone__s{position:relative;overflow:hidden;border-radius:30px;aspect-ratio:390/693;background:#fff}
.bf-phone__s img{display:block;width:100%;height:auto;will-change:transform}
.bf-video{display:block;width:100%;border-radius:18px;background:#000}
@media (max-width:860px){
  .bf-hero__g{grid-template-columns:minmax(0,1fr);grid-template-areas:"copy" "phone" "cta";gap:18px}
  .bf-hero__cta{margin-top:0}.bf-hero__cta .bf-btn{width:100%}
  .bf-phone{width:min(220px,58vw);padding:7px;border-radius:30px}.bf-phone__s{border-radius:24px;aspect-ratio:390/450}
}
@media (prefers-reduced-motion:reduce){.bf-phone__s img{animation:none!important}}
/* taps */
.bf-taps{scroll-margin-top:12px}
.bf-form{margin-top:22px;padding:clamp(20px,4vw,34px);border:2px solid var(--ink);border-radius:20px;background:#fff}
.bf-top{display:flex;align-items:center;gap:14px;margin-bottom:10px}
.bf-count{flex:none;font-family:var(--font-head);font-weight:700;font-size:1rem;color:var(--ink);white-space:nowrap}
.bf-prog{flex:1;height:8px;border-radius:999px;background:#e9e5da;overflow:hidden}.bf-prog i{display:block;height:100%;width:0;background:var(--ink);transition:width .3s}
.bf-note{margin:0 0 20px;color:var(--soft);font-size:1rem}
.bf-q{display:grid;gap:16px;margin:0;padding:0;border:0;min-width:0}
.bf-q+.bf-q{margin-top:34px}
.js-bf .bf-q{display:none}.js-bf .bf-q.on{display:grid}.js-bf .bf-q+.bf-q{margin-top:0}
.bf-q legend{padding:0;margin-bottom:6px;font-family:var(--font-head);font-weight:700;font-size:clamp(1.4rem,4.6vw,1.75rem);line-height:1.25;color:var(--ink)}
.bf-help{margin:-8px 0 0;color:var(--soft);font-size:1.02rem}
.bf-chips{display:grid;gap:10px;grid-template-columns:1fr 1fr}
.bf-chips--3{grid-template-columns:repeat(3,1fr)}
.bf-chip{position:relative;display:block;cursor:pointer}
.bf-chip input{position:absolute;opacity:0;pointer-events:none}
.bf-chip span{display:flex;align-items:center;justify-content:center;gap:9px;min-height:62px;padding:12px 14px;border:2px solid #cfc9ba;border-radius:14px;background:#fff;font-family:var(--font-head);font-weight:600;font-size:1.06rem;line-height:1.25;color:var(--ink);text-align:center}
.bf-chips--colors .bf-chip span{justify-content:flex-start;min-height:56px;font-size:1rem}
.bf-chip span i{flex:none;width:20px;height:20px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.bf-chip input:checked+span{border-color:var(--ink);background:var(--tint);box-shadow:inset 0 0 0 1px var(--ink)}
.bf-field label{display:block;margin-bottom:6px;font-family:var(--font-head);font-weight:600;font-size:1rem;color:var(--ink)}
.bf-form input:not([type=radio]):not([type=checkbox]),.bf-form textarea{width:100%;padding:15px 16px;border:2px solid #cfc9ba;border-radius:12px;background:#fff;color:var(--ink);font:inherit;font-size:1.05rem}
.bf-form input:focus,.bf-form textarea:focus{outline:none;border-color:var(--ink)}
.bf-next,.bf-send{width:100%}
.bf-assure{margin:0;text-align:center;color:var(--ink);font-weight:600;font-size:1rem}
.bf-consent{margin:0;text-align:center;color:var(--soft);font-size:.82rem;line-height:1.45}.bf-consent a{color:var(--soft);text-decoration:underline}
.bf-err{margin:0;color:#b3261e;font-weight:600;font-size:1rem}
.bf-back{margin-top:14px;padding:10px 0;border:0;background:none;color:var(--soft);font:inherit;font-size:1rem;cursor:pointer}
.bf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (max-width:520px){.bf-chips--3{grid-template-columns:1fr}.bf-chips--svc{grid-template-columns:1fr}}
/* the one sample site */
.bf-sample{margin-top:24px;border:2px solid var(--ink);border-radius:18px;overflow:hidden;background:#fff}
.bf-sample__bar{display:none;align-items:center;justify-content:flex-end;gap:12px;padding:10px 14px;background:var(--ink);color:var(--cream);font-family:var(--font-head);font-weight:600;font-size:.95rem}
.bf-sample__x{flex:none;min-height:44px;padding:8px 16px;border:0;border-radius:999px;background:var(--cream);color:#0D0D0D;font:700 .98rem var(--font-head);cursor:pointer}
.bf-sample__s{position:relative}
.bf-sample iframe{display:block;width:100%;height:min(700px,80vh);border:0;background:#fff}
.bf-sample__tap{display:none}
@media (max-width:860px){
  .bf-sample iframe{height:min(64svh,560px);pointer-events:none}
  .bf-sample__tap{display:flex;position:absolute;inset:0;align-items:flex-end;justify-content:center;padding:0 0 18px;border:0;background:linear-gradient(180deg,rgba(13,13,13,0) 55%,rgba(13,13,13,.78) 88%);cursor:pointer}
  .bf-sample__tap span{padding:13px 22px;border-radius:999px;background:var(--cream);color:#0D0D0D;font:700 1.02rem var(--font-head);box-shadow:0 8px 24px rgba(0,0,0,.35)}
}
.bf-sample.full{position:fixed;inset:0;z-index:400;margin:0;border:0;border-radius:0;display:flex;flex-direction:column}
.bf-sample.full .bf-sample__s{flex:1;min-height:0}.bf-sample.full iframe{height:100%;pointer-events:auto}
.bf-sample.full .bf-sample__tap{display:none}.bf-sample.full .bf-sample__bar{display:flex}
.bf-sample.full .bf-sample__bar{padding-top:calc(10px + env(safe-area-inset-top))}
body.bf-lock{overflow:hidden}
/* built to, catch, rows, proof */
.bf-ticks{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:14px}
.bf-ticks li{display:flex;gap:14px;align-items:flex-start;font-size:clamp(1.08rem,2.6vw,1.2rem);color:var(--ink)}
.bf-ticks svg{flex:none;width:30px;height:30px;padding:6px;border-radius:50%;background:var(--ink);color:var(--acc);margin-top:1px}
.bf-catch{list-style:none;margin:24px 0 0;padding:0;display:grid;gap:12px}
.bf-catch li{padding:20px 22px;border-radius:16px;background:#fff;border:2px solid var(--rule);border-left:8px solid var(--acc)}
.bf-catch h3{font-family:var(--font-head);font-weight:700;font-size:1.22rem;color:var(--ink);margin-bottom:6px}
.bf-catch p{color:#2c2c2a;font-size:1.05rem}
.bf-rows{margin-top:18px;display:grid;gap:10px}
.bf-rows details{border:2px solid var(--rule);border-radius:16px;background:#fff}
.bf-rows summary{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:64px;padding:14px 20px;list-style:none;cursor:pointer;font-family:var(--font-head);font-weight:700;font-size:1.1rem;color:var(--ink)}
.bf-rows summary::-webkit-details-marker{display:none}
.bf-rows summary:after{content:"+";flex:none;font-size:1.7rem;line-height:1;font-weight:400}
.bf-rows details[open] summary:after{content:"\\2212"}
.bf-rows details p{padding:0 20px 18px;color:#2c2c2a;font-size:1.05rem}.bf-rows details p+p{margin-top:-6px}
.bf-revs{margin-top:24px;display:grid;gap:14px}
.bf-rev{margin:0;padding:22px;border-radius:16px;background:#fff;border:2px solid var(--rule)}
.bf-rev .st{color:#e0a100;letter-spacing:3px;font-size:1.1rem}
.bf-rev q{display:block;margin-top:8px;quotes:none;color:var(--ink);font-size:1.05rem;line-height:1.6}
.bf-rev figcaption{margin-top:12px;font-family:var(--font-head);font-weight:700;font-size:1rem;color:var(--ink)}
.bf-link{display:inline-flex;align-items:center;gap:8px;margin-top:18px;min-height:44px;font-family:var(--font-head);font-weight:700;font-size:1.05rem;color:var(--ink);text-decoration:underline;text-underline-offset:4px}
.bf-link svg{width:18px;height:18px}
.bf-end{padding:clamp(40px,7vw,72px) 0;background:var(--ink);text-align:center}.bf-end .bf-btn{width:min(420px,100%)}
.bf-foot{padding:22px 0 calc(22px + env(safe-area-inset-bottom));background:var(--ink);color:#8d897f;text-align:center;font-size:.9rem}
.bf-sticky{display:none}
@media (max-width:860px){
  .bf-sticky{display:flex;position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:90;transform:translateY(160%);transition:transform .3s;box-shadow:0 0 0 2px #0D0D0D,0 14px 34px rgba(0,0,0,.4)}
  .bf-sticky.on{transform:none}
  .bf-foot{padding-bottom:calc(96px + env(safe-area-inset-bottom))}
}
/* thank you screen */
.bf-ty{min-height:100vh;display:flex;flex-direction:column}.bf-ty main{flex:1}
.bf-ty .bf-hero h1{font-size:clamp(2.4rem,9.5vw,4.6rem)}
.bf-ty .bf-lead{max-width:44ch}.bf-ty .bf-lead+.bf-lead{margin-top:14px}
.bf-acts{display:grid;gap:12px;margin-top:8px}
.bf-acts .bf-btn{width:100%;justify-content:flex-start}
.bf-photos{margin-top:26px;color:var(--soft);font-size:1rem}.bf-photos a{color:var(--ink);font-weight:600;text-decoration:underline;text-underline-offset:3px}
.bf-ty .bf-foot{padding-bottom:calc(22px + env(safe-area-inset-bottom))}
@media (min-width:700px){.bf-acts{grid-template-columns:1fr 1fr}}`;

const I = {
  text: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-4.5A8.4 8.4 0 1 1 21 11.5Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
};

/* The phone scroll stand in: hold on the top, then pause on each stop, then rewind. */
function scrollKeyframes(t) {
  const [a, b, c] = t.scroll.stops;
  const y = p => `transform:translateY(-${p}%)`;
  return `@keyframes bf-scroll-${t.slug}{0%,10%{transform:translateY(0)}17%,34%{${y(a)}}41%,58%{${y(b)}}65%,86%{${y(c)}}95%,100%{transform:translateY(0)}}
.bf-phone__s img{animation:bf-scroll-${t.slug} 19s cubic-bezier(.45,0,.2,1) infinite}`;
}

export function makeBlackFridayPages({ head, icon, site }) {
  const smsBase = site.phoneHref.replace('tel:', 'sms:');
  const googleReviews = `https://www.google.com/maps?cid=${site.gbpCid}`;
  const fonts = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@600;700;800&family=Barlow+Condensed:wght@700&display=swap">`;
  const brand = `<span class="bf-brand"><img src="/assets/evovero-logo-80.webp" alt="" width="26" height="26">EvoVero</span>`;
  const foot = `<footer class="bf-foot"><div class="bf-in">&copy; ${new Date().getFullYear()} EvoVero</div></footer>`;
  const tags = t => `<div class="bf-tags"><span class="bf-tag">${PROMO.tag}</span><span class="bf-tag bf-tag--t">${t.tag}</span></div>`;
  const vars = t => `--acc:${t.accent};--tint:color-mix(in srgb,${t.accent} 24%,#fff)`;
  const chip = (name, value, label, type = 'radio', extra = '') => `<label class="bf-chip"><input type="${type}" name="${name}" value="${attr(value)}"${extra}><span>${label}</span></label>`;

  /* ---------------- landing page ---------------- */
  function landing(t) {
    const path = `/${PROMO.slug}/${t.slug}`;
    const slot = PROMO.video
      ? `<video class="bf-video" controls playsinline preload="metadata"${PROMO.video.poster ? ` poster="${PROMO.video.poster}"` : ''} src="${PROMO.video.src}"></video>`
      : `<div class="bf-phone" aria-hidden="true"><div class="bf-phone__s"><img src="${t.scroll.img}" width="${t.scroll.w}" height="${t.scroll.h}" alt="" decoding="async" fetchpriority="high"></div></div>`;

    const form = `<form id="bf-form" class="bf-form" name="website-trial" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="${path}/thanks/" novalidate>
      <input type="hidden" name="form-name" value="website-trial">
      <input type="hidden" name="form_version" value="${PROMO.formVersion}">
      <input type="hidden" name="promo" value="${PROMO.slug}">
      <input type="hidden" name="trade" value="${t.slug}">
      <input type="hidden" name="source" id="bf-src">
      <input type="hidden" name="demo_pick" value="${attr(t.demo.name)}">
      <p hidden><label>Skip this<input name="bot-field"></label></p>
      <div class="bf-top"><span class="bf-count" id="bf-count" aria-live="polite"></span><div class="bf-prog"><i id="bf-bar"></i></div></div>
      <p class="bf-note">${COPY.tapsNote}</p>

      <fieldset class="bf-q" data-q="services"><legend>${COPY.qServices}</legend>
        <div class="bf-chips bf-chips--svc">${t.services.map(s => chip('services', s, s, 'checkbox')).join('')}${chip('services', 'Other', 'Other', 'checkbox', ' data-other="bf-svc-other"')}</div>
        <div class="bf-field" id="bf-svc-other-wrap" hidden><label class="bf-sr" for="bf-svc-other">Other</label><input id="bf-svc-other" name="services_other"></div>
        <button type="button" class="bf-btn bf-btn--ink bf-next" data-next>Next ${icon('arrow')}</button>
      </fieldset>

      <fieldset class="bf-q" data-q="logo"><legend>${COPY.qLogo}</legend>
        <div class="bf-chips">${chip('has_logo', 'Yes', COPY.logoYes, 'radio', ' data-auto')}${chip('has_logo', 'No', COPY.logoNo, 'radio', ' data-auto')}</div>
      </fieldset>

      <fieldset class="bf-q" data-q="colors"><legend><span data-if-logo="Yes">${COPY.qColorsYes}</span><span data-if-logo="No">${COPY.qColorsNo}</span></legend>
        <p class="bf-help" data-if-logo="No">${COPY.colorsNoHelp}</p>
        <div class="bf-chips bf-chips--colors">${COLORS.map(c => chip('colors', c, `<i style="background:${SWATCH[c]}"></i>${c}`, 'checkbox')).join('')}${chip('colors', 'Other', 'Other', 'checkbox', ' data-other="bf-colors-other"')}</div>
        <div class="bf-field" id="bf-colors-other-wrap" hidden><label for="bf-colors-other">${COPY.colorsOther}</label><input id="bf-colors-other" name="colors_other"></div>
        <button type="button" class="bf-btn bf-btn--ink bf-next" data-next>Next ${icon('arrow')}</button>
      </fieldset>

      <fieldset class="bf-q" data-q="reach"><legend>${COPY.qReach}</legend>
        <div class="bf-chips bf-chips--3">${chip('contact_pref', 'Text', 'Text', 'radio', ' data-auto')}${chip('contact_pref', 'Call', 'Call', 'radio', ' data-auto')}${chip('contact_pref', 'Email', 'Email', 'radio', ' data-auto')}</div>
      </fieldset>

      <fieldset class="bf-q" data-q="more"><legend>${COPY.qMore}</legend>
        <p class="bf-help">${COPY.moreHelp}</p>
        <div class="bf-field"><label class="bf-sr" for="bf-more">${COPY.qMore}</label><textarea id="bf-more" name="anything_else" rows="3"></textarea></div>
        <button type="button" class="bf-btn bf-btn--ink bf-next" data-next>Next ${icon('arrow')}</button>
      </fieldset>

      <fieldset class="bf-q" data-q="who"><legend>${COPY.qLast}</legend>
        <p class="bf-help" id="bf-who-help">${COPY.lastOther}</p>
        <div class="bf-field" data-unknown><label for="bf-name">Your name</label><input id="bf-name" name="name" autocomplete="name"></div>
        <div class="bf-field"><label for="bf-biz">Business name</label><input id="bf-biz" name="business" autocomplete="organization"></div>
        <div class="bf-field" data-unknown><label for="bf-phone">Phone</label><input id="bf-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
        <div class="bf-field" data-unknown><label for="bf-email">Email</label><input id="bf-email" name="email" type="email" autocomplete="email" inputmode="email"></div>
        <p class="bf-err" id="bf-err" role="alert" hidden></p>
        <button class="bf-btn bf-btn--ink bf-send" type="submit">${COPY.send} ${icon('arrow')}</button>
        <p class="bf-assure">${COPY.assure}</p>
        <p class="bf-consent">By sending this, you agree I can text and email you about your preview. Message and data rates may apply. Reply STOP to opt out. <a href="/privacy-policy/" target="_blank" rel="noopener">Privacy</a> and <a href="/terms/" target="_blank" rel="noopener">Terms</a>.</p>
      </fieldset>

      <button type="button" class="bf-back" id="bf-back" hidden>&larr; Back</button>
    </form>`;

    const script = `<script>(function(){
  var TRADE=${JSON.stringify(t.slug)},KEY='bf_v1_'+TRADE,form=document.getElementById('bf-form');if(!form)return;
  var src=new URLSearchParams(location.search).get('src')||'direct',known=['form','text','email'].indexOf(src)>-1;
  document.getElementById('bf-src').value=src;
  function ga(n,p){try{p=p||{};p.promo=${JSON.stringify(PROMO.slug)};p.trade=TRADE;if(window.gtag)gtag('event',n,p);}catch(e){}}
  function $$(s,r){return [].slice.call((r||document).querySelectorAll(s));}
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){return {};}}
  function save(){try{var d={q:cur,v:{}};[].slice.call(form.elements).forEach(function(el){if(!el.name||el.type==='hidden')return;if(el.type==='radio'||el.type==='checkbox'){if(el.checked)(d.v[el.name]=d.v[el.name]||[]).push(el.value);}else if(el.value)d.v[el.name]=[el.value];});localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}
  // Leads from the form already gave their name, phone and email: the last tap asks for the business name only.
  if(known){$$('[data-unknown]',form).forEach(function(el){el.hidden=true;});document.getElementById('bf-who-help').textContent=${JSON.stringify(COPY.lastKnown)};}
  form.classList.add('js-bf');
  var qs=$$('.bf-q',form),cur=0,count=document.getElementById('bf-count'),bar=document.getElementById('bf-bar'),back=document.getElementById('bf-back'),err=document.getElementById('bf-err');
  function logoAns(){var r=form.querySelector('input[name=has_logo]:checked');return r?r.value:'';}
  function syncLogo(){var a=logoAns()||'No';$$('[data-if-logo]',form).forEach(function(el){el.hidden=el.getAttribute('data-if-logo')!==a;});}
  var fired={},seen=false;function track(){if(!seen||fired[cur])return;fired[cur]=1;ga('ft_step',{step:qs[cur].getAttribute('data-q'),n:cur+1});}
  function go(i,tr,focus){cur=Math.max(0,Math.min(qs.length-1,i));qs.forEach(function(q,k){q.classList.toggle('on',k===cur);});count.textContent=(cur+1)+' of '+qs.length;bar.style.width=((cur+1)/qs.length*100)+'%';back.hidden=cur===0;syncLogo();save();if(tr)track();
    if(tr){var r=form.getBoundingClientRect();if(r.top<0)form.scrollIntoView({block:'start'});}
    if(focus){var f=qs[cur].querySelector('input:not([type=hidden]),textarea');if(f)try{f.focus({preventScroll:true});}catch(x){f.focus();}}}
  var intent='',was=null;
  form.addEventListener('pointerdown',function(e){intent='ptr';var c=e.target.closest&&e.target.closest('.bf-chip');var i=c&&c.querySelector('input[data-auto]');was=i&&i.checked?i:null;});
  form.addEventListener('keydown',function(e){if(e.key===' '||e.key==='Enter'){intent='key';if(e.key==='Enter'&&e.target.tagName==='INPUT'&&e.target.type!=='submit'){if(e.target.type==='radio'){e.preventDefault();e.target.checked=true;e.target.dispatchEvent(new Event('change',{bubbles:true}));}else if(cur<qs.length-1){e.preventDefault();go(cur+1,true,true);}}}else intent='';});
  form.addEventListener('change',function(e){var el=e.target;
    if(el.hasAttribute('data-other')){var id=el.getAttribute('data-other');document.getElementById(id+'-wrap').hidden=!el.checked;if(el.checked)document.getElementById(id).focus();}
    if(el.name==='has_logo')syncLogo();save();
    if(el.hasAttribute('data-auto')&&el.checked&&intent){var kb=intent==='key';intent='';setTimeout(function(){go(cur+1,true,kb);},200);}});
  // Tapping an answer that is already picked (after Back) moves on too.
  form.addEventListener('click',function(e){if(was&&e.target===was){was=null;intent='';setTimeout(function(){go(cur+1,true,false);},150);}});
  form.addEventListener('input',function(){save();err.hidden=true;});
  $$('[data-next]',form).forEach(function(b){b.addEventListener('click',function(e){go(cur+1,true,e.detail===0);});});
  back.addEventListener('click',function(){go(cur-1,false);});
  if('IntersectionObserver' in window){new IntersectionObserver(function(en){if(en[0].isIntersecting&&!seen){seen=true;track();}},{threshold:.3}).observe(form);}else{seen=true;}
  // Restore saved answers (a reload does not wipe them)
  var d=load();if(d.v){Object.keys(d.v).forEach(function(n){var vals=d.v[n];$$('[name="'+n+'"]',form).forEach(function(el){if(el.type==='radio'||el.type==='checkbox')el.checked=vals.indexOf(el.value)>-1;else el.value=vals[0];});});
    $$('[data-other]',form).forEach(function(o){if(o.checked)document.getElementById(o.getAttribute('data-other')+'-wrap').hidden=false;});}
  go(typeof d.q==='number'?d.q:0,false);
  // Send
  form.addEventListener('submit',function(e){e.preventDefault();
    var n=document.getElementById('bf-name'),b=document.getElementById('bf-biz'),ph=document.getElementById('bf-phone'),em=document.getElementById('bf-email'),miss=[];
    if(!known&&!n.value.trim())miss.push('your name');if(!b.value.trim())miss.push('your business name');if(!known&&!ph.value.trim()&&!em.value.trim())miss.push('a phone or email');
    if(miss.length){err.textContent='Add '+(miss.length>1?miss.slice(0,-1).join(', ')+' and '+miss[miss.length-1]:miss[0])+' so I know where to send your preview.';err.hidden=false;go(qs.length-1,false);return;}
    err.hidden=true;var btn=form.querySelector('.bf-send');btn.disabled=true;
    var pick=form.querySelector('input[name=contact_pref]:checked');
    try{localStorage.setItem('bf_who',JSON.stringify({business:b.value.trim(),pick:pick?pick.value:'',trade:TRADE}));}catch(x){}
    var fd=new FormData(form);fd.set('services',fd.getAll('services').join(', '));fd.set('colors',fd.getAll('colors').join(', '));
    var done=form.getAttribute('action');
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(fd).toString()})
      .then(function(r){if(!r.ok)throw 0;ga('trial_extras',{form_name:'website-trial'});ga('ft_submit',{src:src});try{localStorage.removeItem(KEY);}catch(x){}setTimeout(function(){location.href=done;},300);})
      .catch(function(){btn.disabled=false;HTMLFormElement.prototype.submit.call(form);});
  });
})();</script>`;

    const shared = `<script>(function(){
  var TRADE=${JSON.stringify(t.slug)};
  function ga(n,p){try{p=p||{};p.promo=${JSON.stringify(PROMO.slug)};p.trade=TRADE;if(window.gtag)gtag('event',n,p);}catch(e){}}
  // The sample site: links that lead away are removed, calls and forms inside it do nothing.
  var box=document.getElementById('bf-sample'),frame=document.getElementById('bf-frame');
  function tame(){try{var doc=frame.contentDocument;if(!doc||!doc.head)return;var st=doc.createElement('style');st.textContent='.mb,.callbar{display:none!important}body{padding-bottom:0!important}';doc.head.appendChild(st);
    [].slice.call(doc.querySelectorAll('a[href^="/get-started"],.ft__demo a')).forEach(function(a){a.remove();});
    [].slice.call(doc.querySelectorAll('a[href^="tel:"],a[href^="mailto:"],a[href^="sms:"]')).forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();});});
    [].slice.call(doc.querySelectorAll('a[target]')).forEach(function(a){a.removeAttribute('target');});
    [].slice.call(doc.querySelectorAll('form')).forEach(function(fm){fm.addEventListener('submit',function(e){e.preventDefault();});});}catch(e){}}
  if(frame){frame.addEventListener('load',tame);tame();}
  var pushed=false;
  function openFull(){if(!box||box.classList.contains('full'))return;box.classList.add('full');document.body.classList.add('bf-lock');try{history.pushState({bfFull:1},'');pushed=true;}catch(e){}ga('ft_demo_full',{demo:TRADE});var x=box.querySelector('.bf-sample__x');if(x)x.focus();}
  function closeFull(fromPop){if(!box||!box.classList.contains('full'))return;box.classList.remove('full');document.body.classList.remove('bf-lock');if(pushed&&!fromPop){try{history.back();}catch(e){}}pushed=false;box.scrollIntoView({block:'center'});}
  if(box){box.querySelector('.bf-sample__tap').addEventListener('click',openFull);box.querySelector('.bf-sample__x').addEventListener('click',function(){closeFull();});
    window.addEventListener('popstate',function(){closeFull(true);});document.addEventListener('keydown',function(e){if(e.key==='Escape')closeFull();});}
  // Phone sticky button: shows once the first screen is gone and the taps are not on screen.
  var sb=document.getElementById('bf-sticky'),taps=document.getElementById('taps'),hero=document.querySelector('.bf-hero'),end=document.querySelector('.bf-end'),tk=0;
  if(sb&&taps&&hero){window.addEventListener('scroll',function(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;var r=taps.getBoundingClientRect();sb.classList.toggle('on',hero.getBoundingClientRect().bottom<0&&(r.top>window.innerHeight*0.7||r.bottom<0)&&!(end&&end.getBoundingClientRect().top<window.innerHeight));});},{passive:true});}
})();</script>`;
    const ctx = { PROMO, path, site, tags: tags(t).replace(/^<div class="bf-tags">|<\/div>$/g, ''), uploaderHtml: uploader('bb-up', 'blackfriday-builder', { site }) };
    const tapsSection = t.builder ? builderHtml(t, ctx) : `<section class="bf-sec bf-taps" id="taps"><div class="bf-in">
  <h2>${COPY.tapsTitle}</h2>
  ${form}
</div></section>`;
    const tapsScript = t.builder ? `${dropboxForm}${dropboxScript}${builderScript(t, ctx)}` : script;

    const body = `${fonts}<style>${css}${t.builder ? builderCss + dropboxCss : ''}${PROMO.video ? '' : scrollKeyframes(t)}</style>
<div class="bf" data-trade="${t.slug}" style="${vars(t)}">
<main>
<section class="bf-hero"><div class="bf-in bf-in--wide">
  ${brand}
  <div class="bf-hero__g">
    <div class="bf-hero__copy">
      ${tags(t)}
      <h1 id="bf-h1">${COPY.h1Form}</h1>
      <script>(function(){if(['form','text','email'].indexOf(new URLSearchParams(location.search).get('src'))<0)document.getElementById('bf-h1').innerHTML=${JSON.stringify(COPY.h1Other)};})();</script>
      <p class="bf-lead">${COPY.lead}</p>
    </div>
    <div class="bf-hero__vid">${slot}</div>
    <div class="bf-hero__cta"><a class="bf-btn" href="#taps">${COPY.heroBtn} ${icon('arrow')}</a></div>
  </div>
</div></section>

${tapsSection}

<section class="bf-sec bf-sec--alt"><div class="bf-in bf-in--wide">
  <div class="bf-in" style="padding:0;margin:0"><h2>${t.sampleHeading}</h2>
  <p class="bf-sub">${COPY.sampleLead}</p></div>
  <div class="bf-sample" id="bf-sample">
    <div class="bf-sample__bar"><button type="button" class="bf-sample__x">Close &times;</button></div>
    <div class="bf-sample__s"><iframe id="bf-frame" title="${attr(t.demo.name)}, a sample website" src="${t.demo.url}" loading="lazy"></iframe><button type="button" class="bf-sample__tap" aria-label="Open the sample website"><span>Tap to look around</span></button></div>
  </div>
</div></section>

<section class="bf-sec"><div class="bf-in">
  <h2>${COPY.builtTitle}</h2>
  <ul class="bf-ticks">${COPY.built.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
</div></section>

<section class="bf-sec bf-sec--alt"><div class="bf-in">
  <h2>${COPY.catchTitle}</h2>
  <ul class="bf-catch">${COPY.catches.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join('')}</ul>
  <div class="bf-rows">${COPY.rows.map(([q, ps]) => `<details><summary>${q}</summary>${ps.map(p => `<p>${p}</p>`).join('')}</details>`).join('')}</div>
</div></section>

<section class="bf-sec"><div class="bf-in">
  <h2>${COPY.proofTitle}</h2>
  <div class="bf-revs">${['Chris', 'Jesse', 'Yadira'].map(n => reviews.find(r => r.name.startsWith(n))).filter(Boolean).map(r => `<figure class="bf-rev"><span class="st" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><q>${r.text}</q><figcaption>${r.name}</figcaption></figure>`).join('')}</div>
  <a class="bf-link" href="${googleReviews}" target="_blank" rel="noopener">${COPY.proofLink} ${icon('arrow')}</a>
</div></section>

<section class="bf-end"><div class="bf-in"><a class="bf-btn" href="#taps">${COPY.bottomBtn} ${icon('arrow')}</a></div></section>
</main>
${foot}
<a class="bf-btn bf-sticky" id="bf-sticky" href="#taps">${COPY.bottomBtn} ${icon('arrow')}</a>
</div>
${tapsScript}
${shared}
<script src="/site.js" defer></script></body></html>`;

    return head({ title: t.title, desc: t.desc, path, noindex: true, schema: [], fast: true }) + body;
  }

  /* ---------------- thank you screen ---------------- */
  // The button that matches the lead's answer to "how should I reach you?" shows first (saved by the taps).
  function thanks(t) {
    const path = `/${PROMO.slug}/${t.slug}/thanks`;
    const acts = [
      ['Text', `<a class="bf-btn" data-act="Text" id="bf-sms" href="${smsBase}?&body=${encodeURIComponent(COPY.tyTextBody)}">${I.text}${COPY.tyText}</a>`],
      ['Call', `<a class="bf-btn" data-act="Call" href="${site.phoneHref}">${icon('phone')}${COPY.tyCall}</a>`],
      ['Pick', `<a class="bf-btn" data-act="Pick" href="${PROMO.callLink}" target="_blank" rel="noopener">${icon('cal')}${COPY.tyPick}</a>`],
      ['Email', `<a class="bf-btn" data-act="Email" href="mailto:${site.email}">${I.mail}${COPY.tyEmail}</a>`],
    ];
    const body = `${fonts}<style>${css}</style>
<div class="bf bf-ty" data-trade="${t.slug}" style="${vars(t)}">
<main>
<section class="bf-hero"><div class="bf-in">
  ${brand}
  <div style="margin-top:clamp(16px,3vw,34px)">${tags(t)}</div>
  <h1>${COPY.tyH1}</h1>
  <p class="bf-lead">${COPY.tyLead.replace(site.phone, `<span style="white-space:nowrap">${site.phone}</span>`)}</p>
  <p class="bf-lead">${COPY.tyWatch}</p>
</div></section>
<section class="bf-sec"><div class="bf-in">
  <div class="bf-acts" id="bf-acts">${acts.map(a => a[1]).join('')}</div>
  <p class="bf-photos">${COPY.tyPhotos.replace('[[', '<a id="bf-photos" href="/photos/" target="_blank" rel="noopener">').replace(']]', '</a>')}</p>
</div></section>
</main>
${foot}
</div>
<script>(function(){
  var w={};try{w=JSON.parse(localStorage.getItem('bf_who')||'{}');}catch(e){}
  var box=document.getElementById('bf-acts'),first=box.querySelector('[data-act="'+(w.pick||'Text')+'"]');
  if(first){box.insertBefore(first,box.firstChild);}
  [].slice.call(box.children).forEach(function(a,i){a.classList.toggle('bf-btn--line',i>0);
    a.addEventListener('click',function(){try{if(window.gtag)gtag('event','bf_contact_click',{kind:a.getAttribute('data-act'),promo:${JSON.stringify(PROMO.slug)},trade:${JSON.stringify(t.slug)}});}catch(e){}});});
  if(w.business){
    document.getElementById('bf-sms').href=${JSON.stringify(smsBase)}+'?&body='+encodeURIComponent('This is '+w.business+'. '+${JSON.stringify(COPY.tyTextBody)});
    document.getElementById('bf-photos').href='/photos/?b='+encodeURIComponent(w.business);
  }
})();</script>
<script src="/site.js" defer></script></body></html>`;
    return head({ title: `${plain(COPY.tyH1)} | EvoVero`, desc: COPY.tyLead, path, noindex: true, schema: [], fast: true }) + body;
  }

  return TRADES.flatMap(t => [
    [`/${PROMO.slug}/${t.slug}`, landing(t)],
    [`/${PROMO.slug}/${t.slug}/thanks`, thanks(t)],
  ]);
}
