import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const user = window.sessionStorage.getItem("user");

  const onLoginClick = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/login`,
        userDetails
      );
      if (res.data.message._id) {
        window.sessionStorage.setItem(
          "user",
          JSON.stringify({
            email: res.data.message.email,
            role: res.data.message.role,
          })
        );
        navigate(`/dashboard`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      navigate(`/dashboard`, { replace: true });
    }
  }, []);
  return (
    <>
      <div
        style={{ height: "80vh" }}
        className="w-100   d-flex justify-content-center align-items-center"
      >
        <Card style={{ height: "40vh", width: "400px" }} className="">
          <Card.Header className="px-1 py-1 text-center">
            <h6 className="xxxlarge">LOGIN</h6>
          </Card.Header>
          <Card.Body className="py-2">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h6 className="">User Name</h6>
              <input
                placeholder=""
                required=""
                rows="4"
                type="text"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, email: e.target.value });
                }}
                className="form-control form-control w-100"
              ></input>{" "}
              <h6 className="">Password</h6>
              <input
                placeholder=""
                required=""
                rows="4"
                type="password"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, password: e.target.value });
                }}
                className="form-control form-control w-100"
              ></input>{" "}
              <Button variant="success my-2 w-100 " onClick={onLoginClick}>
                Login{" "}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
