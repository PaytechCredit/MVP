import React from "react";
// Masked input
import MaskedInput from "react-text-mask";

function PhoneTextField({ ...props }) {
  return (
    <div className="input-group">
      <MaskedInput
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]}
        className="form-control"
        {...props}
      />
    </div>
  );
}

export default PhoneTextField;
