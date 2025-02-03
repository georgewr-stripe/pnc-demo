import stripe from "@/api/stripe";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

interface CreatePaymentIntentParams extends Stripe.PaymentIntentCreateParams {
  account_id: string;
}
export async function POST(request: Request) {
  const { account_id, ...data }: CreatePaymentIntentParams =
    await request.json();
  const { id, client_secret } = await stripe.paymentIntents.create(data, {
    stripeAccount: account_id,
  });
  return Response.json({ intent: id, secret: client_secret });
}
