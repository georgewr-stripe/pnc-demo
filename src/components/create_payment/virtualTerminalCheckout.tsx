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
import Button from "../button";

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
    setLoading(true);
    const intent = await createMOTOPayment(
      data,
      account_id,
      confirmationToken.id
    );
    props.setIntent(intent);
    setLoading(false);
  }, [data, stripe, elements, account_id, props.setIntent]);

  return (
    <div className="flex flex-col">
      <Input
        title={"Amount"}
        value="$10.00"
        setValue={(amount) =>
          setData((prev) => ({
            ...prev,
            amount: formatAmount(amount as string),
          }))
        }
        valid={data.amount > 100}
        errorMessage={"Please enter an amount > $1"}
        type={"currency"}
        placeholder={"Enter amount"}
      />
      <PaymentElement className="pt-2 pb-2" />
      {loading ? (
        <Button text="Loading..." icon={RefreshCw} disabled={true} color="secondary" />
      ) : (
        <Button text="Submit" icon={ChevronRight} onClick={handleSubmit} color="secondary" />
      )}
    </div>
  );
};

export default VirtualTerminalCheckout;
