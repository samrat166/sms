import { AddCircleOutline, Person2Rounded } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Table } from "react-bootstrap";
import { teacherField } from "../../../common/constants";
import AddTeacher from "./AddTeacher";

const Teacher = () => {
  const [teachers, setTeacher] = useState([]);
  const [openAddTeacherModal, setOpenAddTeacherModal] = useState(null);

  const handleCreateTeacher = async (detail) => {
    const data = { ...detail };
    console.log(data);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/teacher`,
        data
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/teachers`);
      setTeacher(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/update/teacher/${data._id}`,
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
  const handleDeleteTeacher = async (detail) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/delete/teacher/${detail._id}`
      );
      console.log(res, "sadsdasadasdasdasdasd");

      setTeacher(teachers.filter((x) => x._id !== detail._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="mx-1 px-1 py-2 ">
      <div className="d-flex justify-content-between">
        <div className="d-flex m-2 ">
          <div className="d-flex">
            <Person2Rounded fontSize="large" />
            <h5
              style={{ fontSize: 24, marginTop: 5 }}
              className="ms-1 me-1  mb-0"
            >
              Total Teachers: {teachers?.length}
            </h5>
          </div>
        </div>
        <Button
          variant="dark"
          className="my-1 mb-2"
          onClick={() => setOpenAddTeacherModal({})}
        >
          <AddCircleOutline /> Add new Teacher
        </Button>
      </div>
      <Table striped bordered hover size="sm" className="mt-1">
        <thead>
          <tr>
            {teacherField.map((field) => {
              return <td style={{ fontSize: 14 }}>{field.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {teachers?.map((teacher, index) => {
            return (
              <tr
                className={"bg-light text-dark"}
                onClick={() => setOpenAddTeacherModal({ ...teacher, index })}
              >
                {teacherField.map((field) => {
                  return (
                    <td style={{ fontSize: 12 }}>{teacher?.[field.name]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddTeacher
        show={openAddTeacherModal}
        handleClose={() => setOpenAddTeacherModal(null)}
        handleCreateTeacher={handleCreateTeacher}
        handleDeleteTeacher={handleDeleteTeacher}
        handleEdit={handleEdit}
      />
    </Card>
  );
};

export default Teacher;
