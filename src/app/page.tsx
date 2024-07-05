import AccountInfo from "@/components/accountInfo";
import Menu from "@/components/menu";
import StartPaymentsCTA from "@/components/startPaymentsCTA";
import { accountInfo } from "./data";

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
      <div className="flex flex-col gap-4 grow max-w-[70vw] max-h-[90vh] ">
        <div className="flex flex-col gap-3 grow">
          <StartPaymentsCTA />
          {accountInfo.map((info, i) => (
            <AccountInfo key={i} {...info} />
          ))}
        </div>
      </div>
    </div>
  );
}
