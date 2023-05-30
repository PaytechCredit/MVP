import React from "react";
// React router
import { Redirect, withRouter } from "react-router-dom";
// Redux actions
import { connect } from "react-redux";
import {
  authCodeVerification,
  resendVerificationEmail
} from "_actions/verification";
import { receiveUserDataError } from "_actions/auth";
// React Bootstrap
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// React Code Input
import ReactCodeInput from "react-code-input";

function VerifyEmail(props) {
  const [values, setValues] = React.useState({
    verificationCode: "",
    resend_response: null
  });
  function onCodeChange(value) {
    setValues({ ...values, verificationCode: value });
  }
  function handleAuthCodeVerification(event) {
    event.preventDefault();
    props.dispatch(authCodeVerification(values.verificationCode));
  }

  function resendCode(event) {
    var data = {
      email: props.auth.userData.email
    };
    props
      .dispatch(resendVerificationEmail(data))
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

  if (props.verification.authCodeResponse.code === 200) {
    return <Redirect to="/verify-phone" />;
  } else if (!props.auth.userData.email) {
    return <Redirect to="/register" />;
  } else {
    return (
      <section className="section full-height-page bg-light-blue">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <div className="paper elevated">
                {values.resend_response !== null && (
                  <Form.Group>
                    <Alert
                      variant={values.resend_response.variant}
                      onClose={() =>
                        setValues({ ...values, resend_response: null })
                      }
                      dismissible
                    >
                      {values.resend_response.message}
                    </Alert>
                  </Form.Group>
                )}
                {props.auth.userDataError.status && (
                  <Form.Group>
                    <Alert
                      variant="danger"
                      onClose={() => props.dispatch(receiveUserDataError({}))}
                      dismissible
                    >
                      Verification Code is Invalid or expired.
                    </Alert>
                  </Form.Group>
                )}
                <h3 className="text-center">
                  We have Sent you a verification Code to your email.
                </h3>
                <p className="text-center">Enter you code.</p>
                <Form
                  onSubmit={handleAuthCodeVerification}
                  className="text-center"
                >
                  <Form.Group>
                    <ReactCodeInput
                      type="text"
                      fields={6}
                      value={values.verificationCode}
                      onChange={onCodeChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="link" onClick={resendCode}>
                      Resend Email
                    </Button>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, verification: state.verification };
}

export default withRouter(connect(mapStateToProps)(VerifyEmail));
