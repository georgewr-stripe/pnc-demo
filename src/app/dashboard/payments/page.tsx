"use client";

import {
  ConnectPayments,
  ConnectNotificationBanner,
} from "@stripe/react-connect-js";

const Payments = () => {
  return (
    <div>
      <ConnectNotificationBanner
        collectionOptions={{
          fields: "eventually_due",
          futureRequirements: "include",
        }}
      />
      <ConnectPayments />
    </div>
  );
};

export default Payments;
