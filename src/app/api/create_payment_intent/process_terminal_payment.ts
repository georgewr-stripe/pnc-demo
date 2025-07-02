"use server";

import stripe from "@/api/stripe";
import { ProcessTerminalPaymentProps } from "../types";

const processTerminalPayment = async (props: ProcessTerminalPaymentProps) => {
  const { account_id, terminal_id, amount } = props;
  const intent = await stripe.paymentIntents.create(
    {
      amount,
      currency: "usd",
      payment_method_types: ["card_present"],
    },
    {
      stripeAccount: account_id,
    }
  );
  console.log(props)
  const reader = await stripe.terminal.readers.processPaymentIntent(
    terminal_id,
    {
      payment_intent: intent.id,
    },
    { stripeAccount: account_id }
  );
};

export default processTerminalPayment;
