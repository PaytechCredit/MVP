import React from "react";
//redux
import { connect } from "react-redux";
import { resetPassword, receiveResetPasswordError } from "_actions/auth";
// React router
import { Link, Redirect } from "react-router-dom";
//react bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// local components
import PasswordTextField from "components/PasswordTextField";

function ResetPasswordForm(props) {
  const [values, setValues] = React.useState({
    token: "",
    password: "",
    re_password: ""
  });

  const [alert, setAlert] = React.useState({
    variant: "warning",
    message: "Password does not match",
    switch: false
  });

  function onFormSubmit(event) {
    event.preventDefault();
    if (values.password === values.re_password) {
      setAlert({ ...alert, switch: false });
      var data = {
        token: values.token,
        password: values.password
      };
      props.dispatch(resetPassword(data));
    } else {
      setAlert({ ...alert, switch: true });
    }
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (props.auth.resetPassword.status === "SUCCESS") {
    return <Redirect to="/forgot-password/success" />;
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Alert variant="success">
        We have sent you an email with a token to reset you password.
      </Alert>
      <Alert
        variant={alert.variant}
        show={alert.switch}
        onClick={() => {
          setAlert({ ...alert, switch: false });
        }}
        dismissible
      >
        {alert.message}
      </Alert>
      <Form.Group>
        {props.auth.resetPasswordError.status === 404 && (
          <Alert
            variant="danger"
            onClose={() => {
              receiveResetPasswordError({});
            }}
            dismissible
          >
            {props.auth.resetPasswordError.data.message}
          </Alert>
        )}
      </Form.Group>
      <h3>Reset Password</h3>
      <Form.Group>
        <Form.Label>Token</Form.Label>
        <Form.Control
          type="text"
          value={values.token}
          onChange={handleChange("token")}
          placeholder="Please enter your token from email"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>New Password</Form.Label>
        <PasswordTextField
          name="password"
          value={values.password}
          onChange={handleChange("password")}
          placeholder="New Password"
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          value={values.re_password}
          onChange={handleChange("re_password")}
          placeholder="Confirm New Password"
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>{" "}
        <Button type="submit" variant="light">
          Cancel
        </Button>
      </Form.Group>
      <div className="text-muted">
        <Link className="btn btn-link" to="/login">
          Login as a different user
        </Link>
      </div>
    </Form>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(ResetPasswordForm);
