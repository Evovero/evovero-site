// Shared Google Drive plumbing for the photo drop (evovero.com/photos).
// The Google refresh token lives in Netlify Blobs (store "photo-drop", key "google"),
// written once by /photo-connect when Spencer clicks Allow. The OAuth client ID and
// secret are Netlify env vars. Scope is drive.file: this app can only see the folders
// and files it created itself (the Photo Inbox), never the rest of Spencer's Drive.
import { getStore } from '@netlify/blobs';

export const OWNER = 'admin@evovero.com';
export const SCOPES = 'openid email https://www.googleapis.com/auth/drive.file';
export const INBOX_NAME = 'Photo Inbox';

export const store = () => getStore({ name: 'photo-drop', consistency: 'strong' });

export function client() {
  const id = Netlify.env.get('GOOGLE_CLIENT_ID');
  const secret = Netlify.env.get('GOOGLE_CLIENT_SECRET');
  return id && secret ? { id, secret } : null;
}

export async function getConfig() {
  return store().get('google', { type: 'json' });
}

let cached = { token: null, exp: 0 };

// Fresh access token from the stored refresh token, cached per warm instance.
export async function accessToken(cfg) {
  if (cached.token && Date.now() < cached.exp - 60000) return cached.token;
  const c = client();
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: c.id, client_secret: c.secret, refresh_token: cfg.refresh_token, grant_type: 'refresh_token' }),
  });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error('token refresh failed: ' + (j.error || r.status));
  cached = { token: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 };
  return cached.token;
}

export async function drive(token, path, init = {}) {
  const r = await fetch('https://www.googleapis.com/drive/v3/' + path, {
    ...init,
    headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json', ...(init.headers || {}) },
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error('drive ' + path.split('?')[0] + ' ' + r.status + ' ' + JSON.stringify(j.error || j).slice(0, 200));
  return j;
}

export async function createFolder(token, name, parent) {
  const body = { name, mimeType: 'application/vnd.google-apps.folder' };
  if (parent) body.parents = [parent];
  return drive(token, 'files?fields=id,webViewLink', { method: 'POST', body: JSON.stringify(body) });
}

export const folderUrl = (id) => 'https://drive.google.com/drive/folders/' + id;
