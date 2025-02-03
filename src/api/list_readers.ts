"use server";

import stripe from "./stripe";

const listReaders = async (account_id: string) => {
  const readers = [];

  for await (const reader of stripe.terminal.readers.list({
    stripeAccount: account_id,
  })) {
    readers.push(reader);
  }
  if (readers.length == 0) {
  }
  return readers;
};

export default listReaders;
