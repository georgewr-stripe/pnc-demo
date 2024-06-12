import AccountInfo, { AccountInfoProps } from "@/components/accountInfo";
import Menu from "@/components/menu";
import Readers, { ReaderInfo } from "@/components/readers";

const accountInfo: AccountInfoProps[] = [
  {
    name: "Business Account",
    balance: 25117.27,
    available: 3517.27,
    sort_code: "77-61-27",
    account_number: "004923476",
  },
  {
    name: "Business Savings Account",
    balance: 26010.0,
    available: 25990.0,
    sort_code: "77-61-27",
    account_number: "004923476",
  },
];

const readerInfo: ReaderInfo[] = [
  {
    title: "Tap to Pay",
    image: "/ttp_ios.png",
    height: 100,
    width: 100,
    description:
      "Give your users the ability to accept contactless payments in person, directly on compatible iPhones and Android devices. With Tap to Pay and the Stripe Terminal SDK, users can accept contactless payments from physical cards and digital wallets – no extra hardware required.",
    tag: "No Hardware needed",
    specs: [
      "Free to get started",
      "Available on Android & iOS",
      "Simple setup",
    ],
  },
  {
    title: "S700",
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
  },
];

const menu = {
  title: "OUR PRODUCTS & SERVICES",
  items: {
    Loans: [],
    Overdraft: [],
    "Credit & Charge Cards": [],
    "Asset Finance": [],
    Savings: [],
    "Business Accounts": [],
    "Make a Payment": [],
    "Take Card Payments": [
      "Apply for a card reader",
      "Explore other ways to take payments",
      "Enquire about taking payments",
    ],
    "International Services": [],
    Insurance: [],
  },
};

export default function Home() {
  return (
    <div className="flex flex-row justify-around w-full gap-4 pb-16">
      <Menu {...menu} />
      <div className="flex flex-col gap-4 grow max-w-[70vw] max-h-[90vh] overflow-scroll">
        <div className="flex flex-col gap-3 grow">
          {accountInfo.map((info, i) => (
            <AccountInfo key={i} {...info} />
          ))}
        </div>
        <div className="flex flex-col gap-4 justify-between">
          {readerInfo.map((info, i) => (
            <Readers key={i} {...info} />
          ))}
        </div>
      </div>
    </div>
  );
}
