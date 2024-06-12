"use client";

import {
  ConnectAccountManagement,
  ConnectNotificationBanner,
} from "@stripe/react-connect-js";

const AccountManagement = () => {
  return (
    <div>
      <ConnectNotificationBanner
        collectionOptions={{
          fields: "eventually_due",
          futureRequirements: "include",
        }}
      />
      <ConnectAccountManagement />
    </div>
  );
};

export default AccountManagement;
