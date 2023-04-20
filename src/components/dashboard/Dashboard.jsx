import {
  AddCardOutlined,
  AddCircleOutline,
  Campaign,
  PlusOne,
  Portrait,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Student from "./student/Student";
import Teacher from "./teacher/Teacher";
import Notice from "./notice/Notice";
import Attendance from "./attendance/Attendance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tab, setTab] = useState("add-student");
  const navigate = useNavigate();
  const user = window.sessionStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate(`/login`, { replace: true });
    }
  }, []);
  return (
    <>
      <div className="d-flex">
        <div
          className="d-flex  flex-column bg-light  px-2 rounded w-25"
          style={{ height: "100vh" }}
        >
          <h6 className="xlarge text-center">ADMIN DASHBOARD</h6>
          <hr className="my-0" />
          <Button
            variant="dark"
            className="mb-1 mt-2"
            onClick={() => setTab("add-student")}
          >
            <AddCircleOutline /> Add Student
          </Button>
          <Button
            variant="dark"
            className="my-1 mb-2"
            onClick={() => setTab("add-teacher")}
          >
            <AddCircleOutline /> Add Teacher
          </Button>
          <Button
            variant="dark"
            className="my-1"
            onClick={() => setTab("notice")}
          >
            <Campaign /> Notice
          </Button>{" "}
          <Button
            variant="dark"
            className="my-1"
            onClick={() => setTab("attendance")}
          >
            <Portrait /> Attendance
          </Button>
        </div>
        <div className="w-75">
          {tab === "add-student" && <Student />}
          {tab === "add-teacher" && <Teacher />}
          {tab === "notice" && <Notice />}
          {tab === "attendance" && <Attendance />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
