import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const VirtualTerminal = () => {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1099,
    currency: "gbp",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="flex flex-col gap-3">
        <PaymentElement />
        <div className="bg-lloyds-light-green text-white p-3">
          <span>Submit</span>
        </div>
      </div>
    </Elements>
  );
};

export default VirtualTerminal;
