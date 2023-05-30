import React from "react";
// redux
import { connect } from "react-redux";
import {
  handleBusinessOwnerAddress,
  handleApplicationType,
  handleBusinessOwnership
} from "_actions/application";
//Bootstrap Components
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
// Custom Components
import StateSelectBox from "components/StateSelectBox";

function HomeAddress(props) {
  return (
    <div>
      <h4 className="text-center">Home Address</h4>
      <Form>
        <Form.Group>
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            value={
              props.application_details.type.business_owner.address
                .street_address
            }
            onChange={event =>
              props.dispatch(
                handleBusinessOwnerAddress("street_address", event.target.value)
              )
            }
            placeholder="Street Address"
            required
          />
        </Form.Group>
        <Form.Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={
                  props.application_details.type.business_owner.address.city
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessOwnerAddress("city", event.target.value)
                  )
                }
                placeholder="City"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            {props.application_details.type.business_current.country_id ===
            1 ? (
              <Form.Group>
                <Form.Label>State</Form.Label>
                <StateSelectBox
                  countryCode={
                    props.application_details.type.business_current.country_id
                  }
                  placeholder="State"
                  value={
                    props.application_details.type.business_owner.address
                      .state_id
                  }
                  onChange={event =>
                    props.dispatch(
                      handleBusinessOwnerAddress(
                        "state_id",
                        parseInt(event.target.value)
                      )
                    )
                  }
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Province</Form.Label>
                <StateSelectBox
                  countryCode={
                    props.application_details.type.business_current.country_id
                  }
                  placeholder="Province"
                  value={
                    props.application_details.type.business_owner.address
                      .state_id
                  }
                  onChange={event =>
                    props.dispatch(
                      handleBusinessOwnerAddress(
                        "state_id",
                        parseInt(event.target.value)
                      )
                    )
                  }
                  required
                />
              </Form.Group>
            )}
          </Col>
          <Col md={4}>
            {props.application_details.type.business_current.country_id ===
            1 ? (
              <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    props.application_details.type.business_owner.address
                      .zip_code
                  }
                  onChange={event =>
                    props.dispatch(
                      handleBusinessOwnerAddress("zip_code", event.target.value)
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
                    props.application_details.type.business_owner.address
                      .zip_code
                  }
                  onChange={event =>
                    props.dispatch(
                      handleBusinessOwnerAddress("zip_code", event.target.value)
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
          <Col md={4}>
            <Form.Group>
              <Form.Label>Own or Rent</Form.Label>
              <ButtonToolbar>
                <ToggleButtonGroup
                  className="toggle-button-small"
                  type="radio"
                  value={props.application_details.type.home_owned}
                  onChange={value =>
                    props.dispatch(handleApplicationType("home_owned", value))
                  }
                  name="options"
                >
                  <ToggleButton value={false}>RENT</ToggleButton>
                  <ToggleButton value={true}>OWN</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group>
              <Form.Label>How long have you been at this address?</Form.Label>

              <Form.Control
                type="date"
                value={
                  props.application_details.type.business_owner.address
                    .years_at_address
                }
                onChange={event => {
                  props.dispatch(
                    handleBusinessOwnership(
                      "years_at_address",
                      event.target.value
                    )
                  );
                }}
                placeholder="MM-DD-YYYY"
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
    application: state.application,
    application_details: state.application.application_details,
    element: state.element
  };
}

export default connect(mapStateToProps)(HomeAddress);
