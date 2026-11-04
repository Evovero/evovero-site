// Hands the browser a one time Google Drive upload link. The files themselves go from the
// sender's phone straight to Drive; nothing big ever passes through Netlify.
//   POST {action:"batch", name, source}            -> {folderId, folderUrl}  (one dated subfolder per sender per day)
//   POST {action:"file", folderId, name, type, size} -> {uploadUrl}
// Replies 503 {fallback:true} until /photo-connect has been run, so the page keeps using Uploadcare.
import { getConfig, client, accessToken, drive, createFolder, folderUrl } from '../lib/photo-drive.mjs';

const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const MAX = 10 * 1024 ** 3; // 10 GB per file, room for long phone videos
const TYPES = /^(image\/|video\/|application\/(pdf|postscript|illustrator|octet-stream)$)/;
const EXT = /\.(jpe?g|png|gif|webp|heic|heif|tiff?|bmp|svg|pdf|ai|eps|psd|mov|mp4|m4v|3gp|avi|webm|hevc|dng|raw|cr2|nef|arw)$/i;
const ORIGINS = /^https:\/\/((www\.)?evovero\.com|[a-z0-9-]+--evovero\.netlify\.app|evovero\.netlify\.app)$/;
const clean = (s, n) => String(s || '').replace(/[\u0000-\u001f\/\\]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);

function today() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const g = (t) => p.find((x) => x.type === t).value;
  return g('year') + '-' + g('month') + '-' + g('day');
}

export default async (req) => {
  const origin = req.headers.get('origin') || '';
  if (!ORIGINS.test(origin)) return json({ error: 'origin' }, 403);
  const cfg = client() ? await getConfig() : null;
  if (!cfg || !cfg.refresh_token || !cfg.inbox_id) return json({ fallback: true }, 503);

  let b;
  try { b = await req.json(); } catch { return json({ error: 'bad body' }, 400); }
  let token;
  try { token = await accessToken(cfg); } catch (e) { console.error(e); return json({ fallback: true }, 503); }

  try {
    if (b.action === 'batch') {
      const who = clean(b.name, 80);
      if (!who) return json({ error: 'name' }, 400);
      const title = today() + ' ' + who;
      // Reuse today's folder for the same sender. drive.file only ever sees folders this app made.
      const q = encodeURIComponent(`'${cfg.inbox_id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false and name='${title.replace(/'/g, "\\'")}'`);
      const found = await drive(token, 'files?fields=files(id)&pageSize=1&q=' + q);
      const id = (found.files && found.files[0] && found.files[0].id) || (await createFolder(token, title, cfg.inbox_id)).id;
      return json({ folderId: id, folderUrl: folderUrl(id) });
    }

    if (b.action === 'file') {
      const name = clean(b.name, 180) || 'file';
      const size = Number(b.size);
      const type = String(b.type || '');
      if (!/^[A-Za-z0-9_-]{10,}$/.test(String(b.folderId || ''))) return json({ error: 'folder' }, 400);
      if (!(size > 0 && size <= MAX)) return json({ error: 'size' }, 413);
      if (!TYPES.test(type) && !EXT.test(name)) return json({ error: 'type' }, 415);
      // The target folder must sit directly inside the Photo Inbox.
      const f = await drive(token, 'files/' + b.folderId + '?fields=parents,trashed');
      if (f.trashed || !(f.parents || []).includes(cfg.inbox_id)) return json({ error: 'folder' }, 400);

      const r = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'content-type': 'application/json; charset=UTF-8',
          'X-Upload-Content-Type': type || 'application/octet-stream',
          'X-Upload-Content-Length': String(size),
          Origin: origin, // lets the sender's browser PUT to the returned link
        },
        body: JSON.stringify({ name, parents: [b.folderId] }),
      });
      const loc = r.headers.get('location');
      if (!r.ok || !loc) { console.error('session', r.status, await r.text()); return json({ error: 'session' }, 502); }
      return json({ uploadUrl: loc });
    }
    return json({ error: 'action' }, 400);
  } catch (e) {
    console.error(String(e));
    return json({ error: 'drive' }, 502);
  }
};

export const config = { path: '/photo-upload', method: 'POST' };
