import React from "react";
import Modal from "../modal";
import { ChevronLeft, CreditCard, Link, Plus } from "lucide-react";
import PaymentLink from "./paymentLink";
import VirtualTerminal from "./virtualTerminal";

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
          <div
            className="flex flex-row justify-between items-center bg-pnc-orange p-2"
            onClick={() => setPaymentType("link")}
          >
            <span className="text-white mr-2 cursor-pointer">Payment Link</span>
            <Link className="text-white size-4" />
          </div>
          <div
            className="flex flex-row justify-between items-center bg-pnc-orange p-2"
            onClick={() => setPaymentType("terminal")}
          >
            <span className="text-white mr-2 cursor-pointer">Virtual Terminal</span>
            <CreditCard className="text-white size-4" />
          </div>
        </>
      );
    }
  }, [paymentType]);

  return (
    <>
      <div className="flex flex-row-reverse w-full">
        <div
          className="flex flex-row justify-between items-center bg-pnc-orange p-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-white mr-2">{title}</span>
          <Plus className="text-white size-5" />
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} title={title}>
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
