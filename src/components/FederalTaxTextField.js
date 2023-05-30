import React from "react";
// Masked input
import MaskedInput from "react-text-mask";

function FederalTaxTextField({ ...props }) {
  return (
    <MaskedInput
      mask={[
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/
      ]}
      className="form-control"
      {...props}
    />
  );
}

export default FederalTaxTextField;
