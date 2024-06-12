"use client";

import ConnectJS from "@/components/connectJS";
import { ConnectAccountOnboarding } from "@stripe/react-connect-js";
import { useRouter } from "next/navigation";

const Onboard = () => {
  const router = useRouter();
  return (
    <ConnectJS>
      <ConnectAccountOnboarding
        onExit={() => {
          router.push("/dashboard/payments");
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
    </ConnectJS>
  );
};

export default Onboard;
