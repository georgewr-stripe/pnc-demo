"use server";

import stripe from "./stripe";

const listReaders = async () => {
  const readers = [];

  for await (const reader of stripe.terminal.readers.list()) {
    readers.push(reader);
  }
  if (readers.length == 0) {
    
  }
  return readers;
};

export default listReaders;
