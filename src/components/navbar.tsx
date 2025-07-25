"use client";

import { defaultAccountInfo } from "@/app/data";
import { useAccountData } from "@/hooks/useAccountData";
import { ChevronDown, Gauge, Home, LockIcon, Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export interface NavBarProps {
  name: string;
}

const NavBar = (props: NavBarProps) => {
  const accountData = useAccountData();
  const router = useRouter();
  const pathname = usePathname();
  const dashboard = pathname.includes("dashboard");

  const className =
    "flex flex-row p-1.5 cursor-pointer bg-pnc-light-blue text-white " +
    (pathname.startsWith("/dashboard") ? "" : " animate-pulse");

  const dashboardButton = accountData.loggedIn ? (
    <div
      className={className}
      onClick={() => router.push("/dashboard/payments")}
    >
      <span>Payments Dashboard</span>
      <Gauge className="ml-2" />
    </div>
  ) : (
    <></>
  );

  if (dashboard) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex flex-row h-18 w-full border-b-2 border-gray px-6 py-2 justify-between items-center">
        <div className="flex flex-col">
          <span>{props.name}</span>
          <div className="flex flex-row items-center">
            <LockIcon className="h-3 w-3 mr-1" />
            <span className="text-xs">
              Last logged in yesterday at 12:45 pm
            </span>
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => accountData.setAccountData(defaultAccountInfo)}
        >
          <span className="text-pnc-dark-blue">
            Reset Stripe Onboarding
          </span>
        </div>
      </div>
      <div className="flex flex-row h-18 w-full border-b-2 border-gray px-6 py-2 justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <span>{accountData.business_name}</span>
          {dashboardButton}
        </div>

        <div className="flex flex-row gap-6">
          <Home className="text-pnc-dark-blue" />
          <div className="flex flex-row">
            <span className="text-pnc-dark-blue">Your Accounts</span>
            <ChevronDown className="text-pnc-dark-blue" />
          </div>
          <div className="flex flex-row">
            <span className="text-pnc-dark-blue">Admin</span>
            <ChevronDown className="text-pnc-dark-blue" />
          </div>
          <div className="flex flex-row">
            <span className="text-pnc-dark-blue">Help & Support</span>
            <ChevronDown className="text-pnc-dark-blue" />
          </div>
          <Mail className="text-pnc-dark-blue" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
