import Stripe from "stripe";

interface AccountIDProps {
  account_id: string;
}

export type RegisterReaderProps = Stripe.Terminal.ReaderCreateParams &
  AccountIDProps;
export type ConnectionTokenProps = AccountIDProps;
export type CreatePaymentIntentProps = Stripe.PaymentIntentCreateParams &
  AccountIDProps;

  export interface ProcessTerminalPaymentProps extends AccountIDProps {
    amount: number,
    terminal_id: string
  }
