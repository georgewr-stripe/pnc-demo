import { AccountInfoProps } from "@/components/accountInfo";
import { ReaderInfo } from "@/components/readers";

export const defaultAccountInfo = {
    'account_id': '',
    'business_name': 'Black Horse Feed Ltd'
}


export const accountInfo: AccountInfoProps[] = [
  {
    name: "Business Account",
    balance: 25117.27,
    available: 3517.27,
    sort_code: "77-61-27",
    account_number: "004923476",
  },
  {
    name: "Business Savings Account",
    balance: 26010,
    available: 25990,
    sort_code: "77-61-27",
    account_number: "004923476",
  },
];export const readerInfo: ReaderInfo[] = [
    {
        title: "Payment Links",
        image: '/payment_link.svg',
        height: 200,
        width: 200,
        description: 'Use Payment Links to sell online without a website. Create a full payment page in just a few clicks and share the link with your customers—no code required.',
        tag: 'No Setup Required',
        specs: [
            "Take payments Now",
            "No website required",
            "One-time or subscriptions"
        ],
        cta_text: 'Send a Link Now'
    },
    {
        title: "Virtual Terminal",
        image: "/virtual_terminal.png",
        height: 100,
        width: 100,
        description: "Take payments over the phone using the virtual terminal. Virtual terminals operate using web-based software, giving you the ability to process payments electronically—without using a physical point of sale (POS) terminal",
        tag: "No Setup Required",
        specs: [
            "MOTO Transactions",
            "No Hardware needed",
            "Fast and Easy"
        ],
        cta_text: "Take a Payment Now"
    },
  {
    title: "Tap to Pay",
    image: "/ttp_ios.png",
    height: 100,
    width: 100,
    description: "Give your users the ability to accept contactless payments in person, directly on compatible iPhones and Android devices. With Tap to Pay and the Stripe Terminal SDK, users can accept contactless payments from physical cards and digital wallets – no extra hardware required.",
    tag: "No Hardware needed",
    specs: [
      "Free to get started",
      "Available on Android & iOS",
      "Simple setup",
    ],
    cta_text: 'Download the App'
  },
  {
    title: "S700 - Smart Reader",
    image: "/s700.png",
    height: 100,
    width: 200,
    description: "Stripe Reader S700 is the latest Stripe-designed Android smartPOS reader with a 5.5 display. An all-in-one smart device, it can accept tap, swipe, and chip payments and run custom, user-developed POS applications. Stripe Reader S700 connects to your iOS, Android, or JavaScript application over a local network connection via Wi-Fi. It can also be used with an optional dock + hub or case to best support countertop and handheld needs.",
    tag: "Premium Experience",
    specs: [
      "Custom splash screen",
      "E-receipts",
      "Wi-Fi Connectivity",
      "Dock included",
    ],
    cta_text: 'Order Now'
  },
];

