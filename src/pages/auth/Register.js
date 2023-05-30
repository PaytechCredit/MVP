import React from "react";
// Redux
import { connect } from "react-redux";
import {
  userRegistration,
  clearRegisterError,
  receiveUserData,
  handleRegisterError
} from "_actions/auth";
// Router imports
import { Redirect, withRouter } from "react-router-dom";
// Bootstrap Imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// custom components
import PasswordTextField from "components/PasswordTextField";

function Register(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  });

  React.useEffect(function() {
    props.dispatch(receiveUserData({}));
    props.dispatch(handleRegisterError({}));
  }, []);

  // For handling changes in the inputs
  const handleChange = name => event => {
    const value = event.target.value;
    setValues(values => ({ ...values, [name]: value }));
  };

  // Handling the Signup data and sending it to the service.
  function handleSignUpData(event) {
    event.preventDefault();
    props.dispatch(userRegistration(values));
  }

  if (props.auth.userData.email) {
    return <Redirect to="/verify-email" />;
  } else {
    return (
      <section className="section bg-light-blue">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <div className="paper elevated">
                <h3 className="text-center form-legend">Register</h3>
                <Form
                  onSubmit={handleSignUpData}
                  onLoad={() => props.dispatch(clearRegisterError())}
                  autoComplete="off"
                >
                  {(props.auth.registerError.status === 500 ||
                    props.auth.registerError.status === 400) && (
                    <Form.Group>
                      <Alert
                        variant="danger"
                        onClose={() => props.dispatch(clearRegisterError())}
                        dismissible
                      >
                        {props.auth.registerError.data.message}
                      </Alert>
                    </Form.Group>
                  )}
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={values.first_name}
                      onChange={handleChange("first_name")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={values.last_name}
                      onChange={handleChange("last_name")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email@example.com"
                      value={values.email}
                      onChange={handleChange("email")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <PasswordTextField
                      value={values.password}
                      onChange={handleChange("password")}
                      placeholder="Enter your password"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button type="submit" className="btn btn-primary mt-3">
                      Register
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <p className="text-muted">
                TCPA Consent & Privacy. Notwithstanding any current or prior
                election to opt in or opt out of receiving telemarketing calls
                or SMS messages (including text messages) from Ivy Lender Inc,
                our agents, representatives, affiliates, or anyone calling on
                our behalf, you expressly consent to be contacted by us, our
                agents, representatives, affiliates, or anyone calling on our
                behalf for any and all purposes arising out of or relating to
                your loan and/or account, at any telephone number, or physical
                or electronic address you provide or at which you may be
                reached. You agree we may contact you in any way, including SMS
                messages (including text messages), calls using prerecorded
                messages or artificial voice, and calls and messages delivered
                using auto telephone dialing system or an automatic texting
                system. Automated messages may be played when the telephone is
                answered, whether by you or someone else. In the event that an
                agent or representative calls, he or she may also leave a
                message on your answering machine, voice mail, or send one via
                text.You consent to receive SMS messages (including text
                messages), calls and messages (including prerecorded and
                artificial voice and autodialed) from us, our agents,
                representatives, affiliates or anyone calling on our behalf at
                the specific number(s) you have provided to us, or numbers we
                can reasonably associate with your account (through skip trace,
                caller ID capture or other means), with information or questions
                about your application, loan and/or account. You certify,
                warrant and represent that the telephone numbers that you have
                provided to us are your contact numbers. You represent that you
                are permitted to receive calls at each of the telephone numbers
                you have provided to us. You agree to promptly alert us whenever
                you stop using a particular telephone number.Your cellular or
                mobile telephone provider will charge you according to the type
                of plan you carry. You also agree that we may contact you by
                e-mail, using any email address you have provided to us or that
                you provide to us in the future. We may listen to and/or record
                phone calls between you and our representatives without notice
                to you as permitted by applicable law. For example, we listen to
                and record calls for quality monitoring purposes.
              </p>
              <p className="text-center text-muted">
                © 2019 Powered by Ivy Lender
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(Register));
