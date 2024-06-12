"use client";

import React, { PropsWithChildren } from "react";
import useLocalStorage from "./useLocalStorage";

export interface AccountData {
  account_id?: string;
  business_name: string;
}

interface AccountDataContextType extends AccountData {
  setAccountData: (data: Partial<Omit<AccountData, "setAccountData">>) => void;
}

const AccountDataContext = React.createContext<AccountDataContextType>({
  business_name: "Your Business Ltd",
  setAccountData: () => null,
});

function AccountDataProvider(props: PropsWithChildren) {
  const [state, setState] = useLocalStorage<AccountData>(
    "lloyds-demo-account-data",
    { business_name: "Your Business Ltd" }
  );

  const setAccountData = (
    data: Partial<Omit<AccountData, "setAccountData">>
  ) => {
    setState((prev) => ({ ...prev, ...data }));
  };

  React.useEffect(() => console.log(state), [state]);
  return (
    <AccountDataContext.Provider value={{ ...state, setAccountData }}>
      {props.children}
    </AccountDataContext.Provider>
  );
}

function useAccountData() {
  const context = React.useContext(AccountDataContext);
  if (context === undefined) {
    throw new Error("useAccountData must be used within a AccountDataProvider");
  }
  return context;
}

export { AccountDataProvider, useAccountData };
