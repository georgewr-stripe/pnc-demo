"use client";

import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export interface MenuProps {
  title: string;
  items: Record<string, string[]>;
  links?: Record<string, string>;
}

const Menu = (props: MenuProps) => {
  const [selected, setSelected] = useState<string>("");
  const { title, items, links } = props;

  const handleSelect = (title: string) => {
    if (selected == title) {
      setSelected("");
    } else {
      setSelected(title);
    }
  };

  return (
    <div className="flex flex-col w-80 bg-white border-r-2 border-gray-300">
      <div className="bg-pnc-orange text-white p-4 flex justify-center">
        <span className="text-lg font-semibold text-center ">{title}</span>
      </div>
      {Object.entries(items).map(([title, subtitles]) => (
        <div className="flex flex-col" key={title}>
          <div
            onClick={() => handleSelect(title)}
            className={
              "flex flex-row items-center py-2 px-3 border-t-[1px] border-white justify-between text-white " +
              (selected == title ? "bg-pnc-dark-blue" : "bg-pnc-orange") +
              " " +
              (links ? (links[title] ? "cursor-pointer" : "") : "")
            }
          >
            <span className="m-auto text-sm">{title.toUpperCase()}</span>
            {selected == title ? (
              <Minus className="text-white h-4 w-4" />
            ) : (
              <Plus className="text-white h-4 w-4" />
            )}
          </div>
          <div
            className={
              "flex flex-col bg-pnc-dark-blue transition-all duration-500 ease-in-out " +
              (selected == title ? "max-h-40" : "max-h-0 invisible")
            }
          >
            {subtitles.map((subtitle, i) => (
              <span className="text-xs py-2 text-center text-white" key={i + subtitle}>
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
