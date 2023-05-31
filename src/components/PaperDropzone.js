import React from "react";
// React Dropdown
import Dropzone from "react-dropzone";
// bootstrap components
import Button from "react-bootstrap/Button";

function PaperDropzone({ ...props }) {
  return (
    <Dropzone {...props}>
      {({ getRootProps, getInputProps }) => (
        <div className="paperDropzone text-center" {...getRootProps()}>
          <input {...getInputProps()} />
          <p style={{ marginBottom: "2px" }}>Drag & Drop</p>
          <Button variant="primary">or browse</Button>
          <p className="mb-0">Upload Your document here...</p>
        </div>
      )}
    </Dropzone>
  );
}

export default PaperDropzone;
