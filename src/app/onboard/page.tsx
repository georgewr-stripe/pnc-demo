"use client";

import createTestData from "@/api/create_test_data";
import ConnectJS from "@/components/connectJS";
import { useAccountData } from "@/hooks/useAccountData";
import { ConnectAccountOnboarding } from "@stripe/react-connect-js";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Onboard = () => {
  const router = useRouter();
  const { account_id } = useAccountData();

  const [loading, setLoading] = React.useState(false);
  return (
    <ConnectJS>
      <ConnectAccountOnboarding
        onExit={async () => {
          if (!account_id) {
            throw "No Account ID!";
          }
          setLoading(true);
          const success = await createTestData(account_id);
          if (success) {
            router.push("/dashboard/payments");
          }
          setLoading(false);
        }}
        // Optional: make sure to follow our policy instructions above
        // fullTermsOfServiceUrl="{{URL}}"
        // recipientTermsOfServiceUrl="{{URL}}"
        // privacyPolicyUrl="{{URL}}"
        skipTermsOfServiceCollection={false}
        collectionOptions={{
          fields: "eventually_due",
          futureRequirements: "include",
        }}
      />
      {loading ? (
        <div className=" m-auto flex flex-col items-center">
          <RefreshCw className="text-lloyds-light-green animate-spin" />
          <span className="text-lloyds-green text-lg">
            Loading test data ...
          </span>
        </div>
      ) : (
        <></>
      )}
    </ConnectJS>
  );
};

export default Onboard;
