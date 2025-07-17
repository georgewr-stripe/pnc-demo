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
      losses: {payments: 'stripe'},
      fees: {payer: 'application'},
      requirement_collection: 'stripe',
      stripe_dashboard: {type: 'none'}
    },
    country: "US",
  });

  await stripe.accounts.createPerson(account.id, props.person);

  return { account_id: account.id };
}
