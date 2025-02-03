'use server'


import stripe from "@/api/stripe";
import { ConnectionTokenProps } from "../types";

const createConnectionToken = async (props: ConnectionTokenProps) => {
  const { account_id } = props;
  const { secret } = await stripe.terminal.connectionTokens.create({
    stripeAccount: account_id,
  });
  return secret;
};

export default createConnectionToken;
