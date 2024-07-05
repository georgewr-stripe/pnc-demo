"use client";

import {
  ConnectNotificationBanner,
  ConnectPaymentMethodSettings,
} from "@stripe/react-connect-js";

const PaymentSettings = () => {
  return (
    <div>
      <ConnectNotificationBanner />
      <ConnectPaymentMethodSettings />
    </div>
  );
};

export default PaymentSettings;
