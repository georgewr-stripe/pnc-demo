import React from "react";
import Input from "../input";
import Stripe from "stripe";
import { useAccountData } from "@/hooks/useAccountData";
import { PaymentLinkParams } from "@/api/types";
import { ChevronRight, ExternalLink, RefreshCw } from "lucide-react";
import createPaymentLink from "@/api/create_payment_link";

const PaymentLink = () => {
  const [data, setData] = React.useState<PaymentLinkParams>({
    amount: 1000,
    description: "",
    quantity: 1,
  });

  const [loading, setLoading] = React.useState(false);
  const [link, setLink] = React.useState<Stripe.Response<Stripe.PaymentLink>>();

  const [valid, setValid] = React.useState({
    amount: true,
    description: true,
    quantity: true,
  });

  const { account_id } = useAccountData();

  React.useEffect(() => {
    setValid({
      amount: data.amount > 100,
      description: data.description.length > 1,
      quantity: data.quantity >= 1,
    });
  }, [data]);

  const formatAmount = (v: string) => {
    return Math.floor(Number(v.replace(/[^0-9.-]+/g, "")) * 100);
  };

  const handleSubmit = React.useCallback(async () => {
    if (!loading && Object.values(data).every(Boolean) && account_id) {
      setLoading(true);
      const link = await createPaymentLink(data, account_id);
      console.log(link);
      setLink(link);
    }
  }, [data, account_id]);

  React.useEffect(() => {
    setLoading(!!link);
  }, [link]);

  return (
    <div className="py-4">
      {link ? (
        <div className="bg-pnc-orange cursor-pointer p-3">
          <a
            className="text-white flex flex-row justify-between w-full gap-3 items-center"
            href={link.url}
            target="_blank"
          >
            <pre>{link.url}</pre>
            <ExternalLink className="size-5" />
          </a>
        </div>
      ) : (
        <>
          <Input
              title="Amount"
              value={"10.00"}
              setValue={(amount) => setData((p) => ({ ...p, amount: formatAmount(amount) }))}
              valid={valid.amount}
              errorMessage="Enter an amount > $1"
              type={"currency"} />

          <Input
              title="Description"
              value={data.description}
              type="text"
              setValue={(description) => setData((p) => ({ ...p, description }))}
              valid={valid.description}
              errorMessage="Please add a description"     />

          <Input
            title="Quantity"
            value={data.quantity.toString()}
            setValue={(quantity) =>
              setData((p) => ({ ...p, quantity: parseInt(quantity) }))
            }
            valid={valid.quantity}
            errorMessage="Enter at least 1"
            type={"number"}
          />
          <div
            className="bg-pnc-orange p-2 text-white mt-4 cursor-pointer"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex flex-row gap-3 justify-between">
                <span>Loading...</span>
                <RefreshCw className="animate-spin" />
              </div>
            ) : (
              <div className="flex flex-row gap-3 justify-between">
                <span>Create Link</span>
                <ChevronRight />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentLink;
