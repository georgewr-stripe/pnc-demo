import { CreateAccountProps } from "@/api/types";
import { AccountInfoProps } from "@/components/accountInfo";
import { ReaderInfo } from "@/components/readers";

export const defaultAccountInfo = {
  account_id: "",
  business_name: "Pittsburg Dental",
};

export const accountInfo: AccountInfoProps[] = [
  {
    name: "Business Checking Account",
    balance: 25117.27,
    available: 3517.27,
    account_number: "000123456788",
    routing_number: "043000096",
  },
  {
    name: "Business Savings Account",
    balance: 26010,
    available: 25990,
    account_number: "000123456789",
    routing_number: "043000096",
  },
];
export const readerInfo: ReaderInfo[] = [
  {
    title: "Payment Links",
    image: "/payment_link.svg",
    height: 200,
    width: 200,
    description:
      "Use Payment Links to sell online without a website. Create a full payment page in just a few clicks and share the link with your customers—no code required.",
    tag: "No Setup Required",
    specs: [
      "Take payments Now",
      "No website required",
      "One-time or subscriptions",
    ],
    cta_text: "Send a Link Now",
  },
  {
    title: "Virtual Terminal",
    image: "/virtual_terminal.png",
    height: 100,
    width: 100,
    description:
      "Take payments over the phone using the virtual terminal. Virtual terminals operate using web-based software, giving you the ability to process payments electronically—without using a physical point of sale (POS) terminal",
    tag: "No Setup Required",
    specs: ["MOTO Transactions", "No Hardware needed", "Fast and Easy"],
    cta_text: "Take a Payment Now",
  },
  {
    title: "Tap to Pay",
    image: "/pnc_ttp.png",
    height: 200,
    width: 200,
    description:
      "Give your users the ability to accept contactless payments in person, directly on compatible iPhones and Android devices. With Tap to Pay and the Stripe Terminal SDK, users can accept contactless payments from physical cards and digital wallets – no extra hardware required.",
    tag: "No Hardware needed",
    specs: [
      "Free to get started",
      "Available on Android & iOS",
      "Simple setup",
    ],
    cta_text: "Download the App",
  },
  {
    title: "S700 - Smart Reader",
    image: "/s700.png",
    height: 100,
    width: 200,
    description:
      "Stripe Reader S700 is the latest Stripe-designed Android smartPOS reader with a 5.5 display. An all-in-one smart device, it can accept tap, swipe, and chip payments and run custom, user-developed POS applications. Stripe Reader S700 connects to your iOS, Android, or JavaScript application over a local network connection via Wi-Fi. It can also be used with an optional dock + hub or case to best support countertop and handheld needs.",
    tag: "Premium Experience",
    specs: [
      "Custom splash screen",
      "E-receipts",
      "Wi-Fi Connectivity",
      "Dock included",
    ],
    cta_text: "Order Now",
  },
];
const person: CreateAccountProps["person"] = {
  first_name: "Olivia",
  last_name: "Crawford",
  address: {
    line1: "address_full_match",
    city: "Pittsburgh",
    state: "PA",
    country: "US",
    postal_code: "15222",
  },
  dob: {
    year: 1901,
    month: 1,
    day: 1,
  },
  email: "olivia@pnc.com",
  phone: "+1-800-762-2265",
  id_number: "000000000",
  relationship: {
    director: true,
    executive: true,
    owner: true,
    representative: true,
    title: "CEO",
  },
  verification: {
    document: {
      front: "file_identity_document_success",
    },
  },
};
export const onboardingTypes: { name: string; kyc: CreateAccountProps }[] = [
  {
    name: "Full KYC Provided",
    kyc: {
      account: {
        business_type: "company",
        company: {
          name: defaultAccountInfo.business_name,
          address: {
            line1: "address_full_match",
            city: "Pittsburgh",
            state: "PA",
            country: "US",
            postal_code: "15222",
          },
          tax_id: "000000000",
          phone: "+1-800-762-2265",
          directors_provided: true,
          owners_provided: true,
          executives_provided: true,
        },
        business_profile: {
          name: defaultAccountInfo.business_name,
          mcc: "5814",
          url: "https://accessible.stripe.com",
          product_description: "I sell things in my shop",
          support_phone: "+1-800-762-2265",
        },
        external_account: {
          object: "bank_account",
          country: "US",
          currency: "usd",
          account_holder_name: "Olivia Crawford",
          account_number: "000123456789",
          routing_number: "043000096",
        },
      },
      person,
    },
  },
  {
    name: "Partial KYC Provided",
    kyc: {
      account: {
        business_type: "individual",
        company: {
          name: defaultAccountInfo.business_name,
          address: {
            line1: "address_full_match",
            city: "Pittsburgh",
            state: "PA",
            country: "US",
            postal_code: "15222",
          },
          tax_id: "000000000",
          phone: "+1-800-762-2265",
        },
        business_profile: {
          url: "https://accessible.stripe.com",
          name: defaultAccountInfo.business_name,
        },
        external_account: {
          object: "bank_account",
          country: "US",
          currency: "usd",
          account_holder_name: "Olivia Crawford",
          account_number: "00012345",
          routing_number: "043000096",
        },
      },
      person,
    },
  },
];
