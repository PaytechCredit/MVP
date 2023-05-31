import React from "react";
// Redux
import { connect } from "react-redux";
import {
  handleApplicationStep,
  handleApplicationDetails,
  handleApplicationSignature,
  applicationUpdate
} from "_actions/application";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// React Canvas Draw
import CanvasDraw from "react-canvas-draw";
// lodash
import _ from "lodash";

function SignatureAndTerms(props) {
  const [validationError, setValidationError] = React.useState({
    isError: false,
    variant: "",
    errorMessage: ""
  });

  React.useEffect(() => {
    const signatureValue =
      props.application.application_details.signature.value;

    if (_.isEmpty(signatureValue)) {
      props.dispatch(
        applicationUpdate({
          ...props.application.application_details,
          new_business_current: false,
          signature: {
            ...props.application.application_details.signature,
            value: props.signatureCanvas.current.getSaveData()
          }
        })
      );
    } else {
      props.signatureCanvas.current.loadSaveData(signatureValue);
    }
  }, []);

  function clearSignature() {
    props.signatureCanvas.current.clear();
    props.dispatch(
      handleApplicationSignature(props.signatureCanvas.current.getSaveData())
    );
  }

  return (
    <div>
      <Form>
        <Form.Group>
          <Alert
            show={validationError.isError}
            variant={validationError.variant}
          >
            {validationError.errorMessage}
          </Alert>
        </Form.Group>
        <Form.Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Signature</Form.Label>
              <div>
                <Button variant="light" onClick={clearSignature}>
                  Clear
                </Button>
              </div>
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group>
              <CanvasDraw
                ref={props.signatureCanvas}
                hideGrid={true}
                brushRadius={3}
                canvasWidth="100%"
                canvasHeight="160px"
                className="bordered"
                clear={clearSignature}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Label>
            Are there any pending, threatened or recently filed claims,
            judgments, or liens?
          </Form.Label>
          <ButtonToolbar>
            <ToggleButtonGroup
              className="toggle-button-small"
              type="radio"
              name="options"
              value={props.application_details.pending_claims}
              onChange={value =>
                props.dispatch(
                  handleApplicationDetails("pending_claims", value)
                )
              }
            >
              <ToggleButton value={false}>No</ToggleButton>
              <ToggleButton value={true}>Yes</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Are you contemplating a bankruptcy filing, reorganization, or sale
            of business?
          </Form.Label>
          <ButtonToolbar>
            <ToggleButtonGroup
              className="toggle-button-small"
              type="radio"
              name="options"
              value={props.application_details.pending_bankruptcy}
              onChange={value =>
                props.dispatch(
                  handleApplicationDetails("pending_bankruptcy", value)
                )
              }
            >
              <ToggleButton value={false}>No</ToggleButton>
              <ToggleButton value={true}>Yes</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Form.Group>
        <Form.Group>
          <p className="text-justify text-muted">
            By signing below, each of the above listed Business
            Owner(s)/Officer(s)/Principal(s) and Business (individually and
            collectively, “You”) certify that all information and documents
            submitted in connection with this Funding Application
            ("Application") are accurate, true, correct and complete; and that
            You will immediately notify Ivy Lender Inc (“IVY”) or any of its
            representatives, successors, assigns, designees, agents, partners or
            affiliates ("Recipients") of any change in such information or
            financial condition. You acknowledge that any false statements may
            be considered fraud. You acknowledge that the Recipients are relying
            on the information You provide. You further authorize IVY and each
            of the Recipients that may be involved with or acquire commercial
            loans having daily repayment features or purchases of future
            receivables including Merchant Cash Advance transactions
            (collectively, “Transactions”) to obtain consumer or personal,
            business and investigative reports and other information about You,
            including, but not limited to credit card processor statements and
            bank statements, from one or more consumer reporting agencies, such
            as TransUnion, Experian and Equifax, and from other credit bureaus,
            banks, financial institutions, creditors and other third parties.
            You authorize Recipients to receive relevant information regarding
            the commercial lease for the above-referenced premises from our
            leasing company and/or agent. You also authorize IVY to transmit
            this Application, along with any of the foregoing information
            obtained in connection with this Application, to any or all of the
            Recipients for the foregoing purposes. A photocopy of the
            Application will be deemed acceptable for release of credit and/or
            investigatory information.
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="By Clicking the submit button, I agree to terms & conditions."
            required
          />
        </Form.Group>
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

export default connect(mapStateToProps)(SignatureAndTerms);
