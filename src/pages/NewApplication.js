import React from "react";
// redux
import { connect } from "react-redux";
import {
  handleApplicationDetails,
  applicationSave
} from "_actions/application";
// router
import history from "utils/history";

function NewApplication(props) {
  var loans = props.element.loan_types.map(function(loan) {
    return (
      <div className="col-sm-4 mb-4" key={loan.text}>
        <button
          onClick={selectLoanType}
          className="btn btn-light btn-bordered elevated bg-light-blue"
          disabled={loan.disabled}
        >
          <img src={loan.icon} alt="business loan" width="200px" />
          <h3 className="mt-4">{loan.text}</h3>
          <p>{loan.extra}</p>
        </button>
      </div>
    );
  });

  function selectLoanType() {
    props.dispatch(handleApplicationDetails("loan_type", "business"));
    props.dispatch(
      handleApplicationDetails("first_name", props.auth.userData.first_name)
    );
    props.dispatch(
      handleApplicationDetails("last_name", props.auth.userData.last_name)
    );
    props
      .dispatch(applicationSave(props.application.application_details))
      .then(res => {
        history.push("/application/" + res.data.model.id);
      });
  }

  return (
    <section>
      <div className="section bg-light-blue application-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12">
              <div className="paper elevated">
                <div className="text-center">
                  <h3 className="mb-4">Select Your Loan Process</h3>
                  <div className="row justify-content-center">{loans}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    application: state.application,
    element: state.element,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(NewApplication);
