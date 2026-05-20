import { NextResponse } from 'next/server';

// NOTE: Demo checkout. Replace this body with a real Stripe (or
// Adorama partner) payment intent before going live. Inputs that
// arrive in `body` already include the full cart, computed totals,
// and shipping address.
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.items?.length) {
      return NextResponse.json(
        { ok: false, error: 'Cart is empty.' },
        { status: 400 },
      );
    }
    if (!body?.shipping?.email) {
      return NextResponse.json(
        { ok: false, error: 'Missing shipping email.' },
        { status: 400 },
      );
    }

    // TODO: hand off to Stripe / Adyen / payment provider here.
    // const session = await stripe.checkout.sessions.create({...})

    // Simulated processing latency
    await new Promise((r) => setTimeout(r, 900));

    const orderId =
      'WT-' +
      Date.now().toString(36).toUpperCase().slice(-6) +
      '-' +
      Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, '0');

    return NextResponse.json({ ok: true, orderId });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: 'Internal error placing order.' },
      { status: 500 },
    );
  }
}
