"use client";

import { PropsWithChildren } from "react";
import ConnectJS from "@/components/connectJS";
import React from "react";
import { useAccountData } from "@/hooks/useAccountData";
import { useRouter } from "next/navigation";
import SideBar, { SideBarProps } from "@/components/sidebar";

const sideBarItems: SideBarProps["items"] = [
  { title: "Dashboard", pathname: "/dashboard/payments" },
  { title: "Payouts", pathname: "/dashboard/payouts" },
  { title: "Account Management", pathname: "/dashboard/account" },
  { title: "Payment Settings", pathname: "/dashboard/settings" },
  { title: "Branding", pathname: "/dashboard/branding" },
  { title: "Terminals", pathname: "/dashboard/terminals" },
];

const DashboardLayout = (props: PropsWithChildren) => {
  const router = useRouter();
  const { account_id, loaded } = useAccountData();

  React.useEffect(() => {
    if (!account_id && loaded) {
      router.push("/signup");
    }
  }, [account_id, loaded, router]);

  return (
    <div className="flex flex-row justify-around w-full gap-4 pb-16 h-full">
      <div className="max-w-[20vw] min-w-48 top-0 left-0 bottom-0 h-[100vh] fixed ">
        <SideBar items={sideBarItems} />
      </div>
      <div className="flex flex-col gap-4 grow max-w-[80vw] max-h-[90vh] overflow-scroll items-center justify-center content-center">
        <div className="w-full max-w-[80%] m-auto self-center">
          <ConnectJS>{props.children}</ConnectJS>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
