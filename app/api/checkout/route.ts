import { NextResponse } from 'next/server';

// Manual-payment checkout: validates the cart + shipping payload
// and returns a generated order reference. No live processor.
// Customer is shown wire / cashier's check instructions on the
// success page using the admin-configured payment settings.
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
    if (!['wire', 'check'].includes(body?.paymentMethod)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid payment method.' },
        { status: 400 },
      );
    }

    // Simulated reservation latency
    await new Promise((r) => setTimeout(r, 700));

    const orderId =
      'WT-' +
      Date.now().toString(36).toUpperCase().slice(-6) +
      '-' +
      Math.floor(Math.random() * 9999).toString().padStart(4, '0');

    // TODO: persist order to a real database + email customer the
    // payment instructions. For now, the success page renders the
    // instructions client-side from localStorage-backed admin settings.

    return NextResponse.json({ ok: true, orderId, paymentMethod: body.paymentMethod });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Internal error placing order.' },
      { status: 500 },
    );
  }
}
