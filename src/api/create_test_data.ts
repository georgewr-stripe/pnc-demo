"use server";

import Stripe from "stripe";
import stripe from "./stripe";
import { NAMES } from "./random_data";

const randomPrice = () => {
  return Math.floor(Math.random() * (50000 - 250 + 1) + 250);
};

const randomSelection = <T extends any>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

const cardTokens = [
  "pm_card_gb",
  "pm_card_gb_debit",
  "pm_card_gb_mastercard",
  "pm_card_amex",
];

const disputeToken = "pm_card_createDispute";
const bypassBalanceToken = "pm_card_bypassPending";

const topUpAmount = 1000000;
const payoutAmounts = [454545, 24785, 5295];

const create_customers = async (account_id: string) => {
  const promises = NAMES.map((name) =>
    stripe.customers.create(
      {
        name: `${name.firstName} ${name.lastName}`,
        email: `${name.firstName.toLocaleLowerCase()}@${name.lastName.toLocaleLowerCase()}.co.uk`,
      },
      { stripeAccount: account_id }
    )
  );
  const customers = await Promise.all(promises);
  return customers.map((c) => c.id);
};

const _createPayment = (
  account_id: string,
  customers: string[],
  amount: number,
  payment_method: string
) => {
  return stripe.paymentIntents.create(
    {
      amount,
      payment_method,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      currency: "gbp",
      customer: randomSelection(customers),
      confirm: true,
    },
    { stripeAccount: account_id }
  );
};

const createPayments = async (account_id: string, customers: string[]) => {
  // Create the "top up"
  await _createPayment(account_id, customers, topUpAmount, bypassBalanceToken);

  // Create the "real" payments
  let payments = Array.from({ length: 20 }, () =>
    _createPayment(
      account_id,
      customers,
      randomPrice(),
      randomSelection(cardTokens)
    )
  );

  payments = payments.concat(
    ...Array.from({ length: 3 }, () =>
      _createPayment(account_id, customers, randomPrice(), disputeToken)
    )
  );

  await Promise.all(payments);
};

const createPayouts = async (account_id: string) => {
  const balance = await stripe.balance.retrieve({ stripeAccount: account_id });
  console.log(balance.available);
  await Promise.all(
    payoutAmounts.map((amount) =>
      stripe.payouts.create(
        {
          amount: amount,
          currency: "gbp",
        },
        { stripeAccount: account_id }
      )
    )
  );
};

const createTestData = async (account_id: string) => {
  try {
    const customers = await create_customers(account_id);
    const dataLoaders = [
      createPayments(account_id, customers),
      createPayouts(account_id),
    ];
    await Promise.all(dataLoaders);
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

export default createTestData;
