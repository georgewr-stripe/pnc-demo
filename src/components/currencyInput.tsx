import React from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export interface MaskOptions {
  inputmode: string;
  maskOptions: {
    prefix: string;
    suffix: string;
    includeThousandsSeparator: boolean;
    thousandsSeparatorSymbol: string;
    allowDecimal: boolean;
    decimalSymbol: string;
    decimalLimit: number;
    allowNegative: boolean;
    allowLeadingZeroes: boolean;
    integerLimit: number;
  };
}

const defaultMaskOptions: MaskOptions["maskOptions"] = {
  prefix: "$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

interface CurrencyInputProps {
  maskOptions?: MaskOptions;
  value?: number; // Expect cents as number
  onChange?: (cents: number) => void; // Callback with cents
  onBlur?: (cents: number) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  "aria-describedby"?: string;
}

const CurrencyInput = ({
  maskOptions,
  value,
  onChange,
  onBlur,
  ...inputProps
}: CurrencyInputProps) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  // Convert cents to dollars for display
  const displayValue = value ? (value / 100).toFixed(2) : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove currency symbols and commas, then parse as float
    const numericValue = parseFloat(inputValue.replace(/[$,]/g, "")) || 0;
    // Convert dollars to cents
    const cents = Math.round(numericValue * 100);
    
    if (onChange) {
      console.log("onChange", cents);
      onChange(cents);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue.replace(/[$,]/g, "")) || 0;
    const cents = Math.round(numericValue * 100);
    
    if (onBlur) {
      onBlur(cents);
    }
  };

  return (
    <MaskedInput 
      mask={currencyMask} 
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...inputProps} 
    />
  );
};

CurrencyInput.defaultProps = {
  inputMode: "numeric",
  maskOptions: {},
};

export default CurrencyInput;
