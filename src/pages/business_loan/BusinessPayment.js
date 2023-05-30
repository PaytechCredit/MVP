import React from "react";
// Redux
import { connect } from "react-redux";
import {
  handleApplicationDetails,
  handleCreditCardAcceptance,
  handleCashAdvance,
  handleApplicationType
} from "_actions/application";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
// Custom Component
import DollarIntegerField from "components/DollarIntegerField";

function BusinessPayment(props) {
  return (
    <div>
      <h4 className="text-center">Business Financial Details</h4>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Do you Accept Credit Cards?</Form.Label>
              <ButtonToolbar>
                <ToggleButtonGroup
                  className="toggle-button-small"
                  type="radio"
                  name="options"
                  value={props.application_details.is_credit_card_acceptance}
                  onChange={value =>
                    props.dispatch(
                      handleApplicationDetails(
                        "is_credit_card_acceptance",
                        value
                      )
                    )
                  }
                >
                  <ToggleButton value={false}>No</ToggleButton>
                  <ToggleButton value={true}>Yes</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Form.Group>
          </Col>
        </Form.Row>
        {props.application_details.is_credit_card_acceptance && (
          <Form.Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Credit Card Processor</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    props.application_details.type.business_current
                      .credit_card_acceptance.processor
                  }
                  onChange={event =>
                    props.dispatch(
                      handleCreditCardAcceptance(
                        "processor",
                        event.target.value
                      )
                    )
                  }
                  placeholder="Credit Card Processor"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Average Monthly Visa/Master Card/Discover Volume
                </Form.Label>
                <DollarIntegerField
                  value={
                    props.application_details.type.business_current
                      .credit_card_acceptance.average_monthly_volume
                  }
                  onValueChange={values =>
                    props.dispatch(
                      handleCreditCardAcceptance(
                        "average_monthly_volume",
                        parseInt(values.value)
                      )
                    )
                  }
                  placeholder="Enter Approx. Volume"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Average Monthly American Express Volume</Form.Label>
                <DollarIntegerField
                  value={
                    props.application_details.type.business_current
                      .credit_card_acceptance
                      .average_monthly_volume_american_express
                  }
                  onValueChange={values =>
                    props.dispatch(
                      handleCreditCardAcceptance(
                        "average_monthly_volume_american_express",
                        parseInt(values.value)
                      )
                    )
                  }
                  placeholder="Enter Approx. Volume"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Average Ticket</Form.Label>
                <DollarIntegerField
                  value={
                    props.application_details.type.business_current
                      .credit_card_acceptance.average_ticket
                  }
                  onValueChange={values =>
                    props.dispatch(
                      handleCreditCardAcceptance(
                        "average_ticket",
                        parseInt(values.value)
                      )
                    )
                  }
                  placeholder="Average Ticket"
                  required
                />
              </Form.Group>
            </Col>
          </Form.Row>
        )}
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Do You Currently Have Cash Advance?</Form.Label>
              <ButtonToolbar>
                <ToggleButtonGroup
                  className="toggle-button-small"
                  type="radio"
                  name="options"
                  value={props.application_details.is_cash_advance}
                  onChange={value => {
                    props.dispatch(
                      handleApplicationDetails("is_cash_advance", value)
                    );
                  }}
                >
                  <ToggleButton value={false}>No</ToggleButton>
                  <ToggleButton value={true}>Yes</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Form.Group>
          </Col>
        </Form.Row>
        {props.application_details.is_cash_advance && (
          <Form.Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>With Who?</Form.Label>
                <Form.Control
                  type="text"
                  value={props.application_details.type.cash_advance.provider}
                  onChange={event =>
                    props.dispatch(
                      handleCashAdvance("provider", event.target.value)
                    )
                  }
                  placeholder="With Who?"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>What is your Outstanding Balance?</Form.Label>
                <DollarIntegerField
                  value={
                    props.application_details.type.cash_advance.standing_balance
                  }
                  onValueChange={values =>
                    props.dispatch(
                      handleCashAdvance(
                        "standing_balance",
                        parseInt(values.value)
                      )
                    )
                  }
                  placeholder="Outstanding Balance"
                  required
                />
              </Form.Group>
            </Col>
          </Form.Row>
        )}
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Gross Annual Sales</Form.Label>
              <DollarIntegerField
                value={props.application_details.type.gross_annual_sale}
                onValueChange={values =>
                  props.dispatch(
                    handleApplicationType(
                      "gross_annual_sale",
                      parseInt(values.value)
                    )
                  )
                }
                placeholder="Gross Annual Sales"
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
  console.log(state);
  return {
    element: state.element,
    application: state.application,
    application_details: state.application.application_details
  };
}

export default connect(mapStateToProps)(BusinessPayment);
