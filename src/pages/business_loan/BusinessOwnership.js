import React from "react";
// redux
import { connect } from "react-redux";
import {
  handleApplicationType,
  handleBusinessOwnership
} from "_actions/application";
//Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
// Phone input  custom component
import PhoneTextField from "components/PhoneTextField";
import StateSelectBox from "components/StateSelectBox";
import SocialSecurityField from "components/SocialSecurityField";

function BusinessOwnership(props) {
  return (
    <div>
      <h4 className="text-center">Business Ownership</h4>
      <Form>
        <Form.Group>
          <Form.Label>Do You Own 51% or More?</Form.Label>
          <ButtonToolbar>
            <ToggleButtonGroup
              className="toggle-button-small"
              type="radio"
              name="options"
              value={props.application_details.type.business_owned}
              onChange={value =>
                props.dispatch(handleApplicationType("business_owned", value))
              }
            >
              <ToggleButton value={false}>No</ToggleButton>
              <ToggleButton value={true}>Yes</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <div>
                <Form.Control
                  type="date"
                  value={props.application_details.type.business_owner.dob}
                  onChange={event =>
                    props.dispatch(
                      handleBusinessOwnership("dob", event.target.value)
                    )
                  }
                  placeholder="Driver License"
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Cell Phone Number</Form.Label>
              <PhoneTextField
                type="phone"
                value={
                  props.application_details.type.business_owner.phone_number
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessOwnership("phone_number", event.target.value)
                  )
                }
                placeholder="Cell Phone Number"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {props.application_details.type.business_current.country_id ===
            1 ? (
              <Form.Group>
                <Form.Label>Social Security Number</Form.Label>
                <SocialSecurityField
                  value={props.application_details.type.business_owner.sin}
                  onValueChange={values =>
                    props.dispatch(
                      handleBusinessOwnership("sin", values.formattedValue)
                    )
                  }
                  format="###-##-####"
                  placeholder="Social Security Number"
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Social Insurance Number</Form.Label>
                <SocialSecurityField
                  value={props.application_details.type.business_owner.sin}
                  onValueChange={values =>
                    props.dispatch(
                      handleBusinessOwnership("sin", values.formattedValue)
                    )
                  }
                  format="###-###-###"
                  placeholder="Social Insurance Number"
                  required
                />
              </Form.Group>
            )}
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Driver's License Number</Form.Label>
              <Form.Control
                type="text"
                value={
                  props.application_details.type.business_owner.driver_license
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessOwnership(
                      "driver_license",
                      event.target.value
                    )
                  )
                }
                placeholder="Driver's License Number"
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              {props.application_details.type.business_current.country_id ===
              "US" ? (
                <Form.Label>License Issued State</Form.Label>
              ) : (
                <Form.Label>License Issued Province</Form.Label>
              )}
              <StateSelectBox
                countryCode={
                  props.application_details.type.business_current.country_id
                }
                placeholder="State"
                value={
                  props.application_details.type.business_owner
                    .driver_license_state_id
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessOwnership(
                      "driver_license_state_id",
                      parseInt(event.target.value)
                    )
                  )
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    application: state.application,
    application_details: state.application.application_details,
    element: state.element
  };
}

export default connect(mapStateToProps)(BusinessOwnership);
