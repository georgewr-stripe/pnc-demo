"use client";

import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export type MenuProps<T extends string = string> = {
  title: string;
  items: Record<T, string[]>;
  links?: Record<keyof MenuProps["items"], string>;
};

const Menu = (props: MenuProps) => {
  const { title, items, links } = props;
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = React.useState<keyof typeof items>();

  const handleSelect = React.useCallback(
    (title: keyof typeof items) => {
      setSelected((prev) => {
        if (prev == title) {
          return undefined;
        }
        return title;
      });
      if (links) {
        if (links[title]) {
          router.push(links[title]);
        }
      }
    },
    [selected, setSelected]
  );

  React.useEffect(() => {
    if (links) {
      for (const [k, v] of Object.entries(links)) {
        if (v == pathname) {
          setSelected(k);
        }
      }
    }
  }, [pathname]);

  return (
    <div className="flex flex-col max-w-60 text-white">
      <div className="bg-lloyds-green flex flex-col items-center py-4 px-3">
        <span className="text-sm">{title.toUpperCase()}</span>
        <div className="w-8 h-[2px] bg-lloyds-light-green"></div>
      </div>
      {Object.entries(items).map(([title, subtitles], i) => (
        <div className="flex flex-col" key={title}>
          <div
            onClick={() => handleSelect(title)}
            className={
              "flex flex-row items-center py-2 px-3 border-t-[1px] border-gray-700 justify-between " +
              (selected == title ? "bg-lloyds-dark-green" : "bg-lloyds-green") +
              " " +
              (links ? (links[title] ? "cursor-pointer" : "") : "")
            }
          >
            <span className="m-auto text-sm">{title.toUpperCase()}</span>
            {selected == title ? (
              <Minus className="text-lloyds-light-green h-4 w-4" />
            ) : (
              <Plus className="text-lloyds-light-green h-4 w-4" />
            )}
          </div>
          <div
            className={
              "flex flex-col bg-lloyds-dark-green transition-all duration-500 ease-in-out " +
              (selected == title ? "max-h-40" : "max-h-0 invisible")
            }
          >
            {subtitles.map((subtitle, i) => (
              <span className="text-xs py-2 text-center" key={i + subtitle}>
                {subtitle}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
