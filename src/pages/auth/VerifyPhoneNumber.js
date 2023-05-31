import React from "react";
// redux
import {
  sendVerificationTextMessage,
  phoneVerificationError
} from "_actions/verification";
import { connect } from "react-redux";
// react router
import { withRouter } from "react-router-dom";
//react bootstrap
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
// Phone input custom component
import PhoneTextField from "components/PhoneTextField";

function VerifyPhoneNumber(props) {
  const [values, setValues] = React.useState({
    phone_number: ""
  });

  React.useEffect(() => {
    props.dispatch(phoneVerificationError({}));
  }, []);

  /**
   * Handling Input field changes based on name
   * @param {*} name
   */
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  /**
   * Phone Number will be submited to send verification Code.
   * @param {*} event
   */
  function onPhoneNumberSubmitted(event) {
    event.preventDefault();
    if (props.auth.userData) {
      var postData = {
        email: props.auth.userData.email,
        phone_number: values.phone_number
      };
      props.dispatch(sendVerificationTextMessage(postData));
    }
  }

  return (
    <Form onSubmit={onPhoneNumberSubmitted}>
      {props.verification.verification_failed.status && (
        <Alert variant="danger" dismissible>
          Something went wrong. Try to login again
        </Alert>
      )}
      <h3>Enter your Phone Number</h3>
      <Form.Group>
        <PhoneTextField
          value={values.phone_number}
          onChange={handleChange("phone_number")}
          placeholder="Enter your Phone Number"
          required
        />
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form.Group>
    </Form>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth, verification: state.verification };
}

export default withRouter(connect(mapStateToProps)(VerifyPhoneNumber));
