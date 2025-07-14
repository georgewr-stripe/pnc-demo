import React from "react";
import Modal from "../modal";
import { ChevronLeft, CreditCard, Link, Plus } from "lucide-react";
import PaymentLink from "./paymentLink";
import VirtualTerminal from "./virtualTerminal";
import Button from "../button";

const paymentTypes = {
  link: PaymentLink,
  terminal: VirtualTerminal,
};

const CreatePayment = () => {
  const [open, setOpen] = React.useState(false);

  const [paymentType, setPaymentType] =
    React.useState<keyof typeof paymentTypes>();

  const title = React.useMemo(() => {
    switch (paymentType) {
      case "link":
        return "Create a Payment Link";
      case "terminal":
        return "Collect a MOTO Payment";
      default:
        return "Create Payment";
    }
  }, [paymentType]);

  const paymentMethodElement = React.useMemo(() => {
    if (paymentType) {
      const PaymentType = paymentTypes[paymentType];
      return <PaymentType />;
    } else {
      return (
        <>
          <Button
            text="Payment Link"
            icon={Link}
            onClick={() => setPaymentType("link")}
          />
          <Button
            text="Virtual Terminal"
            icon={CreditCard}
            onClick={() => setPaymentType("terminal")}
          />
        </>
      );
    }
  }, [paymentType]);

  return (
    <>
      <div className="flex flex-row">
        <Button text={title} icon={Plus} onClick={() => setOpen(true)} />
      </div>
      <Modal open={open} setOpen={setOpen}>
        {paymentType ? (
          <ChevronLeft
            className="size-6 cursor-pointer fixed left-4 top-4 text-pnc-blue"
            onClick={() => setPaymentType(undefined)}
          />
        ) : (
          <></>
        )}

        <div className="flex flex-row justify-around">
          {paymentMethodElement}
        </div>
      </Modal>
    </>
  );
};

export default CreatePayment;
