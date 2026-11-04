// One time setup: Spencer opens evovero.com/photo-connect, signs in as admin@evovero.com,
// clicks Allow, and the refresh token is saved to Netlify Blobs. It also creates the
// "Photo Inbox" folder in his Drive. Any other Google account is refused, so a stranger
// opening this link cannot redirect the uploads. Running it again just reconnects.
import { OWNER, SCOPES, INBOX_NAME, store, client, getConfig, createFolder, folderUrl } from '../lib/photo-drive.mjs';

const page = (title, msg, status = 200) => new Response(
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title>` +
  `<body style="font-family:system-ui,sans-serif;max-width:560px;margin:60px auto;padding:0 16px;line-height:1.5"><h1 style="font-size:1.5rem">${title}</h1><p>${msg}</p></body>`,
  { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });

export default async (req, context) => {
  const c = client();
  if (!c) return page('Not set up yet', 'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are missing from the Netlify environment variables.', 503);
  const url = new URL(req.url);
  const redirect = 'https://evovero.com/photo-connect'; // must match the URI registered in Google Cloud
  const code = url.searchParams.get('code');

  if (!code) {
    if (url.searchParams.get('error')) return page('Not connected', 'Google sign in was cancelled. Open this link again to retry.', 400);
    const state = crypto.randomUUID();
    context.cookies.set({ name: 'pc_state', value: state, path: '/photo-connect', httpOnly: true, secure: true, sameSite: 'Lax', maxAge: 600 });
    const auth = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    auth.search = new URLSearchParams({ client_id: c.id, redirect_uri: redirect, response_type: 'code', scope: SCOPES, access_type: 'offline', prompt: 'consent', login_hint: OWNER, state }).toString();
    return new Response(null, { status: 302, headers: { Location: auth.toString(), 'cache-control': 'no-store' } });
  }

  if (!url.searchParams.get('state') || url.searchParams.get('state') !== context.cookies.get('pc_state')) {
    return page('Link expired', 'Open evovero.com/photo-connect again and finish within 10 minutes.', 400);
  }
  context.cookies.delete({ name: 'pc_state', path: '/photo-connect' });

  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: c.id, client_secret: c.secret, redirect_uri: redirect, grant_type: 'authorization_code' }),
  });
  const t = await r.json();
  if (!r.ok || !t.refresh_token || !t.id_token) return page('Not connected', 'Google did not return a long term token. Open this link again.', 400);

  // id_token comes straight from Google's token endpoint over TLS, so its payload can be read as is.
  const claims = JSON.parse(Buffer.from(t.id_token.split('.')[1], 'base64url').toString('utf8'));
  if (String(claims.email || '').toLowerCase() !== OWNER || claims.email_verified !== true || claims.hd !== 'evovero.com') {
    return page('Wrong account', 'Only ' + OWNER + ' can connect the photo drop. Nothing was saved.', 403);
  }

  // Keep the existing inbox on reconnect, otherwise create it.
  const prev = await getConfig();
  let inbox = prev && prev.inbox_id;
  if (inbox) {
    const ok = await fetch('https://www.googleapis.com/drive/v3/files/' + inbox + '?fields=id,trashed', { headers: { Authorization: 'Bearer ' + t.access_token } });
    const j = ok.ok ? await ok.json() : null;
    if (!j || j.trashed) inbox = null;
  }
  if (!inbox) inbox = (await createFolder(t.access_token, INBOX_NAME)).id;

  await store().setJSON('google', { refresh_token: t.refresh_token, inbox_id: inbox, email: claims.email, connected_at: new Date().toISOString() });
  return page('Photo drop connected', `Uploads from evovero.com/photos now go to <a href="${folderUrl(inbox)}">${INBOX_NAME}</a> in your Google Drive. You can close this tab.`);
};

export const config = { path: '/photo-connect', method: 'GET' };
