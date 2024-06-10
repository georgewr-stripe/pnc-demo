import { ChevronRight } from "lucide-react";
import Image from "next/image";

export interface AccountInfoProps {
  name: string;
  balance: number;
  available: number;
  sort_code: string;
  account_number: string;
}

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const AccountInfo = (props: AccountInfoProps) => {
  return (
    <div className="bg-white w-full border-t-[3px] border-lloyds-green flex flex-row justify-between shadow-sm">
      <div className="flex flex-col gap-1.5 p-2 grow">
        <div className="flex flex-row px-2 items-center gap-2">
          <Image src={"/horse.png"} height={30} width={30} alt="horse" />
          <span className="text-lloyds-dark-green text-sm">
            {props.name.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">{props.sort_code}</span>
          <span className="text-sm text-gray-500">{props.account_number}</span>
        </div>
        <div className="flex flex-row px-2 items-center">
          <span className="text-xl font-extralight text-black">
            {GBP.format(props.balance)}
          </span>
          <span className="text-gray-500 text-sm ml-2">Current balance</span>
        </div>
        <div className="border-t-2"></div>
        <div className="flex flex-row px-2 items-center">
          <span className="text-sm font-extralight text-gray-500">
            {GBP.format(props.available)}
          </span>
          <span className="text-gray-500 text-sm ml-2">
            Available funds including your £1,000 overdraft
          </span>
        </div>
        <div className="border-t-2"></div>
        <span className="text-gray-700 text-sm ml-2">
          You could earn up to 3% interest.
        </span>
      </div>
      <div className="flex flex-col bg-slate-100 ">
        <div className="border-b-2 border-white flex flex-row justify-between p-2 min-w-48 items-middle">
          <span className="text-sm text-lloyds-green">View Statement</span>
          <ChevronRight className="text-lloyds-green size-4" />
        </div>
        <div className="border-b-2 border-white flex flex-row justify-between p-2 min-w-48 items-middle">
          <span className="text-sm text-lloyds-green">Make Payment</span>
          <ChevronRight className="text-lloyds-green size-4" />
        </div>
        <div className="border-b-2 border-white flex flex-row justify-between p-2 min-w-48 items-middle">
          <span className="text-sm text-lloyds-green">Make transfer</span>
          <ChevronRight className="text-lloyds-green size-4" />
        </div>
        <div className="flex flex-row justify-between p-2 min-w-48 items-middle bg-lloyds-light-green">
          <span className="text-sm text-white">More actions</span>
          <ChevronRight className="text-white size-4" />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
