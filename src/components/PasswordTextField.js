import React from "react";
// React Bootstrap
import Button from "react-bootstrap/Button";
// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function PasswordTextFeild({ ...props }) {
  const [values, setValues] = React.useState({
    hidden: true
  });

  function handlePasswordToggle(event) {
    event.preventDefault();
    setValues({ ...values, hidden: !values.hidden });
  }

  return (
    <div className="input-group">
      <input
        type={values.hidden ? "password" : "text"}
        className="form-control"
        {...props}
      />
      <div className="input-group-append">
        <Button
          type="button"
          className="btn-transparent"
          onClick={handlePasswordToggle}
        >
          {values.hidden ? (
            <FontAwesomeIcon icon={faEye} className="fa-eye" />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} className="fa-eye-slash" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default PasswordTextFeild;
