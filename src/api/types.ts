"use client";

import Stripe from "stripe";

export type CreateAccountProps = {
  account: Omit<
    Stripe.AccountCreateParams,
    "capabilities" | "controller" | "country"
  >;
  person: Stripe.AccountCreatePersonParams;
};

export interface PaymentLinkParams {
  amount: number;
  description: string;
  quantity: number;
}
