export type PaymentMethodId = 'wire' | 'check';

export type PaymentSettings = {
  // Which methods are visible to customers
  enabled: Record<PaymentMethodId, boolean>;

  // Wire transfer bank details
  wire: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string;
    swift: string;
    bankAddress: string;
    referenceInstructions: string;
  };

  // Cashier's check mailing details
  check: {
    payableTo: string;
    mailingName: string;
    mailingAddress: string;
    mailingCity: string;
    mailingState: string;
    mailingZip: string;
    instructions: string;
  };

  // Customer support contact (shown on confirmation page)
  supportEmail: string;
  supportPhone: string;
};

// Default values shipped with the repo. The admin dashboard
// can override these locally via localStorage; for cross-device
// deployment, edit this file and commit to GitHub so all
// visitors see the new instructions.
export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  enabled: { wire: true, check: true },
  wire: {
    bankName: 'Chase Business Banking',
    accountName: 'WildTrail Gear LLC',
    accountNumber: '0000-0000-0000',
    routingNumber: '021000021',
    swift: 'CHASUS33',
    bankAddress: '270 Park Avenue, New York, NY 10017',
    referenceInstructions:
      'Include your order reference number (e.g. WT-XXXX-1234) in the wire memo so we can match the payment to your order.',
  },
  check: {
    payableTo: 'WildTrail Gear LLC',
    mailingName: 'WildTrail Gear · Order Fulfillment',
    mailingAddress: 'PO Box 0000',
    mailingCity: 'Dallas',
    mailingState: 'TX',
    mailingZip: '75201',
    instructions:
      'Write the order reference (e.g. WT-XXXX-1234) on the back of the check. Orders are reserved for 14 days awaiting receipt of payment.',
  },
  supportEmail: 'orders@wildtrailgear.store',
  supportPhone: '+1 (555) 000-0000',
};

export const PAYMENT_METHOD_LABEL: Record<PaymentMethodId, string> = {
  wire: 'Wire Transfer',
  check: "Cashier's Check",
};

export const PAYMENT_METHOD_DESCRIPTION: Record<PaymentMethodId, string> = {
  wire: 'Bank-to-bank wire transfer. Bank details delivered on order confirmation. Funds typically clear in 1-2 business days.',
  check: "Mail a cashier's check or bank money order. Order reserved for 14 days awaiting receipt.",
};
