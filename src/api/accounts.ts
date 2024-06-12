"use server";

import stripe from "./stripe";
import { CreateAccountProps } from "./types";

export async function createAccount(props: CreateAccountProps) {
  const account = await stripe.accounts.create({
    ...props.account,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    controller: {
      application: {
        loss_liable: false,
        onboarding_owner: false,
        pricing_controls: true,
      },
      dashboard: { type: "none" },
    },
    country: "GB",
  });

  const person = await stripe.accounts.createPerson(account.id, props.person);

  return { account_id: account.id };
}
