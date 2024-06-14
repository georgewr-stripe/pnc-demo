"use client";

import { MOTOPaymentParams } from "@/api/types";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import Input from "../input";
import createMOTOPayment from "@/api/create_moto_payment";
import { useAccountData } from "@/hooks/useAccountData";
import { ChevronRight, RefreshCw } from "lucide-react";
import Stripe from "stripe";

interface VTCProps {
  setIntent: React.Dispatch<
    React.SetStateAction<Stripe.Response<Stripe.PaymentIntent> | undefined>
  >;
}

const VirtualTerminalCheckout = (props: VTCProps) => {
  const { account_id } = useAccountData();

  const [data, setData] = React.useState<MOTOPaymentParams>({ amount: 1000 });

  const formatAmount = (v: string) => {
    return Math.floor(Number(v.replace(/[^0-9.-]+/g, "")) * 100);
  };

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    if (!stripe || !elements || data.amount < 100 || !account_id) {
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log(submitError);
      return;
    }

    const { error, confirmationToken } = await stripe.createConfirmationToken({
      elements,
    });
    if (error) {
      console.log(error);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret
    const intent = await createMOTOPayment(
      data,
      account_id,
      confirmationToken.id
    );
    props.setIntent(intent);
    setLoading(false);
  }, [data, stripe, elements]);

  return (
    <div className="flex flex-col">
      <Input
        title={"Amount"}
        value="£10.00"
        setValue={(amount) =>
          setData((prev) => ({ ...prev, amount: formatAmount(amount) }))
        }
        valid={data.amount > 100}
        errorMessage={"Please enter an amount > £1"}
        type={"currency"}
      />
      <PaymentElement className="pt-2" />
      {loading ? (
        <div className="flex flex-row gap-3 justify-between bg-lloyds-light-green text-white p-3 mt-2">
          <span>Loading...</span>
          <RefreshCw className="animate-spin" />
        </div>
      ) : (
        <div
          className="flex flex-row gap-3 justify-between bg-lloyds-light-green text-white p-3 mt-2"
          onClick={handleSubmit}
        >
          <span className="cursor-pointer">Submit</span>
          <ChevronRight />
        </div>
      )}
    </div>
  );
};

export default VirtualTerminalCheckout;
