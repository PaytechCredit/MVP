import React from "react";
// redux
import { connect } from "react-redux";
import {
  authCodeVerification,
  resendVerificationSMS
} from "_actions/verification";
import { receiveUserDataError } from "_actions/auth";
// react router
import { withRouter } from "react-router-dom";
// React bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// React Code Input
import ReactCodeInput from "react-code-input";

/**
 * This Component is a part of Phone number code verification
 */
function VerifyPhoneCode(props) {
  const [values, setValues] = React.useState({
    verification_code: "",
    resend_response: null
  });
  function onCodeChange(value) {
    setValues({ ...values, verification_code: value });
  }

  function onPhoneCodeVerified(event) {
    event.preventDefault();
    props.dispatch(authCodeVerification(values.verification_code));
  }

  function resendVerificationCode(event) {
    event.preventDefault();
    var data = {
      phone_number: props.auth.userData.phone_number,
      email: props.auth.userData.email
    };
    props
      .dispatch(resendVerificationSMS(data))
      .then(responseData => {
        console.log(responseData);
        setValues({
          ...values,
          resend_response: { message: responseData.message, variant: "success" }
        });
      })
      .catch(errorData => {
        setValues({
          ...values,
          resend_response: { message: errorData.message, variant: "danger" }
        });
      });
  }

  return (
    <Form onSubmit={onPhoneCodeVerified}>
      {values.resend_response !== null && (
        <Form.Group>
          <Alert
            variant={values.resend_response.variant}
            onClose={() => setValues({ ...values, resend_response: null })}
            dismissible
          >
            {values.resend_response.message}
          </Alert>
        </Form.Group>
      )}
      {props.auth.userDataError.status === 404 && (
        <Form.Group>
          <Alert
            variant="danger"
            onClose={() => props.dispatch(receiveUserDataError({}))}
            dismissible
          >
            Incorrect verification Code, Try Again.
          </Alert>
        </Form.Group>
      )}
      <h3>
        We have sent you an text message to you mobile please verify the code.
      </h3>
      <Form.Group>
        <ReactCodeInput
          type="text"
          fields={6}
          value={values.verificationCode}
          onChange={onCodeChange}
        />
      </Form.Group>
      <Form.Group>
        <Button type="button" variant="link" onClick={resendVerificationCode}>
          Resend SMS
        </Button>
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

export default withRouter(connect(mapStateToProps)(VerifyPhoneCode));
