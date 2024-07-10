import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

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

  React.useEffect(() => {
    const item = props.items.find((i) => i.pathname == pathname);
    if (item) {
      setSelected(props.items.indexOf(item));
    }
  }, [pathname]);

  return (
    <div className="bg-lloyds-green h-full flex flex-col">
      <div className="flex flex-col gap-1 mt-24">
        <span className="text-lg text-white text-center">
          Merchant Services
        </span>
        <span className="text-lg text-white text-center pb-4">Payments</span>
      </div>
      <div className="border-t-2 border-lloyds-dark-green">
        {props.items.map((item, i) => {
          const isSelected = i == selected;
          const style = isSelected ? "bg-lloyds-dark-green" : "";
          return (
            <div>
              <div
                key={i}
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
      </div>
    </div>
  );
};

export default SideBar;
