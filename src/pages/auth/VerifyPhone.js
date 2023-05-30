import React from "react";
// Custom Components
import { withRouter } from "react-router-dom";
// redux imports
import { connect } from "react-redux";
// local components
import VerifyPhoneNumber from "./VerifyPhoneNumber";
import VerifyPhoneCode from "./VerifyPhoneCode";

function VerifyPhone(props) {
  return (
    <section className="section full-height-page bg-light-blue">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 text-center">
            <div className="paper elevated">
              {props.verification.verification_success.code === 200 ? (
                <VerifyPhoneCode />
              ) : (
                <VerifyPhoneNumber />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth, verification: state.verification };
}

export default withRouter(connect(mapStateToProps)(VerifyPhone));
