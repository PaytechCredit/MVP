import React from "react";
// Number Format
import NumberFormat from "react-number-format";

function NumberField({ onValueChange, value }) {
  return (
    <div className="input-group">
      <NumberFormat
        className="form-control"
        value={value}
        onValueChange={onValueChange}
        thousandSeparator={true}
        required
      />
    </div>
  );
}
export default NumberField;
