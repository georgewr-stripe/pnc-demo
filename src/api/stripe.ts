import Stripe from "stripe";

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!SECRET_KEY) {
  throw "Stripe Secret Key not defined!";
}

export const loadStripe = () => {
  return new Stripe(SECRET_KEY, {
    // @ts-expect-error - Stripe API version is not typed
    apiVersion: `2024-04-10; `,
  });
};

const stripe = loadStripe();
export default stripe;
