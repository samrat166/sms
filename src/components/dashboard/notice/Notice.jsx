import {
  AddCircleOutline,
  Campaign,
  Person2Rounded,
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Table } from "react-bootstrap";
import { noticeField } from "../../../common/constants";
import AddStudent from "./AddNotice";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [openAddStudentModal, setOpenAddStudentModal] = useState(null);

  const handleCreateNotice = async (detail) => {
    const data = { ...detail };
    console.log(data);
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/notice`, data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/notices`);
      setNotices(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/update/notice/${data._id}`,
        data
      );

      if (res.data) getData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDeleteNotice = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/delete/notice/${data._id}`,
        data
      );

      setNotices(notices.filter((x) => x._id !== data._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="mx-1 px-1 py-2 ">
      <div className="d-flex justify-content-between">
        <div className="d-flex m-2 ">
          <div className="d-flex">
            <Campaign fontSize="large" />
            <h5
              style={{ fontSize: 24, marginTop: 5 }}
              className="ms-1 me-1  mb-0"
            >
              Total Notices: {notices?.length}
            </h5>
          </div>
        </div>
        <Button
          variant="dark"
          className="my-1 mb-2"
          onClick={() => setOpenAddStudentModal({})}
        >
          <AddCircleOutline /> Add new Notice
        </Button>
      </div>
      <Table striped bordered hover size="sm" className="mt-1">
        <thead>
          <tr>
            {noticeField.map((field) => {
              return <td style={{ fontSize: 14 }}>{field.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {notices?.map((student, index) => {
            return (
              <tr
                className={"bg-light text-dark"}
                onClick={() => setOpenAddStudentModal({ ...student, index })}
              >
                {noticeField.map((field) => {
                  return (
                    <td style={{ fontSize: 12 }}>{student?.[field.name]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddStudent
        show={openAddStudentModal}
        handleClose={() => setOpenAddStudentModal(null)}
        handleCreateNotice={handleCreateNotice}
        handleDeleteNotice={handleDeleteNotice}
        handleEdit={handleEdit}
      />
    </Card>
  );
};

export default Notice;
