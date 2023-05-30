import React from "react";
// Redux
import { connect } from "react-redux";
import {
  userLogin,
  clearLoginError,
  handleLoginError,
  receiveUserData
} from "_actions/auth";
// Router
import { withRouter, Link } from "react-router-dom";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// custom components
import PasswordTextField from "components/PasswordTextField";

function LogIn(props) {
  // Form states
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    userLoginResponse: {}
  });

  React.useEffect(function() {
    props.dispatch(receiveUserData({}));
    props.dispatch(handleLoginError({}));
  }, []);

  // For handling changes in the inputs
  const handleChange = name => event => {
    const value = event.target.value;
    setValues(values => ({ ...values, [name]: value }));
  };

  // Handling the login data and sending it to the service.
  function handleLoginData(event) {
    event.preventDefault();
    // Creating post Data
    var postData = {
      email: values.email,
      password: values.password
    };
    props
      .dispatch(userLogin(postData))
      .then(userData => {
        if (userData.email_verified_at === null) {
          props.history.push("/verify-email");
        } else if (userData.sms_verified_at === null) {
          props.history.push("/verify-phone");
        } else if (sessionStorage.getItem("token")) {
          props.history.push("/dashboard");
        }
      })
      .catch(error => {});
  }

  return (
    <section className="section bg-light-blue full-height-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="paper">
              <h3 className="text-center form-legend">Login</h3>
              <Form onSubmit={handleLoginData}>
                {props.auth.loginError.status && (
                  <Form.Group>
                    <Alert
                      variant="danger"
                      onClose={() => props.dispatch(clearLoginError())}
                      dismissible
                    >
                      {props.auth.loginError.data.message}
                    </Alert>
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <PasswordTextField
                    name="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </Form.Group>
                <Form.Group>
                  <Button type="submit">Login</Button>
                </Form.Group>
                <Form.Group>
                  <span>Dont Have an Account</span>
                  <br />
                  <Link to="/register">Sign Up Now</Link>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-muted pt-5">
        © 2019 Powered by Ivy Lender
      </p>
    </section>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(LogIn));
