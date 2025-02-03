"use server";

import stripe from "@/api/stripe";
import { RegisterReaderProps } from "../types";

const getOrCreateLocation = async (account_id: string) => {
  const existing = await stripe.terminal.locations.list({
    stripeAccount: account_id,
  });
  if (existing.data.length) {
    return existing.data[0].id;
  } else {
    const location = await stripe.terminal.locations.create(
      {
        address: {
          line1: "10 Downing St",
          city: "London",
          postal_code: "SW1A 2AB",
          country: "GB",
        },
        display_name: "Main Shop",
      },
      { stripeAccount: account_id }
    );
    return location.id;
  }
};

const registerReader = async (props: RegisterReaderProps) => {
  const { account_id, ...data } = props;
  const reader = await stripe.terminal.readers.create(
    { location: await getOrCreateLocation(account_id), ...data },
    {
      stripeAccount: account_id,
    }
  );
  return reader;
};

export default registerReader;
