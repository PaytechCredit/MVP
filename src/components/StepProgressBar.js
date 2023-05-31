import React from "react";
//redux
import { connect } from "react-redux";
import { handleApplicationStep } from "_actions/application";
// react bootstrap
import ProgressBar from "react-bootstrap/ProgressBar";
// font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StepProgressBar(props) {
  // const steps =
  const steps = props.element.application_steps_list.map((item, index) => {
    return (
      <div className="col" key={item.key}>
        <button
          className={
            "btn btn-progress-bar " +
            (props.application.applicationStep === item.key && "active")
          }
          onClick={() => {
            props.dispatch(handleApplicationStep(item.key));
          }}
        >
          <FontAwesomeIcon icon={item.icon} style={{ fontSize: "24px" }} />
          <span
            className="d-sm-none d-md-block mb-0"
            style={{ fontSize: "11px" }}
          >
            {item.name}
          </span>
        </button>
      </div>
    );
  });
  return (
    <div className="pt-2 pb-2">
      <div className="form-row mb-2 pl-4 pr-4">{steps}</div>
      <ProgressBar now={props.application.applicationStep + 1} max={10} />
    </div>
  );
}

function mapStateToProps(state) {
  return { application: state.application, element: state.element };
}

export default connect(mapStateToProps)(StepProgressBar);
