"use server";

import { loadStripe } from "./stripe";

export async function createAccountSession(account_id: string) {
  const session = await loadStripe().accountSessions.create({
  // "embedded_connect_beta=v2"
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
      //   payment_method_settings: {
      //     enabled: true,
      //   },
    },
  });
  return { client_secret: session.client_secret };
}
