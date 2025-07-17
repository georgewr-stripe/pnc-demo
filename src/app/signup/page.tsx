"use client";

import { CreateAccountProps } from "@/api/types";
import { useAccountData } from "@/hooks/useAccountData";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { defaultAccountInfo, onboardingTypes } from "../data";
import { createAccount } from "@/api/accounts";

const SignUp = () => {
  const { setAccountData } = useAccountData();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const beginOnboarding = React.useCallback(
    async (kyc: CreateAccountProps) => {
      if (!loading) {
        setLoading(true);
        const { account_id } = await createAccount(kyc);
        setAccountData({
          account_id,
          business_name: defaultAccountInfo.business_name,
        });
        router.push("/onboard");
      }
    },
    [loading, setAccountData, router]
  );

  return (
    <div className="px-6 lg:px-8">
      <div className="flex flex-col mx-auto max-w-4xl">
        <div>
          <span className="text-3xl text-pnc-dark-blue w-full">
            Choose your onboarding type
          </span>
        </div>
        <div className="flex flex-row gap-4 mt-3 mb-3">
          {onboardingTypes.map((type, i) => {
            const style =
              "rounded-xl border-[3px] flex flex-col p-2 justify-between gap-2 " +
              "border-gray-500";
            return (
              <div key={i} className={style}>
                <span className="text-lg">{type.name}</span>
                <span className="">{type.name === "Full KYC Provided" ? "Complete business verification with all required documents" : "Basic verification with minimal requirements"}</span>
                <div className="flex flex-row-reverse">
                  <ChevronRight className="size-7" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t-2 border-gray-600 w-full flex flex-row-reverse">
          <div className="flex flex-row mt-2 gap-2">
            <div className="border-2 p-2 border-pnc-blue text-pnc-blue">
              <span>Cancel</span>
            </div>
            <div
              className="flex flex-row justify-between items-center bg-pnc-light-blue p-2 w-full cursor-pointer"
              onClick={() => (loading ? null : beginOnboarding(onboardingTypes[0].kyc))}
            >
              <span className="text-white pr-2">
                {loading ? "Loading ..." : "Start onboarding"}
              </span>
              <ChevronRight className="text-white size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
