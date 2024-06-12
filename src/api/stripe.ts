import Stripe from "stripe";

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!SECRET_KEY) {
  throw "Stripe Secret Key not defined!";
}

const stripe = new Stripe(SECRET_KEY, {
  // @ts-ignore
  apiVersion: `2024-04-10; unified_accounts_beta=v1`,
});
export default stripe;
