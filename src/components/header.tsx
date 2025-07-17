"use client";

import { defaultAccountInfo } from "@/app/data";
import { useAccountData } from "@/hooks/useAccountData";
import { ChevronDown, LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const accountData = useAccountData();
  const pathname = usePathname();
  const dashboard = pathname.includes("dashboard");

  return (
    <div className="w-full h-16 flex flex-row bg-pnc-light-gray justify-between px-6">
      <div className="flex flex-row">
        <Link className="flex flex-row justify-center" href="/">
          <Image src={"/logo.png"} height={200} width={150} alt="pnc logo" />
        </Link>
        {dashboard ? (
          <div className="flex items-center pl-6">
            <span className="text-white text-sm">
              Merchant Services | Payments
            </span>
          </div>
        ) : (
          <div className="flex items-center pl-6">
            <span className="text-white text-sm">Our Products & Services</span>
            <ChevronDown className="text-white size-4 ml-2" />
          </div>
        )}
      </div>

      {dashboard ? (
        <div
          className="cursor-pointer flex flex-row justify-center h-full text-center items-center"
          onClick={() => accountData.setAccountData(defaultAccountInfo)}
        >
          <span className="text-white">Reset Stripe Onboarding</span>
        </div>
      ) : (
        <div className="flex flex-row">
          <div className="flex items-center mr-6">
            <span className="text-white">Cookie Policy</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col justify-evenly py-2 pr-2">
              <span className="text-white text-right">Safe & Secure</span>
              <span className="text-white text-xs">
                Our Internet Banking Guarantee
              </span>
            </div>
            <LockIcon className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
