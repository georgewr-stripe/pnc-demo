"use server";

import stripe from "./stripe";

export async function createAccountSession(account_id: string) {
  const session = await stripe.accountSessions.create({
    account: account_id,
    components: {
      payments: {
        enabled: true,
        features: {
          refund_management: true,
          dispute_management: true,
          capture_payments: true,
        },
      },
      account_onboarding: {
        enabled: true,
      },
      account_management: {
        enabled: true,
      },
      notification_banner: {
        enabled: true,
      },
      payouts: {
        enabled: true,
        features: {
          instant_payouts: true,
          standard_payouts: true,
          edit_payout_schedule: true,
        },
      },
    },
  });
  return { client_secret: session.client_secret };
}
