import React from "react";
// Redux
import { connect } from "react-redux";
import {
  handleApplicationDetails,
  handleBusinessLocation
} from "_actions/application";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import Col from "react-bootstrap/Col";
// custom component
import PhoneTextField from "components/PhoneTextField";
import DollarIntegerField from "components/DollarIntegerField";

function BusinessLocation(props) {
  return (
    <div>
      <div className="text-center mb-4">
        <h4>Business Location</h4>
        <p>
          Landlord verification completed after acceptance of pre-approval
          offer.
        </p>
      </div>
      <Form>
        <Form.Group>
          <Form.Label>Lease or Own</Form.Label>
          <ButtonToolbar>
            <ToggleButtonGroup
              className="toggle-button-small"
              type="radio"
              name="options"
              value={props.application_details.location_type}
              onChange={value =>
                props.dispatch(handleApplicationDetails("location_type", value))
              }
            >
              <ToggleButton value="leased">Lease</ToggleButton>
              <ToggleButton value="owned">Own</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Form.Group>
        {props.application_details.location_type === "owned" ? (
          // if the business is owned
          <Form.Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Monthly Mortgage Amount</Form.Label>
                <DollarIntegerField
                  value={
                    props.application_details.type.location
                      .monthly_mortgage_amount
                  }
                  onValueChange={values =>
                    props.dispatch(
                      handleBusinessLocation(
                        "monthly_mortgage_amount",
                        parseInt(values.value)
                      )
                    )
                  }
                  placeholder="Monthly Mortgage Amount"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Mortgage Co.</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    props.application_details.type.location.mortgage_company
                  }
                  onChange={event =>
                    props.dispatch(
                      handleBusinessLocation(
                        "mortgage_company",
                        event.target.value
                      )
                    )
                  }
                  placeholder="Mortgage Co."
                  required
                />
              </Form.Group>
            </Col>
          </Form.Row>
        ) : (
          // If business is lease
          <Form.Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Term on Lease</Form.Label>
                <Form.Control
                  type="text"
                  value={props.application_details.type.location.term}
                  onChange={event =>
                    props.dispatch(
                      handleBusinessLocation("term", event.target.value)
                    )
                  }
                  placeholder="ex: 6 years"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Monthly Lease Amount</Form.Label>
                <DollarIntegerField
                  value={
                    props.application_details.type.location
                      .monthly_leased_amount
                  }
                  onValueChange={values =>
                    props.dispatch(
                      handleBusinessLocation(
                        "monthly_leased_amount",
                        parseInt(values.value)
                      )
                    )
                  }
                  placeholder="Monthly Lease Amount"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Landlord Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  value={props.application_details.type.location.landlord_name}
                  onChange={event =>
                    props.dispatch(
                      handleBusinessLocation(
                        "landlord_name",
                        event.target.value
                      )
                    )
                  }
                  placeholder="Landlord Contact First Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Landlord Phone Number</Form.Label>
                <PhoneTextField
                  type="phone"
                  value={props.application_details.type.location.landlord_phone}
                  onChange={event =>
                    props.dispatch(
                      handleBusinessLocation(
                        "landlord_phone",
                        event.target.value
                      )
                    )
                  }
                  placeholder="Landlord Phone Number"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Landlord Email</Form.Label>
                <Form.Control
                  type="email"
                  value={props.application_details.type.location.landlord_email}
                  onChange={event =>
                    props.dispatch(
                      handleBusinessLocation(
                        "landlord_email",
                        event.target.value
                      )
                    )
                  }
                  placeholder="Landlord Email"
                  required
                />
              </Form.Group>
            </Col>
          </Form.Row>
        )}
        <Form.Row />
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

export default connect(mapStateToProps)(BusinessLocation);
