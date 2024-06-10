"use client";

import { Minus, Plus } from "lucide-react";
import React from "react";

const items: Record<string, string[]> = {
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
};

const Menu = () => {
  const [selected, setSelected] = React.useState<keyof typeof items>();

  const handleSelect = React.useCallback(
    (title: keyof typeof items) => {
      setSelected((prev) => {
        if (prev == title) {
          return undefined;
        }
        return title;
      });
    },
    [selected, setSelected]
  );
  return (
    <div className="flex flex-col max-w-60 text-white">
      <div className="bg-lloyds-green flex flex-col items-center py-4 px-3">
        <span className="text-sm">OUR PRODUCTS & SERVICES</span>
        <div className="w-8 h-[2px] bg-lloyds-light-green"></div>
      </div>
      {Object.entries(items).map(([title, subtitles], i) => (
        <div className="flex flex-col">
          <div
            key={i}
            onClick={() => handleSelect(title)}
            className={
              "flex flex-row items-center py-2 px-3 border-t-[1px] border-gray-700 justify-between " +
              (selected == title ? "bg-lloyds-dark-green" : "bg-lloyds-green")
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
            {subtitles.map((subtitle) => (
              <span className="text-xs py-2 text-center" key={subtitle}>
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
