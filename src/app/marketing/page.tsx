"use client";

import { CreateAccountProps } from "@/api/types";
import { useAccountData } from "@/hooks/useAccountData";
import { ChevronRight, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { defaultAccountInfo, onboardingTypes } from "../data";
import { createAccount } from "@/api/accounts";

const CTAS = [
  {
    title: "Learn more about Card payments",
    text: "Find out more about how you can start taking card payments, whether you are collecting payments face to face of remotely via the phone or emails",
    glow: false,
  },
  {
    title: "See our solutions and how they work",
    text: "You can take payments and manage transactions via our PNC Payments app on your phone. Select and order a card reader that suits your business needs.",
    glow: false,
  },
  {
    title: "Start Now",
    text: "To set up an account, you just need to confirm that we have up-to-date details about you and your business. You'll be ready to go in as little as 5 minutes!",
    glow: true,
  },
];

const Marketing = () => {
  const { setAccountData } = useAccountData();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const beginOnboarding = React.useCallback(async () => {
    if (!loading) {
      setLoading(true);
      const data = onboardingTypes[0].kyc;
      const { account_id } = await createAccount(data);
      setAccountData({
        account_id,
        business_name: defaultAccountInfo.business_name,
      });
      router.push("/onboard");
    }
  }, [loading]);

  return (
    <div className="px-6 lg:px-8">
      <div className="flex flex-col mx-auto max-w-4xl">
        <div>
          <span className="text-3xl text-pnc-dark-blue w-full">
            Get payment-ready - exclusive offer
          </span>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="w-[50%]">
            <p>
              Set up an account with PNC Payments today - it takes only 5 mins
              and you can start taking payments right away. No hardware needed.
            </p>
            <p className="mt-2">
              Use your phone as a card reader - take payments face to face from
              a physical card or a contactless device. You can also create a
              link or QR code to collect payment from customers securely over
              the phone or email.
            </p>
            <p className="mt-2">
              You can manage all of this through an app - see your transactions,
              or selecting additional that suit your needs.
            </p>
          </div>
          <div className="w-[50%]">
            <Image
              src={"/marketing_ttp.png"}
              width="0"
              height="0"
              sizes="80vw"
              className="w-full h-[50%]"
              alt="ttp"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-3 mb-3">
          {CTAS.map((cta, i) => {
            const style =
              "rounded-xl border-[3px] flex flex-col p-2 justify-between gap-2 " +
              (cta.glow
                ? "border-pnc-dark-blue bg-pnc-blue text-white cursor-pointer"
                : "border-gray-500");
            return (
              <div
                key={i}
                className={style}
                onClick={cta.glow ? beginOnboarding : () => null}
              >
                <span className="text-lg">{cta.title}</span>
                <span className="">{cta.text}</span>
                <div className="flex flex-row-reverse">
                  {loading && cta.glow ? (
                    <RefreshCw className=" animate-spin ml-2" />
                  ) : (
                    <ChevronRight className="size-7" />
                  )}
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
            <div className="border-2 p-2 border-pnc-blue bg-pnc-blue text-white flex flex-row items-center cursor-pointer">
              <span>Confirm</span>
              {loading ? (
                <RefreshCw className=" animate-spin ml-2" />
              ) : (
                <ChevronRight />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
