"use client";

import Stripe from "stripe";

export type CreateAccountProps = {
  account: Omit<
    Stripe.AccountCreateParams,
    "capabilities" | "controller" | "country"
  >;
  person: Stripe.AccountCreatePersonParams;
};

export interface PaymentLinkLineItem {
  price_id?: string;
  amount?: number;
  description: string;
  quantity: number;
}

export interface CreatePaymentLinkParams {
  line_items: PaymentLinkLineItem[];
  currency?: string;
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
