import { AddCircleOutline, Person2Rounded } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Table } from "react-bootstrap";
import { studentsField } from "../../../common/constants";
import AddStudent from "./AddStudent";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [openAddStudentModal, setOpenAddStudentModal] = useState(null);

  const handleCreateStudent = async (detail) => {
    const data = { ...detail };
    console.log(data);
    try {
      const res = await axios.post(
        `https://vast-rose-bluefish-coat.cyclic.app/customer/`,
        data
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://vast-rose-bluefish-coat.cyclic.app/customer`
      );
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (data) => {
    try {
      const res = await axios.patch(
        `https://vast-rose-bluefish-coat.cyclic.app/customer/${data._id}`,
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
  const handleDeleteStudent = async (detail) => {
    try {
      const res = await axios.delete(
        `https://vast-rose-bluefish-coat.cyclic.app/customer/${detail._id}`
      );
      console.log(res, "sadsdasadasdasdasdasd");

      setStudents(students.filter((x) => x._id !== detail._id));
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
              Total Students: {students?.length}
            </h5>
          </div>
          <div className="ms-2">
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                Select Class
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">One</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Two</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Three</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Four</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Button
          variant="dark"
          className="my-1 mb-2"
          onClick={() => setOpenAddStudentModal({})}
        >
          <AddCircleOutline /> Add new Student
        </Button>
      </div>
      <Table striped bordered hover size="sm" className="mt-1">
        <thead>
          <tr>
            {studentsField.map((field) => {
              return <td style={{ fontSize: 14 }}>{field.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => {
            return (
              <tr
                className={"bg-light text-dark"}
                onClick={() => setOpenAddStudentModal({ ...student, index })}
              >
                {studentsField.map((field) => {
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
        handleCreateStudent={handleCreateStudent}
        handleDeleteStudent={handleDeleteStudent}
        handleEdit={handleEdit}
      />
    </Card>
  );
};

export default Student;
