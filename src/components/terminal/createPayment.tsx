"use client";

import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import Modal from "../modal";
import Input from "../input";
import React from "react";
import { useAccountData } from "@/hooks/useAccountData";
import processTerminalPayment from "@/app/api/create_payment_intent/process_terminal_payment";

interface CreateTerminalPaymentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readerID: string;
}

const formatAmount = (v: string) => {
  return Math.floor(Number(v.replace(/[^0-9.-]+/g, "")) * 100);
};

const CreateTerminalPayment = (props: CreateTerminalPaymentProps) => {
  const { account_id } = useAccountData();
  const { open, setOpen, readerID } = props;
  const [amount, setAmount] = React.useState(1000);
  const [loading, setLoading] = React.useState(false);

  const createPayment = React.useCallback(async () => {
    if (amount && account_id) {
      setLoading(true);
      await processTerminalPayment({
        amount,
        terminal_id: readerID,
        account_id,
      });
      setOpen(false);
    }
  }, [amount, account_id, readerID, setOpen]);

  React.useCallback(() => setLoading(open ? false : false), [open, setLoading]);

  return (
    <Modal open={open} setOpen={setOpen} title="Collect a Payment">
      <ChevronLeft
        className="size-6 cursor-pointer fixed left-4 top-4 text-lloyds-green"
        onClick={() => setOpen(false)}
      />

      <div className="flex flex-row justify-around w-full">
        <Input
          type="currency"
          value={"10.00"}
          setValue={(v) => setAmount(formatAmount(v as string))}
          title="Amount"
          valid={amount > 100}
          errorMessage="Please enter an amount"
        />
      </div>
      <div
        className="bg-lloyds-light-green p-2 text-white mt-4 cursor-pointer"
        onClick={createPayment}
      >
        {loading ? (
          <div className="flex flex-row gap-3 justify-between">
            <span>Loading...</span>
            <RefreshCw className="animate-spin" />
          </div>
        ) : (
          <div className="flex flex-row gap-3 justify-between">
            <span>Send to Terminal</span>
            <ChevronRight />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateTerminalPayment;
