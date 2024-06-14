"use server";

import Stripe from "stripe";
import stripe from "./stripe";
import { PaymentLinkParams } from "./types";

const createPaymentLink = async (
  params: PaymentLinkParams,
  account_id: string
) => {
  const price = await stripe.prices.create(
    {
      currency: "gbp",
      product_data: {
        name: params.description,
      },
      unit_amount: params.amount,
    },
    { stripeAccount: account_id }
  );
  const link = await stripe.paymentLinks.create(
    {
      line_items: [{ price: price.id, quantity: params.quantity }],
      currency: "gbp",
    },
    {
      stripeAccount: account_id,
    }
  );
  return link;
};

export default createPaymentLink;
