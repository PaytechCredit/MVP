import React from "react";
// Number Format
import NumberFormat from "react-number-format";

function SocialSecurityField({ onValueChange, value, placeholder, format }) {
  return (
    <div className="input-group">
      <NumberFormat
        className="form-control"
        value={value}
        onValueChange={onValueChange}
        format={format}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default SocialSecurityField;
