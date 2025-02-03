'use client'


import listReaders from "@/api/list_readers";
import { useAccountData } from "@/hooks/useAccountData";
import { RefreshCcw } from "lucide-react";
import React from "react";
import Stripe from "stripe";
import CreateTerminalPayment from "./createPayment";

const ReaderList = () => {
  const { account_id } = useAccountData();
  const [readers, setReaders] = React.useState<Stripe.Terminal.Reader[]>([]);
  const [loadingReaders, setLoadingReaders] = React.useState(true);
  const [terminalID, setTerminalID] = React.useState<string>();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (account_id) {
      listReaders(account_id).then((readers) => {
        setReaders(readers);
        setLoadingReaders(false);
      });
    }
  }, [account_id]);

  React.useEffect(() => {
    if (terminalID) {
      setOpen(true);
    }
  }, [terminalID]);

  if (loadingReaders) {
    return (
      <div className="flex flex-col items-center gap-4 text-lloyds-green">
        <RefreshCcw className="size-6 animate-spin" />
        <span>Loading Readers...</span>
      </div>
    );
  }

  return (
    <div className="">
      <ul role="list" className="divide-y divide-gray-100 mt-4">
        {readers.map((reader, i) => {
          return (
            <li
              key={i}
              className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8 border-2 border-lloyds-dark-green"
              onClick={() => setTerminalID(reader.id)}
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href="#">
                      <span className="absolute inset-x-0 -top-px bottom-0"></span>
                      {reader.device_type}
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a
                      href="mailto:leslie.alexander@example.com"
                      className="relative truncate hover:underline"
                    >
                      {reader.id}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {reader.status?.toLocaleUpperCase()}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen <time dateTime="2023-01-23T13:23Z">1m ago</time>
                  </p>
                </div>
                <svg
                  className="h-5 w-5 flex-none text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </li>
          );
        })}
      </ul>
      <CreateTerminalPayment open={open} setOpen={setOpen} readerID={terminalID || ''} />
    </div>
  );
};

export default ReaderList;
