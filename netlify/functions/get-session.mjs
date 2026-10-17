// Returns the status of a Stripe Checkout session for /get-started/welcome.
// Only exposes status and the customer email, never the full session.
export default async (req) => {
  const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  const id = new URL(req.url).searchParams.get('session_id') || '';
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) return json({ error: 'bad id' }, 400);
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) return json({ error: 'not configured' }, 503);
  const r = await fetch('https://api.stripe.com/v1/checkout/sessions/' + id, {
    headers: { Authorization: 'Bearer ' + sk, 'Stripe-Version': '2024-06-20' },
  });
  if (!r.ok) return json({ error: 'not found' }, 404);
  const s = await r.json();
  return json({ status: s.status, paid: s.payment_status === 'paid', email: (s.customer_details && s.customer_details.email) || null });
};
