import Stripe from "stripe";

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!SECRET_KEY) {
  throw "Stripe Secret Key not defined!";
}

export const loadStripe = (beta: string = "unified_accounts_beta=v1") => {
  return new Stripe(SECRET_KEY, {
    // @ts-ignore
    apiVersion: `2024-04-10; ${beta};`,
  });
};

const stripe = loadStripe();
export default stripe;
