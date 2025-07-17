"use client"

import { useAccountData } from "@/hooks/useAccountData";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import CreatePayment from "./create_payment/createPayment";

export interface SideBarProps {
  items: {
    title: string;
    pathname: string;
  }[];
}

const SideBar = (props: SideBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = React.useState<number>();
  const {business_name} = useAccountData()

  React.useEffect(() => {
    const item = props.items.find((i) => i.pathname == pathname);
    if (item) {
      setSelected(props.items.indexOf(item));
    }
  }, [pathname, props.items]);

  return (
    <div className="bg-pnc-orange h-full flex flex-col">
      <div className="flex flex-col gap-1 mt-20">
        <span className="text-lg text-white text-center">
        {business_name}
        </span>
        <span className="text-lg text-white text-center pb-4">Payments</span>
      </div>
      <div className="border-t-2 bg-pnc-orange flex flex-col justify-between h-full">
        <div>
        {props.items.map((item, i) => {
          const isSelected = i == selected;
          const style = isSelected ? "bg-pnc-orange" : "";
          return (
            <div key={i}>
              <div
                onClick={() => {
                  setSelected(i);
                  router.push(item.pathname);
                }}
                className={
                  "flex flex-row items-center gap-2 text-white border-b-2 border-lloyds-dark-green p-4 cursor-pointer " +
                  style
                }
              >
                <span>{item.title}</span>
                {isSelected ? (
                  <Minus className="text-lloyds-light-green h-4 w-4" />
                ) : (
                  <Plus className="text-lloyds-light-green h-4 w-4" />
                )}
              </div>
            </div>
          );
        })}
        <div className="ml-2 mt-2  m-auto">
          <CreatePayment />
        </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
