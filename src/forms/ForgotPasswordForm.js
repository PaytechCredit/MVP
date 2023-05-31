import React from "react";
//redux
import { connect } from "react-redux";
import { forgetPassword, receiveForgotPasswordError } from "_actions/auth";
// React router
import { Link } from "react-router-dom";
//react bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function ForgotPasswordForm(props) {
  const [values, setValues] = React.useState({
    email: ""
  });

  function onFormSubmit(event) {
    event.preventDefault();
    var postData = {
      email: values.email
    };
    props.dispatch(forgetPassword(postData));
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group>
        {props.auth.forgotPasswordError.status === "ERROR" && (
          <Alert
            variant="danger"
            onClose={() => {
              receiveForgotPasswordError({});
            }}
            dismissible
          >
            Email Doesn't exist please try again with another.
          </Alert>
        )}
      </Form.Group>
      <h3>Reset Your Password</h3>
      <Form.Group>
        <Form.Label>
          Please enter your email address below to receive a link to reset your
          password.
        </Form.Label>
        <Form.Control
          type="email"
          value={values.email}
          onChange={event => {
            setValues({ ...values, email: event.target.value });
          }}
          placeholder="Email"
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form.Group>
      <div className="text-muted">
        <Link className="btn btn-link" to="/login">
          Back to Login
        </Link>
      </div>
    </Form>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(ForgotPasswordForm);
