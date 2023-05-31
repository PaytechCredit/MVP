import React from "react";
//react router
import { Link } from "react-router-dom";

function EmailVerificationSuccess(props) {
  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h3>Your Email is verified</h3>
            <p>You can start using your app, by loggin in.</p>
            <Link to="/login" className="btn btn-info">
              Go to Login Page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailVerificationSuccess;
