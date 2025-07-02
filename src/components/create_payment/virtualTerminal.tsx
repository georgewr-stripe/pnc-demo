"use client";

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import VirtualTerminalCheckout from "./virtualTerminalCheckout";
import { useAccountData } from "@/hooks/useAccountData";
import React from "react";
import Stripe from "stripe";
import { CircleCheckBig } from "lucide-react";

const VirtualTerminal = () => {
  const { account_id } = useAccountData();
  const [intent, setIntent] =
    React.useState<Stripe.Response<Stripe.PaymentIntent>>();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
    { stripeAccount: account_id }
  );

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    payment_method_types: ["card"],
    paymentMethodCreation: "manual",
    appearance: {
        variables: {
            fontFamily: 'Nunito Sans, sans-serif',
            colorPrimary: '#004990',
            borderRadius: '0px'
        }
    },
    fonts: [
        {
          family: "Nunito Sans",
          src: "url(https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap)",
          weight: "400",
        },
      ],
  };

  if (intent) {
    return (
      <div className="flex flex-col text-pnc-blue items-center gap-4">
        <CircleCheckBig className="size-8"/>
        <span className="text-lg">Payment Successful</span>
      </div>
    );
  } else {
    return (
      <Elements stripe={stripePromise} options={options}>
        <div className="flex flex-col gap-3">
          <VirtualTerminalCheckout setIntent={setIntent} />
        </div>
      </Elements>
    );
  }
};

export default VirtualTerminal;
