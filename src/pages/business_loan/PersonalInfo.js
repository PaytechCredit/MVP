import React from "react";
// Redux
import { connect } from "react-redux";
import {
  handleApplicationStep,
  handleApplicationDetails,
  applicationSave
} from "_actions/application";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ApplicationInfo(props) {
  var borrow_amount_options = props.element.borrow_amount_list.map(function(
    item,
    index
  ) {
    return (
      <option value={item.value} key={index}>
        {item.text}
      </option>
    );
  });

  var loan_purpose_options = props.element.loan_purpose_list.map(function(
    item,
    index
  ) {
    return (
      <option value={item.text} key={index}>
        {item.text}
      </option>
    );
  });

  // Render
  return (
    <div>
      <h3 className="text-center">Fill in Your Personal Information</h3>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>How Much Would You Like To Borrow?</Form.Label>
              <Form.Control
                as="select"
                value={props.application_details.borrow_amount}
                onChange={event => {
                  props.dispatch(
                    handleApplicationDetails(
                      "borrow_amount",
                      event.target.value
                    )
                  );
                }}
                required
              >
                <option value="" defaultValue hidden>
                  Choose Here...
                </option>
                {borrow_amount_options}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>How Will You Use The Money?</Form.Label>
              <Form.Control
                as="select"
                value={props.application_details.purpose}
                onChange={event => {
                  props.dispatch(
                    handleApplicationDetails("purpose", event.target.value)
                  );
                }}
                required
              >
                <option value="" defaultValue hidden>
                  Choose Here...
                </option>
                {loan_purpose_options}
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={props.application_details.first_name}
                onChange={event => {
                  props.dispatch(
                    handleApplicationDetails("first_name", event.target.value)
                  );
                }}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={props.application_details.last_name}
                onChange={event => {
                  props.dispatch(
                    handleApplicationDetails("last_name", event.target.value)
                  );
                }}
                placeholder="Last Name"
                required
              />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    element: state.element,
    application: state.application,
    application_details: state.application.application_details
  };
}
export default connect(mapStateToProps)(ApplicationInfo);
