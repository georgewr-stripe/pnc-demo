"use client";

import { ConnectPayouts, ConnectNotificationBanner } from "@stripe/react-connect-js";

const Payouts = () => {
  return (
    <div>
        <ConnectNotificationBanner
        collectionOptions={{
          fields: "eventually_due",
          futureRequirements: "include",
        }}
      />
            <ConnectPayouts />

    </div>
  );
};

export default Payouts;
