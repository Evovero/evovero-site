// Creates a Stripe Embedded Checkout session for the $100/mo website offer on /get-started.
// Zero dependencies: talks to the Stripe API with fetch.
// Netlify environment variables (set in the Netlify UI, never in this repo):
//   STRIPE_SECRET_KEY       secret or restricted key (Checkout Sessions: write)
//   STRIPE_PUBLISHABLE_KEY  pk_test_... or pk_live_..., must be the same mode as the secret key
//   STRIPE_PRICE_ID         recurring price for Monthly Service ($100/mo)
//   STRIPE_SETUP_PRICE_ID   optional one time build fee price. Leave unset during a sale window.
export default async (req) => {
  const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  const { STRIPE_SECRET_KEY: sk, STRIPE_PUBLISHABLE_KEY: pk, STRIPE_PRICE_ID: price, STRIPE_SETUP_PRICE_ID: setup } = process.env;
  if (!sk || !pk || !price) return json({ error: 'Checkout is not configured yet' }, 503);

  let input = {};
  try { input = await req.json(); } catch (_) {}
  const clean = (v, n = 200) => String(v || '').trim().slice(0, n);
  const email = clean(input.email, 254);
  const business = clean(input.business, 255);

  const origin = new URL(req.url).origin;
  const p = new URLSearchParams();
  p.set('ui_mode', 'embedded');
  p.set('mode', 'subscription');
  p.set('line_items[0][price]', price);
  p.set('line_items[0][quantity]', '1');
  if (setup) { p.set('line_items[1][price]', setup); p.set('line_items[1][quantity]', '1'); }
  p.set('return_url', origin + '/get-started/welcome/?session_id={CHECKOUT_SESSION_ID}');
  p.set('phone_number_collection[enabled]', 'true');
  p.set('custom_fields[0][key]', 'businessname');
  p.set('custom_fields[0][label][type]', 'custom');
  p.set('custom_fields[0][label][custom]', 'Business name');
  p.set('custom_fields[0][type]', 'text');
  p.set('custom_fields[0][optional]', 'true');
  if (business) p.set('custom_fields[0][text][default_value]', business);
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) p.set('customer_email', email);
  p.set('metadata[source]', 'get-started');
  p.set('subscription_data[metadata][source]', 'get-started');
  if (business) { p.set('metadata[business]', business); p.set('subscription_data[metadata][business]', business); }

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + sk, 'Content-Type': 'application/x-www-form-urlencoded', 'Stripe-Version': '2024-06-20' },
    body: p,
  });
  const data = await r.json();
  if (!r.ok) {
    console.error('stripe error', r.status, data && data.error && data.error.message);
    return json({ error: 'Could not start checkout' }, 502);
  }
  return json({ clientSecret: data.client_secret, publishableKey: pk });
};
