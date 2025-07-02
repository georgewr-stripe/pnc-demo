import React from "react";
import MaskedInput, { Mask } from "react-text-mask";
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

const CurrencyInput = ({
  maskOptions,
  ...inputProps
}: {
  maskOptions: MaskOptions;
}) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} />;
};

CurrencyInput.defaultProps = {
  inputMode: "numeric",
  maskOptions: {},
};

export default CurrencyInput;
