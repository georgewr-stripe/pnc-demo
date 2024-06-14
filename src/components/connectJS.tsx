"use client";

import { createAccountSession } from "@/api/account_session";
import { lloydsFont } from "@/app/font";
import { useAccountData } from "@/hooks/useAccountData";
import {
  StripeConnectInstance,
  loadConnectAndInitialize,
} from "@stripe/connect-js/pure";
import { ConnectComponentsProvider } from "@stripe/react-connect-js";
import React, { PropsWithChildren } from "react";

const ConnectJS = (props: PropsWithChildren) => {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  if (!PUBLIC_KEY) {
    throw "Stripe Public key not set";
  }

  const { account_id } = useAccountData();

  const fetchClientSecret = React.useCallback(async () => {
    if (account_id) {
      const { client_secret } = await createAccountSession(account_id);
      return client_secret;
    }
    return "";
  }, [account_id]);

  const cerateStripeConnectInstance = React.useCallback(() => {
    console.log(lloydsFont);
    return loadConnectAndInitialize({
      publishableKey: PUBLIC_KEY,
      fetchClientSecret,
      appearance: {
        variables: {
          colorPrimary: "#016A4D",
          buttonPrimaryColorBackground: "#77BA00",
          buttonPrimaryColorText: "#FFFFFF",
          borderRadius: "0px",
          fontFamily: "lloydsJack, sans-serif",
        },
      },
      fonts: [
        {
          family: "lloydsJack",
          src: "https://lloyds-demo.vercel.app/fonts/lloyds_bank_jack-regularWEB.ttf",
          weight: "400",
        },
      ],
    });
  }, [fetchClientSecret]);

  const [stripeConnectInstance, setStripeConnectInstance] =
    React.useState<StripeConnectInstance>();

  React.useEffect(() => {
    if (account_id) {
      setStripeConnectInstance(cerateStripeConnectInstance());
    }
  }, [fetchClientSecret]);

  if (!stripeConnectInstance) {
    return <span>Loading...</span>;
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      {props.children}
    </ConnectComponentsProvider>
  );
};

export default ConnectJS;
