import React from "react";
// Redux
import { connect } from "react-redux";
import {
  getApplicationDetails,
  handleApplicationDetails,
  handleBusinessCurrent,
  handleApplicationType,
  handleApplicationStep,
  applicationUpdate
} from "_actions/application";
// Router
// import { Prompt } from "react-router-dom";
import history from "utils/history";
// Application Process Steps
import PersonalInfo from "pages/business_loan/PersonalInfo";
import BusinessInfo from "./business_loan/BusinessInfo";
import BusinessAddress from "./business_loan/BusinessAddress";
import BusinessPayment from "./business_loan/BusinessPayment";
import BusinessLocation from "./business_loan/BusinessLocation";
import BusinessOwnership from "./business_loan/BusinessOwnership";
import HomeAddress from "./business_loan/HomeAddress";
import DocumentUpload from "./business_loan/DocumentUpload";
import SignatureAndTerms from "./business_loan/SignatureAndTerms";
import BankAccountVerification from "./business_loan/BankAccountVerification";
// Custom Components
import ConfirmNavigationModel from "components/ConfirmNavigationModel";
import NavigationPrompt from "react-router-navigation-prompt";
import StepProgressBar from "components/StepProgressBar";

function ApplicationWalkThrough(props) {
  React.useEffect(() => {
    props.dispatch(getApplicationDetails(props.match.params.application_id));
  }, []);

  const signatureCanvas = React.createRef();

  function navigateBack(event) {
    if (props.application.applicationStep > 0) {
      props.dispatch(
        handleApplicationStep(props.application.applicationStep - 1)
      );
    }
  }

  function navigateNext() {
    if (props.application.applicationStep < 9) {
      props.dispatch(
        handleApplicationStep(props.application.applicationStep + 1)
      );
    }
  }

  function onApplicationUpdate(event) {
    console.log(
      JSON.stringify({
        ...props.application.application_details,
        new_business_current: false,
        signature: {
          value: props.application.application_details.signature.value
        }
      })
    );
    props
      .dispatch(
        applicationUpdate({
          ...props.application.application_details,
          new_business_current: false,
          signature: {
            value: props.application.application_details.signature.value
          }
        })
      )
      .then(responseData => {
        navigateNext();
      })
      .catch(errorData => {
        console.log(errorData);
      });
  }

  function onApplicationSignatureUpdate(event) {
    props
      .dispatch(
        applicationUpdate({
          ...props.application.application_details,
          new_business_current: false,
          signature: {
            value: signatureCanvas.current.getSaveData()
          }
        })
      )
      .then(responseData => {
        navigateNext();
      })
      .catch(errorData => {
        console.log(errorData);
      });
  }

  return (
    <div className="section bg-light-blue application-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12">
            <div className="paper elevated">
              <h3 className="text-center">
                Your Funding Is Just A Few Minutes Away!
              </h3>
              <p className="text-center">
                This Online Application Takes Less Than 5 minutes! See what you
                qualify for today.
              </p>
              <NavigationPrompt
                when={
                  props.application.applicationStep >= 1 &&
                  props.application.applicationStep < 9
                }
              >
                {({ onConfirm, onCancel }) => (
                  <ConfirmNavigationModel
                    when={true}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                  />
                )}
              </NavigationPrompt>
              <StepProgressBar />

              <div className="a-step-container" style={{ minHeight: "300px" }}>
                {props.application.applicationStep === 0 && <PersonalInfo />}
                {props.application.applicationStep === 1 && <BusinessInfo />}
                {props.application.applicationStep === 2 && <BusinessAddress />}
                {props.application.applicationStep === 3 && <BusinessPayment />}
                {props.application.applicationStep === 4 && (
                  <BusinessLocation />
                )}
                {props.application.applicationStep === 5 && (
                  <BusinessOwnership />
                )}
                {props.application.applicationStep === 6 && <HomeAddress />}
                {props.application.applicationStep === 7 && (
                  <div>
                    <SignatureAndTerms signatureCanvas={signatureCanvas} />

                    <div>
                      <button
                        className="btn btn-primary btn-rounded"
                        onClick={navigateBack}
                      >
                        Back
                      </button>
                      <button
                        className="btn btn-primary float-right btn-rounded"
                        onClick={onApplicationSignatureUpdate}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {props.application.applicationStep === 8 && (
                  <div>
                    <BankAccountVerification />
                    <div>
                      <button
                        className="btn btn-primary btn-rounded"
                        onClick={navigateBack}
                      >
                        Back
                      </button>
                      <button
                        className="btn btn-secondary btn-rounded float-right"
                        onClick={navigateNext}
                      >
                        Skip this step
                      </button>
                    </div>
                  </div>
                )}
                {props.application.applicationStep === 9 && <DocumentUpload />}
              </div>
              {props.application.applicationStep < 7 && (
                <div className="form-group">
                  {props.application.applicationStep > 0 && (
                    <button
                      className="btn btn-primary btn-rounded"
                      onClick={navigateBack}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary btn-rounded float-right"
                    onClick={onApplicationUpdate}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { application: state.application };
}

export default connect(mapStateToProps)(ApplicationWalkThrough);
