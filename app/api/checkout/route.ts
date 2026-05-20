import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PRODUCTS } from '@/lib/products';
import {
  buildOrderEmailHtml,
  buildOrderEmailSubject,
  type EmailLineItem,
  type EmailTotals,
} from '@/lib/email';
import { DEFAULT_PAYMENT_SETTINGS, type PaymentMethodId } from '@/lib/payment-settings';

export const runtime = 'nodejs';

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
    const paymentMethod: PaymentMethodId = body?.paymentMethod;
    if (!['wire', 'check'].includes(paymentMethod)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid payment method.' },
        { status: 400 },
      );
    }

    const orderId =
      'WT-' +
      Date.now().toString(36).toUpperCase().slice(-6) +
      '-' +
      Math.floor(Math.random() * 9999).toString().padStart(4, '0');

    // Resolve line items server-side from the canonical PRODUCTS list
    // so the buyer can't tamper with prices in the email or order log.
    const lines: EmailLineItem[] = body.items
      .map((i: { productId: string; qty: number }) => {
        const p = PRODUCTS.find((x) => x.id === i.productId);
        if (!p) return null;
        return {
          name: p.name,
          qty: i.qty,
          unitPrice: p.price,
          subtotal: p.price * i.qty,
        } satisfies EmailLineItem;
      })
      .filter(Boolean);

    const subtotal = lines.reduce((s, l) => s + l.subtotal, 0);
    const tax = +(subtotal * 0.085).toFixed(2);
    const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 49;
    const hasHighTicket = lines.some((l) => l.unitPrice >= 2000);
    const protection = hasHighTicket ? 79 : 0;
    const total = +(subtotal + tax + shipping + protection).toFixed(2);
    const totals: EmailTotals = { subtotal, tax, shipping, protection, total };

    const html = buildOrderEmailHtml({
      orderId,
      paymentMethod,
      shipping: body.shipping,
      lines,
      totals,
      settings: DEFAULT_PAYMENT_SETTINGS,
    });
    const subject = buildOrderEmailSubject(orderId, paymentMethod);

    let emailDelivered = false;
    let emailError: string | undefined;

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = process.env.RESEND_FROM || 'WildTrail Gear <orders@resend.dev>';
        const adminCc = process.env.RESEND_ADMIN_CC;

        await resend.emails.send({
          from,
          to: body.shipping.email,
          ...(adminCc ? { bcc: adminCc } : {}),
          replyTo: DEFAULT_PAYMENT_SETTINGS.supportEmail,
          subject,
          html,
        });
        emailDelivered = true;
      } catch (err: any) {
        emailError = err?.message || 'Email delivery failed';
        console.error('Resend error:', emailError);
      }
    } else {
      emailError = 'RESEND_API_KEY env var not configured — skipping email send.';
      console.warn(emailError);
    }

    return NextResponse.json({
      ok: true,
      orderId,
      paymentMethod,
      emailDelivered,
      emailError,
    });
  } catch (err: any) {
    console.error('Checkout error:', err?.message);
    return NextResponse.json(
      { ok: false, error: 'Internal error placing order.' },
      { status: 500 },
    );
  }
}
