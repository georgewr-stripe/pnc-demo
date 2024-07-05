"use client";

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

  const className =
    "flex flex-row p-1.5 cursor-pointer bg-lloyds-light-green text-white " +
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
          onClick={() =>
            accountData.setAccountData({
              account_id: "",
              business_name: "Your Business Ltd",
            })
          }
        >
          <span className="text-lloyds-dark-green">Reset Stripe Onboarding</span>
        </div>
      </div>
      <div className="flex flex-row h-18 w-full border-b-2 border-gray px-6 py-2 justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <span>{accountData.business_name}</span>
          {dashboardButton}
        </div>

        <div className="flex flex-row gap-6">
          <Home className="text-lloyds-dark-green" />
          <div className="flex flex-row">
            <span className="text-lloyds-dark-green">Your Accounts</span>
            <ChevronDown className="text-lloyds-dark-green" />
          </div>
          <div className="flex flex-row">
            <span className="text-lloyds-dark-green">Admin</span>
            <ChevronDown className="text-lloyds-dark-green" />
          </div>
          <div className="flex flex-row">
            <span className="text-lloyds-dark-green">Help & Support</span>
            <ChevronDown className="text-lloyds-dark-green" />
          </div>
          <Mail className="text-lloyds-dark-green" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
