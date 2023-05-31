import React from "react";
// react router
import { Link } from "react-router-dom";
//static assets
import forgotPasswordImg from "assets/img/23.png";

function ResetPasswordSuccess(props) {
  return (
    <section className="section pt-2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="paper text-center">
              <div className="form-group">
                <img
                  src={forgotPasswordImg}
                  alt="forgot-password"
                  className="rounded mx-auto d-block"
                  width="80%"
                />
                <h3>You are password has changed successfully.</h3>
              </div>
              <div className="form-group ">
                <Link to="/dashboard">
                  <button className="btn btn-primary">Go Home</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordSuccess;
