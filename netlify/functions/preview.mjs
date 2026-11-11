// Preview state for W100 previews (Black Friday 2026 on): Extend preview and the first opened alert.
// Called by every preview page, whether it is viewed at evovero.com/preview/<name>/ or at
// <name>--new-website-preview.netlify.app. One small record per preview in Netlify Blobs:
//   open/<name>  first real open (not Spencer with ?owner=1, not a bot). Written once; emails Spencer once.
//   ext/<name>   the one 24 hour extension. Written once, so a preview can only be extended one time.
// Emails go to Spencer only, through the Zapier Catch Hook in env PREVIEW_ALERT_HOOK. Nothing ever goes to a lead.
// If the hook is missing or down the state is still saved; the alert is just skipped and logged.
//
// GET  /api/preview?slug=<name>                -> { extended_until: ISO | null, used: bool }
// POST /api/preview { action: "open",   slug } -> { ok, first }
// POST /api/preview { action: "extend", slug } -> { ok, extended_until, used: true, already }
import { getStore } from '@netlify/blobs';

export const config = { path: '/api/preview' };

const EXT_MS = 24 * 60 * 60 * 1000;
const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
// Automated browsers (audit tools, screenshot runners, link unfurlers) must never use up the one first opened email.
// "bot" only as its own word or in a "Somethingbot/1.0" token, so Cubot phones still count as people.
const BOT = /(?:^|[^a-z])bot\b|[a-z]bot\/\d|crawl|spider|slurp|headless|lighthouse|pagespeed|gtmetrix|pingdom|uptime|preview|facebookexternalhit|whatsapp|telegram|slack|discord|skype|embedly|curl|wget|python|node-fetch|axios|go-http|java\/|okhttp|puppeteer|playwright|selenium|phantom/i;
const ALLOWED = [/^https:\/\/(www\.)?evovero\.com$/, /^https:\/\/[a-z0-9-]+--new-website-preview\.netlify\.app$/];

let storeFactory = () => getStore({ name: 'preview-state', consistency: 'strong' });
let hookFetch = (...a) => fetch(...a);
// Test seam only: lets the sandbox swap in a memory store and a fake hook.
export const __test = { setStore: (f) => { storeFactory = f; }, setFetch: (f) => { hookFetch = f; }, allowOrigin: (re) => { ALLOWED.push(re); } };

const originOk = (o) => !o || ALLOWED.some((re) => re.test(o));

function headers(origin) {
  const h = { 'content-type': 'application/json', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' };
  if (origin && originOk(origin)) {
    h['access-control-allow-origin'] = origin;
    h['access-control-allow-methods'] = 'GET, POST, OPTIONS';
    h['access-control-allow-headers'] = 'content-type';
    h.vary = 'Origin';
  }
  return h;
}

const json = (body, status, origin) => new Response(JSON.stringify(body), { status, headers: headers(origin) });

async function alert(event, slug, extra = {}) {
  const hook = (globalThis.Netlify?.env?.get?.('PREVIEW_ALERT_HOOK')) || process.env.PREVIEW_ALERT_HOOK;
  if (!hook) { console.log(`preview alert skipped (no PREVIEW_ALERT_HOOK): ${event} ${slug}`); return false; }
  const link = `https://evovero.com/preview/${slug}/?owner=1`;
  const subject = event === 'extend' ? `Preview extended: ${slug}` : `Preview opened for the first time: ${slug}`;
  try {
    const r = await hookFetch(hook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ event, slug, subject, link, at: new Date().toISOString(), ...extra }),
    });
    if (!r.ok) console.log(`preview alert hook returned ${r.status}: ${event} ${slug}`);
    return r.ok;
  } catch (err) {
    console.log(`preview alert hook failed: ${event} ${slug}: ${err && err.message}`);
    return false;
  }
}

function status(rec) {
  return { extended_until: rec && rec.until ? rec.until : null, used: !!rec };
}

export default async (req) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: headers(origin) });
  if (!originOk(origin)) return json({ error: 'origin' }, 403, null);

  const store = storeFactory();

  if (req.method === 'GET') {
    const slug = new URL(req.url).searchParams.get('slug') || '';
    if (!SLUG.test(slug)) return json({ error: 'slug' }, 400, origin);
    try {
      return json(status(await store.get(`ext/${slug}`, { type: 'json' })), 200, origin);
    } catch (err) {
      console.log(`preview state read failed: ${slug}: ${err && err.message}`);
      return json({ error: 'store' }, 503, origin);
    }
  }

  if (req.method !== 'POST') return json({ error: 'method' }, 405, origin);

  let body;
  try { body = JSON.parse(await req.text()); } catch { body = null; }
  if (!body || typeof body !== 'object') return json({ error: 'body' }, 400, origin);
  const slug = typeof body.slug === 'string' ? body.slug : '';
  if (!SLUG.test(slug)) return json({ error: 'slug' }, 400, origin);
  const ua = req.headers.get('user-agent') || '';

  if (body.action === 'open') {
    if (!ua || BOT.test(ua)) return json({ ok: true, first: false, ignored: true }, 200, origin);
    try {
      const w = await store.setJSON(`open/${slug}`, { at: new Date().toISOString() }, { onlyIfNew: true });
      if (w.modified) await alert('first_open', slug);
      return json({ ok: true, first: !!w.modified }, 200, origin);
    } catch (err) {
      console.log(`preview open write failed: ${slug}: ${err && err.message}`);
      return json({ error: 'store' }, 503, origin);
    }
  }

  if (body.action === 'extend') {
    if (!ua || BOT.test(ua)) return json({ error: 'automated' }, 403, origin);
    const now = Date.now();
    const rec = { at: new Date(now).toISOString(), until: new Date(now + EXT_MS).toISOString() };
    try {
      const w = await store.setJSON(`ext/${slug}`, rec, { onlyIfNew: true });
      if (!w.modified) {
        // Already used once: report what is stored, never overwrite it.
        const cur = await store.get(`ext/${slug}`, { type: 'json' });
        return json({ ok: false, already: true, ...status(cur) }, 409, origin);
      }
      await alert('extend', slug, { extended_until: rec.until });
      return json({ ok: true, already: false, ...status(rec) }, 200, origin);
    } catch (err) {
      console.log(`preview extend write failed: ${slug}: ${err && err.message}`);
      return json({ error: 'store' }, 503, origin);
    }
  }

  return json({ error: 'action' }, 400, origin);
};
