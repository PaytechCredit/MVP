import React from "react";
// Redux
import { connect } from "react-redux";
import {
  applicationSave,
  getApplicationDetails,
  handleApplicationStep,
  applicationSubmit,
  mediaDelete
} from "_actions/application";
// Router
import { Redirect, withRouter } from "react-router-dom";
// React Bootstrap
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// custom components
import PaperDropZone from "components/PaperDropzone";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Badge from "react-bootstrap/Badge";

function DocumentUpload(props) {
  const [alertData, setValidationError] = React.useState({
    show: false,
    variant: "",
    message: ""
  });

  const [values, setValues] = React.useState({
    filesList: [],
    disableSave: false
  });

  function handleDocumentDrop(acceptedFiles) {
    console.log(acceptedFiles);
    uploadFiles(acceptedFiles);
  }

  function uploadFiles(filesList) {
    var requests = filesList.map(file => {
      var formData = new FormData();
      formData.append("media_data", file);
      formData.append("mediable_id", props.match.params.application_id);
      return axios.post("/api/v1/media/upload", formData);
    });
    console.log(requests);
    axios.all(requests).then(
      axios.spread(response => {
        props.dispatch(
          getApplicationDetails(props.match.params.application_id)
        );
      })
    );
  }

  const onFileDelete = file_id => event => {
    event.preventDefault();
    props.dispatch(mediaDelete(file_id, props.match.params.application_id));
  };

  // TODO: Need to change
  function onApplicationSubmit(event) {
    event.preventDefault();
    if (props.application_details.media.length > 0) {
      props.dispatch(applicationSubmit(props.match.params.application_id));
    } else {
      setValidationError({
        ...alertData,
        show: true,
        variant: "warning",
        message:
          "You need to upload at least one document to complete the application."
      });
    }
  }

  const files = props.application_details.media.map((file, index) => (
    <li className="list-group-item" key={index}>
      <p className="m-0">
        <a href={file.path} target="_blank">
          {file.name}
        </a>

        <button
          className="btn btn-link p-0 float-right"
          onClick={onFileDelete(file.id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </p>
    </li>
  ));

  function navigateBack(event) {
    if (props.application.applicationStep > 0) {
      props.dispatch(
        handleApplicationStep(props.application.applicationStep - 1)
      );
    }
  }

  if (props.application.applicationSuccess.status === "SUCCESS") {
    return <Redirect to="/application-success" />;
  }

  return (
    <Form onSubmit={onApplicationSubmit}>
      <Form.Group>
        <Alert show={alertData.show} variant={alertData.variant}>
          {alertData.message}
        </Alert>
      </Form.Group>
      <Form.Group>
        <h3>Please Upload the Following Documents:</h3>
        <p>List of Accepted Documents (Label your Files)</p>
        <ul>
          <li>Driver's License Photo or Passport Photo</li>
          <li>Passport Photos (Front and Back)</li>
          <li>Most current 3 Months of Merchant Statements</li>
          <li>Business Incorporation Documents</li>
        </ul>
      </Form.Group>
      <PaperDropZone
        onDrop={handleDocumentDrop}
        accept="image/*, application/pdf"
        multiple
      />
      <Form.Group>
        <h5 className="mt-4">Uploaded Files</h5>
        {props.application_details.media.length <= 0 ? (
          <p>No files are added</p>
        ) : (
          <ul className="list-group">{files}</ul>
        )}
      </Form.Group>
      <Form.Group>
        <button
          type="button"
          className="btn btn-primary btn-rounded"
          onClick={navigateBack}
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary float-right">
          Submit
        </button>
      </Form.Group>
    </Form>
  );
}

function mapStateToProps(state) {
  return {
    element: state.element,
    application: state.application,
    application_details: state.application.application_details
  };
}

export default withRouter(connect(mapStateToProps)(DocumentUpload));
