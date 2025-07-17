'use client'


import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import Modal from "../modal";
import Input from "../input";
import React from "react";
import { useAccountData } from "@/hooks/useAccountData";
import registerReader from "@/app/api/register_reader/register_reader";

interface AddReaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddReader = (props: AddReaderProps) => {
  const { account_id } = useAccountData();
  const { open, setOpen } = props;
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const addReader = React.useCallback(async () => {
    if (code && account_id) {
      setLoading(true);
      await registerReader({
        account_id,
        registration_code: code,
      });
      setOpen(false);
    }
  }, [code, account_id, setOpen]);

  React.useCallback(() => setLoading(open ? false : false), [open, setLoading]);

  return (
    <Modal open={open} setOpen={setOpen} title="Add a Reader">
      <ChevronLeft
        className="size-6 cursor-pointer fixed left-4 top-4 text-lloyds-green"
        onClick={() => setOpen(false)}
      />

      <div className="flex flex-row justify-around w-full">
        <Input
          type="text"
          value={code}
          setValue={(value) => setCode(value as string)}
          title="Pairing Code"
          valid={true}
          errorMessage="Code not valid"
        />
      </div>
      <div
        className="bg-lloyds-light-green p-2 text-white mt-4 cursor-pointer"
        onClick={addReader}
      >
        {loading ? (
          <div className="flex flex-row gap-3 justify-between">
            <span>Loading...</span>
            <RefreshCw className="animate-spin" />
          </div>
        ) : (
          <div className="flex flex-row gap-3 justify-between">
            <span>Add Terminal</span>
            <ChevronRight />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddReader;
