import React from "react";
// Number Format
import NumberFormat from "react-number-format";

function DollarIntegerField({ onValueChange, value, placeholder, required }) {
  return (
    <div className="input-group">
      <NumberFormat
        className="form-control"
        value={value}
        onValueChange={onValueChange}
        thousandSeparator={true}
        prefix={" $ "}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

export default DollarIntegerField;
