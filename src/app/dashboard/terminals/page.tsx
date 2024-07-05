"use client";

import AddReader from "@/components/terminal/addReader";
import ReaderList from "@/components/terminal/readerList";
import { Plus } from "lucide-react";
import React from "react";

const Terminals = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div className="flex flex-row-reverse w-full">
        <div
          className="flex flex-row justify-between items-center bg-lloyds-light-green p-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-white mr-2">Add a Reader</span>
          <Plus className="text-white size-5" />
        </div>
      </div>
      <ReaderList />
      <AddReader open={open} setOpen={setOpen} />
    </div>
  );
};

export default Terminals;
