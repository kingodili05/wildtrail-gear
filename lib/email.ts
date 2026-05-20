import { DEFAULT_PAYMENT_SETTINGS, type PaymentMethodId, type PaymentSettings } from './payment-settings';

export type EmailLineItem = {
  name: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
};

export type EmailTotals = {
  subtotal: number;
  tax: number;
  shipping: number;
  protection: number;
  total: number;
};

export type OrderEmailInput = {
  orderId: string;
  paymentMethod: PaymentMethodId;
  shipping: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone?: string;
  };
  lines: EmailLineItem[];
  totals: EmailTotals;
  settings?: PaymentSettings;
};

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildOrderEmailHtml(input: OrderEmailInput): string {
  const s = input.settings ?? DEFAULT_PAYMENT_SETTINGS;
  const name = `${input.shipping.firstName} ${input.shipping.lastName}`.trim();

  const itemsRows = input.lines
    .map(
      (l) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e2e0d6;font-family:sans-serif;color:#14140F">
          <div style="font-weight:700">${escape(l.name)}</div>
          <div style="color:#67675E;font-size:13px">Qty ${l.qty} · ${money(l.unitPrice)} each</div>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #e2e0d6;font-family:sans-serif;color:#14140F;text-align:right;white-space:nowrap;font-weight:600">
          ${money(l.subtotal)}
        </td>
      </tr>`,
    )
    .join('');

  const paymentBlock =
    input.paymentMethod === 'wire'
      ? `
    <h3 style="font-family:sans-serif;color:#050A1F;font-size:14px;letter-spacing:2px;text-transform:uppercase;margin:32px 0 12px">Wire Transfer Instructions</h3>
    <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;color:#14140F">
      ${row('Bank Name', s.wire.bankName)}
      ${row('Account Name', s.wire.accountName)}
      ${row('Account Number', s.wire.accountNumber)}
      ${row('Routing (ABA)', s.wire.routingNumber)}
      ${row('SWIFT / BIC', s.wire.swift)}
      ${row('Bank Address', s.wire.bankAddress)}
      ${row('Wire Memo', `<strong style="color:#BF252D">${escape(input.orderId)}</strong>`)}
    </table>
    <p style="font-family:sans-serif;color:#67675E;font-size:13px;line-height:1.6;margin:16px 0 0">
      ${escape(s.wire.referenceInstructions)}
    </p>`
      : `
    <h3 style="font-family:sans-serif;color:#050A1F;font-size:14px;letter-spacing:2px;text-transform:uppercase;margin:32px 0 12px">Cashier's Check Instructions</h3>
    <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;color:#14140F">
      ${row('Payable To', s.check.payableTo)}
      ${row('Mail To', s.check.mailingName)}
      ${row('Address', s.check.mailingAddress)}
      ${row(
        'City / State / ZIP',
        `${escape(s.check.mailingCity)}, ${escape(s.check.mailingState)} ${escape(s.check.mailingZip)}`,
      )}
      ${row('Back-of-Check Memo', `<strong style="color:#BF252D">${escape(input.orderId)}</strong>`)}
    </table>
    <p style="font-family:sans-serif;color:#67675E;font-size:13px;line-height:1.6;margin:16px 0 0">
      ${escape(s.check.instructions)}
    </p>`;

  return `
<!doctype html>
<html>
<body style="margin:0;background:#FAFAF7">
  <div style="max-width:600px;margin:0 auto;padding:24px;background:#FAFAF7">
    <div style="text-align:center;padding:32px 0">
      <div style="display:inline-block;background:#050A1F;padding:14px 24px;color:#FAFAF7;font-family:sans-serif;font-weight:800;letter-spacing:2px;font-size:14px">
        WILDTRAIL<span style="color:#DD2A2A">GEAR</span>
      </div>
    </div>

    <h1 style="font-family:sans-serif;color:#050A1F;text-transform:uppercase;letter-spacing:1px;font-size:28px;margin:0 0 8px;text-align:center">
      Order Confirmed
    </h1>
    <p style="font-family:sans-serif;color:#67675E;text-align:center;margin:0 0 24px;font-size:14px;line-height:1.6">
      ${escape(name)}, your order is reserved. Send payment using the details below.
      We ship within 2 business days of the payment clearing.
    </p>

    <div style="background:#050A1F;color:#FAFAF7;text-align:center;padding:16px;margin:24px 0;font-family:sans-serif">
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B5B5AC;margin-bottom:4px">
        Order Reference
      </div>
      <div style="font-size:24px;font-weight:700;letter-spacing:1px">${escape(input.orderId)}</div>
    </div>

    <h3 style="font-family:sans-serif;color:#050A1F;font-size:14px;letter-spacing:2px;text-transform:uppercase;margin:24px 0 8px">Items</h3>
    <table style="width:100%;border-collapse:collapse">
      ${itemsRows}
    </table>

    <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;color:#14140F;margin-top:8px">
      ${totalsRow('Subtotal', money(input.totals.subtotal))}
      ${totalsRow('Tax (8.5%)', money(input.totals.tax))}
      ${totalsRow('Shipping', input.totals.shipping === 0 ? 'Included' : money(input.totals.shipping))}
      ${input.totals.protection > 0 ? totalsRow('High-Ticket Protection', money(input.totals.protection)) : ''}
      <tr>
        <td style="padding:14px 0;border-top:2px solid #050A1F;font-weight:700;text-transform:uppercase;letter-spacing:1px;font-size:13px">Total</td>
        <td style="padding:14px 0;border-top:2px solid #050A1F;font-weight:800;font-size:20px;text-align:right">${money(input.totals.total)}</td>
      </tr>
    </table>

    ${paymentBlock}

    <h3 style="font-family:sans-serif;color:#050A1F;font-size:14px;letter-spacing:2px;text-transform:uppercase;margin:32px 0 12px">Shipping To</h3>
    <p style="font-family:sans-serif;color:#14140F;font-size:14px;line-height:1.6;margin:0">
      ${escape(name)}<br/>
      ${escape(input.shipping.address)}<br/>
      ${escape(input.shipping.city)}, ${escape(input.shipping.state)} ${escape(input.shipping.zip)}<br/>
      ${escape(input.shipping.country)}
    </p>

    <div style="margin-top:36px;padding:16px;background:#050A1F;color:#FAFAF7;font-family:sans-serif;font-size:13px;line-height:1.6">
      <div style="color:#DD2A2A;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px">Need help?</div>
      Email <a href="mailto:${escape(s.supportEmail)}" style="color:#FAFAF7">${escape(s.supportEmail)}</a><br/>
      Phone <a href="tel:${escape(s.supportPhone)}" style="color:#FAFAF7">${escape(s.supportPhone)}</a>
    </div>

    <p style="font-family:sans-serif;color:#8A8A80;font-size:11px;text-align:center;margin-top:24px">
      © 2026 WildTrail Gear · All rights reserved
    </p>
  </div>
</body>
</html>`;
}

export function buildOrderEmailSubject(orderId: string, paymentMethod: PaymentMethodId): string {
  const m = paymentMethod === 'wire' ? 'Wire' : "Cashier's Check";
  return `WildTrail Gear · Order ${orderId} confirmed (${m} payment instructions)`;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #e2e0d6;color:#67675E;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;width:40%">${escape(label)}</td>
      <td style="padding:8px 0;border-bottom:1px solid #e2e0d6;font-weight:600">${value}</td>
    </tr>`;
}

function totalsRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 0;color:#67675E">${escape(label)}</td>
      <td style="padding:6px 0;text-align:right;font-weight:600">${escape(value)}</td>
    </tr>`;
}
