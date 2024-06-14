"use server";

import stripe from "./stripe";
import { MOTOPaymentParams } from "./types";

const createMOTOPayment = async (
  params: MOTOPaymentParams,
  account_id: string,
  confirmation_token: string
) => {
  const pi = await stripe.paymentIntents.create(
    {
      amount: params.amount,
      currency: "gbp",
      payment_method_types: ["card"],
    //   payment_method_options: {
    //     card: {
    //       moto: true,
    //     },
    //   },
      confirm: true,
      confirmation_token: confirmation_token,
    },
    { stripeAccount: account_id }
  );
  return pi;
};

export default createMOTOPayment;
