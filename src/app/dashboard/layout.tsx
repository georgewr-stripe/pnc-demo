"use client";

import Menu, { MenuProps } from "@/components/menu";
import { PropsWithChildren } from "react";
import ConnectJS from "@/components/connectJS";
import React from "react";
import { useAccountData } from "@/hooks/useAccountData";
import { useRouter } from "next/navigation";

const menu: MenuProps = {
  title: "Merchant Services | Payments",
  items: {
    Dashboard: [],
    Payouts: [],
    "Account Management": [],
    "Payment Settings": [],
    Terminals: [],
  },
  links: {
    Dashboard: "/dashboard/payments",
    Payouts: "/dashboard/payouts",
    "Account Management": "/dashboard/account",
    "Payment Settings": "/dashboard/settings",
    Terminals: "/dashboard/terminals",
  },
};

const DashboardLayout = (props: PropsWithChildren) => {
  const router = useRouter();
  const { account_id, loaded } = useAccountData();

  React.useEffect(() => {
    if (!account_id && loaded) {
      router.push("/signup");
    }
  }, [account_id, loaded]);

  return (
    <div className="flex flex-row justify-around w-full gap-4 pb-16">
      <Menu {...menu} />

      <div className="flex flex-col gap-4 grow max-w-[70vw] max-h-[90vh] overflow-scroll h-full">
        <ConnectJS>{props.children}</ConnectJS>
      </div>
    </div>
  );
};

export default DashboardLayout;
