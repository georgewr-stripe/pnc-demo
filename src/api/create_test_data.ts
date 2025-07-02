"use server";

import stripe from "./stripe";
import { NAMES } from "./random_data";

const randomPrice = () => {
  return Math.floor(Math.random() * (50000 - 250 + 1) + 250);
};

const randomSelection = <T extends any>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

const cardTokens = [
  "pm_card_visa",
  "pm_card_visa_debit",
  "pm_card_mastercard",
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
        email: `${name.firstName.toLocaleLowerCase()}@${name.lastName.toLocaleLowerCase()}.com`,
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
      currency: "usd",
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

const getBalance = async (account_id: string) => {
  const balance = await stripe.balance.retrieve({ stripeAccount: account_id });
  return balance.available.find((b) => b.currency == "usd")?.amount || 0;
};

const sleep = (time: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

const createPayouts = async (account_id: string) => {
  let balanceAvailable = false;
  let noLoops = 0;
  const maxLoops = 10;
  const sleepTime = 1000;
  const payoutTotal = payoutAmounts.reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  while (!balanceAvailable && noLoops <= maxLoops) {
    const balance = await getBalance(account_id);
    balanceAvailable = balance >= payoutTotal;
    // console.log("balance: ", balance);
    // console.log("balanceAvailable: ", balanceAvailable);
    if (!balanceAvailable) {
      await sleep(sleepTime);
    }
    noLoops += 1;
  }

  await Promise.all(
    payoutAmounts.map((amount) =>
      stripe.payouts.create(
        {
          amount: amount,
          currency: "usd",
        },
        { stripeAccount: account_id }
      )
    )
  );
};

const setBranding = async (account_id: string) => {
  // const filePath = path.join(process.cwd(), "public/black_horse_feed_logo.png");
  // const fp = await fs.readFile(filePath);
  let req = await fetch(
    "https://lloyds-demo.vercel.app/black_horse_feed_logo.png"
  );
  let fp = Buffer.from(await req.arrayBuffer());
  let upload = await stripe.files.create({
    file: {
      data: fp,
      name: "black_horse_feed_logo.jpg",
      type: "application.octet-stream",
    },
    purpose: "business_logo",
  });
  await stripe.accounts.update(account_id, {
    settings: {
      branding: {
        logo: upload.id,
        primary_color: "#004990",
        secondary_color: "#0077B5",
      },
    },
  });

  // Create S700 Screen
  req = await fetch("https://lloyds-demo.vercel.app/lbg-s700-green.png");
  fp = Buffer.from(await req.arrayBuffer());
  upload = await stripe.files.create({
    file: {
      data: fp,
      name: "lbg-s700-green.png",
      type: "application.octet-stream",
    },
    purpose: "terminal_reader_splashscreen",
  });
  const configs = await stripe.terminal.configurations.list({
    stripeAccount: account_id,
  });
  const config_id = configs.data.find((d) => d.is_account_default)?.id;
  if (config_id) {
    await stripe.terminal.configurations.update(
      config_id,
      { stripe_s700: { splashscreen: upload.id } },
      { stripeAccount: account_id }
    );
  } else {
    await stripe.terminal.configurations.create(
      {
        stripe_s700: {
          splashscreen: upload.id,
        },
      },
      { stripeAccount: account_id }
    );
  }
};

const createTestData = async (account_id: string) => {
  try {
    const customers = await create_customers(account_id);
    const dataLoaders = [
      createPayments(account_id, customers),
      createPayouts(account_id),
      setBranding(account_id),
    ];
    await Promise.all(dataLoaders);
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

export default createTestData;
