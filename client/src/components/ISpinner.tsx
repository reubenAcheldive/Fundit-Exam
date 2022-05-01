import React from "react";
import { Spinner } from "react-bootstrap";

export const ISpinner = () => {
  return (
    <div>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
