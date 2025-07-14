"use client";

import CreatePayment from "@/components/create_payment/createPayment";
import {
  ConnectPayments,
  ConnectNotificationBanner,
} from "@stripe/react-connect-js";

const Payments = () => {
  return (
    <div>
      <div className="flex flex-row-reverse w-full">
        <CreatePayment />
      </div>
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
