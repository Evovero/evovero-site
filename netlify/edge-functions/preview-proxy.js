// evovero.com/preview/<name>/... shows the W100 preview branch deploy <name>--new-website-preview.netlify.app.
// An edge function, because a Netlify proxy rule cannot put <name> into the target host.
// Previews stay on the free preview project (branch deploys, no credits here); this only passes requests through.
export const config = { path: ['/preview', '/preview/*'] };

const NAME = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
// Same hidden files the preview's own netlify.toml blocks, blocked here too in case an old branch lacks the rule.
const HIDDEN = /^(README\.md|build\.py|site\.json|stitch\.py|netlify\.toml|package(-lock)?\.json)$/i;

let upstreamFetch = (...a) => fetch(...a);
// Test seam only: lets the sandbox point the proxy at a local stand in.
export const __test = { setFetch: (f) => { upstreamFetch = f; } };

const notFound = () => new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex', 'cache-control': 'no-store' } });

export default async (req) => {
  const url = new URL(req.url);
  const m = url.pathname.match(/^\/preview(?:\/([^/]*))?(\/.*)?$/);
  if (!m || !m[1]) return notFound();
  const name = m[1].toLowerCase();
  if (!NAME.test(name)) return notFound();
  // One spelling only, so the page can always find its own name (Extend and the first opened email need it).
  if (m[1] !== name) return new Response(null, { status: 301, headers: { location: `/preview/${name}${m[2] || '/'}${url.search}`, 'cache-control': 'no-store' } });
  // /preview/name -> /preview/name/ so the page's relative links resolve. Query string kept (?owner=1, ?timer=test).
  if (m[2] === undefined) {
    return new Response(null, { status: 301, headers: { location: `/preview/${name}/${url.search}`, 'cache-control': 'no-store' } });
  }
  let rest = m[2].replace(/\/{2,}/g, '/').slice(1);
  let decoded = rest;
  try { decoded = decodeURIComponent(rest); } catch { return notFound(); }
  const last = decoded.split(/[\/\\]/).filter(Boolean).pop() || '';
  if (HIDDEN.test(last) || /(^|[\/\\])\.\.?([\/\\]|$)/.test(decoded)) return notFound();
  if (req.method !== 'GET' && req.method !== 'HEAD') return new Response('Method not allowed', { status: 405 });

  const target = `https://${name}--new-website-preview.netlify.app/${rest}${url.search}`;
  let r;
  try {
    r = await upstreamFetch(target, { method: req.method, headers: { 'user-agent': req.headers.get('user-agent') || '' }, redirect: 'manual' });
  } catch {
    return new Response('Preview is not reachable right now. Try again in a minute.', { status: 502, headers: { 'content-type': 'text/plain', 'cache-control': 'no-store' } });
  }
  const h = new Headers(r.headers);
  // Keep any redirect inside /preview/<name>/ instead of sending the visitor to netlify.app.
  const loc = h.get('location');
  if (loc) {
    try {
      const l = new URL(loc, target);
      if (l.host === `${name}--new-website-preview.netlify.app`) h.set('location', `/preview/${name}${l.pathname}${l.search}`);
    } catch { /* leave it */ }
  }
  h.set('x-robots-tag', 'noindex, nofollow');
  // Pages are never cached (the countdown and the end card must be current); fonts, images and video can be.
  const html = (h.get('content-type') || '').includes('text/html');
  h.set('cache-control', html ? 'no-store' : 'public, max-age=3600');
  h.delete('content-encoding');
  h.delete('content-length');
  // A branch that does not exist (or was deleted) shows a plain not found, not Netlify's page.
  if (r.status === 404) return notFound();
  return new Response(req.method === 'HEAD' ? null : r.body, { status: r.status, headers: h });
};
