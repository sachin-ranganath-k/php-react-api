import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

const Loader = () => {
  return (
    <div>
      <MDBSpinner color="primary">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Loader;
