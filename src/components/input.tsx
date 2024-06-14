import { CircleAlert } from "lucide-react";
import { HTMLInputTypeAttribute, useId } from "react";
import CurrencyInput from "./currencyInput";
import React from "react";

export interface InputProps {
  title: string;
  value?: string;
  setValue: (v: string) => void;
  valid: boolean;
  errorMessage: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute | "currency";
}

const Input = (props: InputProps) => {
  const id = useId();
  const inputColours = props.valid
    ? "ring-lloyds-green focus:ring-lloyds-green"
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
      <label htmlFor={id} className="block text-sm leading-6 text-lloyds-green">
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
