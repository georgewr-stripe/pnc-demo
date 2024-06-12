import Menu, { MenuProps } from "@/components/menu";
import { PropsWithChildren } from "react";
import ConnectJS from "@/components/connectJS";

const menu: MenuProps = {
  title: "Merchant Services | Payments",
  items: {
    Dashboard: [],
    Payouts: [],
    "Account Management": [],
    Terminals: [],
  },
  links: {
    Dashboard: "/dashboard/payments",
    Payouts: "/dashboard/payouts",
    "Account Management": "/dashboard/account",
    Terminals: "/dashboard/terminals",
  },
};

const DashboardLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-row justify-around w-full gap-4 pb-16">
      <Menu {...menu} />
      <div className="flex flex-col gap-4 grow max-w-[70vw] max-h-[90vh] overflow-scroll">
        <ConnectJS>{props.children}</ConnectJS>
      </div>
    </div>
  );
};

export default DashboardLayout;
