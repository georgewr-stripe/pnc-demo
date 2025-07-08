"use client";

import { CircleAlert } from "lucide-react";
import React, { useId } from "react";
import CurrencyInput from "./currencyInput";

export interface InputProps {
  title: string;
  type: "text" | "currency" | "number";
  placeholder?: string;
  value?: string;
  setValue: (value: string) => void;
  valid: boolean;
  errorMessage: string;
}

const Input = (props: InputProps) => {
  const id = useId();
  const inputColours = props.valid
    ? "ring-pnc-blue focus:ring-pnc-blue"
    : "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500";

  const inputParams = {
    id,
    type: props.type,
    className:
      "block w-full border-0 pl-2 py-1.5 pr-10  ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " +
      inputColours,
    placeholder: props.placeholder,
    defaultValue: props.value || "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      props.setValue(e.target.value),
    "aria-describedby": "input-error",
  };

  const input = React.useMemo(() => {
    if (props.type == "currency") {
      return <CurrencyInput {...inputParams} />;
    } else {
      return <input {...inputParams} />;
    }
  }, [props.type]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm leading-6 text-pnc-blue">
        {props.title}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {input}
        {props.valid ? (
          <></>
        ) : (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <CircleAlert className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {props.valid ? (
        <></>
      ) : (
        <p className="mt-2 text-sm text-red-600" id="input-error">
          {props.errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
