"use server";

import { loadStripe } from "./stripe";

export async function createAccountSession(account_id: string) {
  const session = await loadStripe(
    "embedded_connect_beta=v2"
  ).accountSessions.create({
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
        features: {
          external_account_collection: false,
        },
      },
      account_management: {
        enabled: true,
        features: {
          external_account_collection: false,
        },
      },
      notification_banner: {
        enabled: true,
        features: {
          external_account_collection: false,
        },
      },
      payouts: {
        enabled: true,
        features: {
          instant_payouts: true,
          standard_payouts: true,
          edit_payout_schedule: true,
          external_account_collection: false,
        },
      },
      payment_method_settings: {
        enabled: true,
      },
    },
  });
  return { client_secret: session.client_secret };
}
