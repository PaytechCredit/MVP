import React from "react";
// Redux
import { connect } from "react-redux";
import {
  handleApplicationStep,
  handleBusinessCurrent,
  handleBusinessAddress
} from "_actions/application";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// Custom Components
import PhoneTextField from "components/PhoneTextField";
import StateSelectBox from "components/StateSelectBox";

function BusinessAddress(props) {
  return (
    <div>
      <h4 className="text-center">Business Address</h4>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                value={
                  props.application_details.type.business_current.address
                    .street_address
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessAddress("street_address", event.target.value)
                  )
                }
                placeholder="Street Address"
                required
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={
                  props.application_details.type.business_current.address.city
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessAddress("city", event.target.value)
                  )
                }
                placeholder="City"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              {props.application_details.type.business_current.country_id ===
              1 ? (
                <Form.Label>State</Form.Label>
              ) : (
                <Form.Label>Province</Form.Label>
              )}
              <StateSelectBox
                countryCode={
                  props.application_details.type.business_current.country_id
                }
                placeholder="State"
                value={
                  props.application_details.type.business_current.address
                    .state_id
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessAddress(
                      "state_id",
                      parseInt(event.target.value)
                    )
                  )
                }
                required
              />
            </Form.Group>
          </Col>
          <Col>
            {props.application_details.type.business_current.country_id ===
            1 ? (
              <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    props.application_details.type.business_current.address
                      .zip_code
                  }
                  onChange={event =>
                    props.dispatch(
                      handleBusinessAddress("zip_code", event.target.value)
                    )
                  }
                  placeholder="Zip Code"
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    props.application_details.type.business_current.address
                      .zip_code
                  }
                  onChange={event =>
                    props.dispatch(
                      handleBusinessAddress("zip_code", event.target.value)
                    )
                  }
                  placeholder="Postal Code"
                  required
                />
              </Form.Group>
            )}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Business Phone</Form.Label>
              <PhoneTextField
                className="business-phone"
                type="phone"
                value={
                  props.application_details.type.business_current.phone_number
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("phone_number", event.target.value)
                  )
                }
                placeholder="Business Phone"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Company Website</Form.Label>
              <Form.Control
                type="url"
                value={
                  props.application_details.type.business_current
                    .company_website
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("company_website", event.target.value)
                  )
                }
                placeholder="Company Website"
                required
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Business Email</Form.Label>
              <Form.Control
                type="email"
                value={props.application_details.type.business_current.email}
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("email", event.target.value)
                  )
                }
                placeholder="Business Email"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>How long have you been at this address?</Form.Label>
              <Form.Control
                type="date"
                value={
                  props.application_details.type.business_current
                    .years_at_address
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent(
                      "years_at_address",
                      event.target.value
                    )
                  )
                }
                placeholder="MM-DD-YYYY"
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

export default connect(mapStateToProps)(BusinessAddress);
