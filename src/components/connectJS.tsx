"use client";

import { createAccountSession } from "@/api/account_session";
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
    return loadConnectAndInitialize({
      publishableKey: PUBLIC_KEY,
      fetchClientSecret,
      appearance: {
        variables: {
          colorPrimary: "#004990",
          buttonPrimaryColorBackground: "#0077B5",
          buttonPrimaryColorText: "#FFFFFF",
          borderRadius: "0px",
          fontFamily: "Nunito Sans, sans-serif",
        },
      },
      fonts: [
        {
          family: "Nunito Sans",
          src: "url(https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap)",
          weight: "400",
        },
      ],
    });
  }, [fetchClientSecret, PUBLIC_KEY]);

  const [stripeConnectInstance, setStripeConnectInstance] =
    React.useState<StripeConnectInstance>();

  React.useEffect(() => {
    if (account_id) {
      setStripeConnectInstance(cerateStripeConnectInstance());
    }
  }, [fetchClientSecret, account_id, setStripeConnectInstance]);

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
