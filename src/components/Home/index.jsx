import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex" style={{ marginTop: "40vh" }}>
        <Link to={"/customer-register"}>
          <Button variant="success" className="mx-2">
            Customer Register
          </Button>
        </Link>
        <Link to={"/product-register"}>
          <Button variant="success" className="mx-2">
            Product Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
