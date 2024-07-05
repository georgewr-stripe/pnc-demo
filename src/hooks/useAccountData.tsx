"use client";

import React, { PropsWithChildren } from "react";
import useLocalStorage from "./useLocalStorage";
import { defaultAccountInfo } from "@/app/data";

export interface AccountData {
  account_id?: string;
  business_name: string;
}

interface AccountDataContextType extends AccountData {
  setAccountData: (data: Partial<Omit<AccountData, "setAccountData">>) => void;
  loaded: boolean;
  loggedIn: boolean;
}

const AccountDataContext = React.createContext<AccountDataContextType>({
  business_name: defaultAccountInfo.business_name,
  setAccountData: () => null,
  loaded: false,
  loggedIn: false,
});

function AccountDataProvider(props: PropsWithChildren) {
  const [state, setState, loaded] = useLocalStorage<AccountData>(
    "lloyds-demo-account-data",
    { business_name: defaultAccountInfo.business_name }
  );
  const [loggedIn, setLoggedIn] = React.useState(false);

  const setAccountData = (
    data: Partial<Omit<AccountData, "setAccountData">>
  ) => {
    setState((prev) => ({ ...prev, ...data }));
  };

  React.useEffect(() => {
    if (loaded) {
      setLoggedIn(!!state.account_id);
    }
  }, [state, loaded]);

  return (
    <AccountDataContext.Provider
      value={{ ...state, setAccountData, loaded, loggedIn }}
    >
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
