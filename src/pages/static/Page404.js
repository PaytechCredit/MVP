import React from "react";
// Router
import { Link } from "react-router-dom";
// Bootstrap Components
import Button from "react-bootstrap/Button";

function Page404() {
  return (
    <div className="text-center">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <p>The Page you are looking for is removed or does not exists.</p>
      <Button variant="primary" to="/" as={Link}>
        Go Home
      </Button>
    </div>
  );
}

export default Page404;
