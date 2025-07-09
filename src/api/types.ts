"use client";

import Stripe from "stripe";

export type CreateAccountProps = {
  account: Omit<
    Stripe.AccountCreateParams,
    "capabilities" | "controller" | "country"
  >;
  person: Stripe.AccountCreatePersonParams;
};

export interface PaymentLinkParams {
  amount: number;
  description: string;
  quantity: number;
}

export interface MOTOPaymentParams {
  amount: number;
}


export interface BrandingFile {
  name: string;
  type: string;
  src: string;
}

export interface AccountBranding {
  icon?: BrandingFile;
  logo?: BrandingFile;
  primary_color: string;
  secondary_color: string;
}