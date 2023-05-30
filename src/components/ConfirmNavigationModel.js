import React from "react";
// React bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ConfirmNavigationModel(props) {
  return (
    <Modal show={props.when} onHide={props.onCancel}>
      <Modal.Header>
        <Modal.Title>Your Changes will not be saved.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        All your changes in the application will be lost if you quit from the
        application page. Are you sure about it?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Close
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Exit Application
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmNavigationModel;
