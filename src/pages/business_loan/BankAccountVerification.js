import React from "react";
// react redux
import { connect } from "react-redux";
import { handleApplicationStep } from "_actions/application";
//react bootstrap
import Button from "react-bootstrap/Button";
// Plaid import
import PlaidLink from "react-plaid-link";

function BankAccountVerification(props) {
  function handleExit() {
    console.log("onexit");
  }

  function skipThisStep() {
    props.dispatch(
      handleApplicationStep(props.application.applicationStep + 1)
    );
  }

  function handleSuccess() {
    skipThisStep();
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10 text-center">
            <h3>Link You Bank Account</h3>
            <p>Please Authenticate your bank account for verification</p>
            <PlaidLink
              clientName="Ivy Lender"
              env="sandbox"
              product={["auth"]}
              publicKey="ea701ca959a1d84ff1aeedfc0f97a1"
              onExit={handleExit}
              onSuccess={handleSuccess}
              className="btn-plaid"
            >
              Connect your Bank!
            </PlaidLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return { application: state.application };
}

export default connect(mapStateToProps)(BankAccountVerification);
