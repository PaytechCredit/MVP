import React from "react";
// redux
import { connect } from "react-redux";
import {
  handleApplicationStep,
  handleApplicationDetails,
  handleBusinessCurrent,
  handleApplicationType
} from "_actions/application";
// Static Imports
import usFlag from "assets/img/flags/us-flag.png";
import canadaFlag from "assets/img/flags/canada-flag.png";
// Bootstrap Components
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import FederalTaxTextField from "components/FederalTaxTextField";
// react date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// moment
import moment from "moment";
import { inherits } from "util";

function BusinessInfo(props) {
  var business_type_options = props.element.business_types.map(function(
    item,
    index
  ) {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  return (
    <div>
      <h3 className="text-center">Business Information</h3>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Legal Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Legal Name"
                value={
                  props.application_details.type.business_current.legal_name
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("legal_name", event.target.value)
                  )
                }
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>DBA Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="DBA Name"
                value={props.application_details.type.business_current.dba_name}
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("dba_name", event.target.value)
                  )
                }
                required
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Legal Structure</Form.Label>

              <Form.Check
                className="inlineRadio"
                type="radio"
                name="legal_structure"
                label="Corporate"
                value="Corporate"
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("legal_structure", event.target.value)
                  )
                }
                checked={
                  props.application_details.type.business_current
                    .legal_structure === "Corporate"
                }
                required
              />
              <Form.Check
                className="inlineRadio"
                type="radio"
                name="legal_structure"
                value="LLC"
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("legal_structure", event.target.value)
                  )
                }
                checked={
                  props.application_details.type.business_current
                    .legal_structure === "LLC"
                }
                label="LLC"
              />
              <Form.Check
                className="inlineRadio"
                type="radio"
                name="legal_structure"
                value="S-Corp"
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("legal_structure", event.target.value)
                  )
                }
                checked={
                  props.application_details.type.business_current
                    .legal_structure === "S-Corp"
                }
                label="S-Corp"
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>U.S. or Canadian Business</Form.Label>
              <ButtonToolbar className="justify-content-center">
                <ToggleButtonGroup
                  className="btn-group-toggle-large"
                  type="radio"
                  name="options"
                  value={
                    props.application_details.type.business_current.country_id
                  }
                  onChange={value =>
                    props.dispatch(handleBusinessCurrent("country_id", value))
                  }
                  style={{ width: "100%" }}
                >
                  <ToggleButton
                    value={1}
                    className="btn-lg"
                    style={{ fontSize: "16px" }}
                  >
                    <img
                      src={usFlag}
                      className="img-fluid"
                      alt="usFlag"
                      width="36px"
                      height="36px"
                    />
                    &nbsp;USA
                  </ToggleButton>
                  <ToggleButton
                    value={2}
                    className="btn-lg"
                    style={{ fontSize: "16px" }}
                  >
                    <img
                      src={canadaFlag}
                      className="img-fluid"
                      alt="canadaFlag"
                      width="36px"
                      height="36px"
                    />
                    &nbsp;CANADA
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Federal Tax ID / EIN</Form.Label>
              <FederalTaxTextField
                value={props.application_details.type.federal_tax_number}
                onChange={event => {
                  props.dispatch(
                    handleApplicationType(
                      "federal_tax_number",
                      event.target.value
                    )
                  );
                  event.persist();
                }}
                placeholder="Federal Tax ID / EIN #(12-3456789)"
                required
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>When did you first start your Business?</Form.Label>
              <Form.Control
                type="date"
                value={
                  props.application_details.type.business_current
                    .years_in_business
                }
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent(
                      "years_in_business",
                      event.target.value
                    )
                  )
                }
                placeholder="MM-DD-YYYY"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Type of Business</Form.Label>
              <Form.Control
                as="select"
                value={props.application_details.type.business_current.type}
                onChange={event =>
                  props.dispatch(
                    handleBusinessCurrent("type", event.target.value)
                  )
                }
                required
              >
                <option value="" defaultValue hidden>
                  Choose Here...
                </option>
                {business_type_options}
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        {props.application_details.type.business_current.type === "Other" && (
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>If Other, Please Specify?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="If Other, Please specify here..."
                  onChange={event =>
                    props.dispatch(
                      handleBusinessCurrent(
                        "if_other_business_type",
                        event.target.value
                      )
                    )
                  }
                />
              </Form.Group>
            </Col>
          </Form.Row>
        )}
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

export default connect(mapStateToProps)(BusinessInfo);
