import React from "react";
//redux
import { connect } from "react-redux";
//router
import { withRouter } from "react-router-dom";
//static assets
import forgotPasswordImg from "assets/img/23.png";
// local component
import ForgotPasswordForm from "forms/ForgotPasswordForm";
import ResetPasswordForm from "forms/ResetPasswordForm";

function ForgetPassword(props) {
  return (
    <section
      className="section bg-light-blue"
      style={{ minHeight: "100vh", height: "auto" }}
    >
      <div className="container">
        <div className="paper elevated">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <img
                src={forgotPasswordImg}
                alt="forgot-password"
                className="rounded mx-auto d-block"
                width="80%"
              />
            </div>
            <div className="col-md-6 pt-4 pb-4">
              {props.auth.forgotPasswordToggle ? (
                <ResetPasswordForm />
              ) : (
                <ForgotPasswordForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(ForgetPassword));
