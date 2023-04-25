import { AddCircleOutline, Person2Rounded } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Form, Table } from "react-bootstrap";
import { studentsField } from "../../../common/constants";
import AddStudent from "./AddStudent";
const classList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "All"];
const Student = () => {
  const [students, setStudents] = useState([]);
  const [openAddStudentModal, setOpenAddStudentModal] = useState(null);
  const [filteredClass, setFilteredClass] = useState();
  const [searchQuery, setSearchQUery] = useState("");
  const [filterByClass, setFilterByClass] = useState("All");
  const [filteredList, setFilteredList] = useState();

  const filterRule = (student) => {
    return (
      student.class.toLowerCase().includes(filterByClass.toLowerCase()) &&
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const filteredValueByQuery =
      searchQuery !== ""
        ? students?.filter((student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [...students];
    const filteredValue =
      filterByClass !== "All" && filterByClass
        ? filteredValueByQuery?.filter((student) =>
            student.class.toLowerCase().includes(filterByClass.toLowerCase())
          )
        : [...filteredValueByQuery];
    setFilteredList(filteredValue);
  }, [searchQuery, filterByClass]);

  const handleCreateStudent = async (detail) => {
    const data = { ...detail };
    console.log(data, "kosassa");
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/student`,
        data
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/students`);
      setStudents(res.data.message);
      setFilteredList(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (data) => {
    console.log(data, "kosassa");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/update/student/${data._id}`,
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
    console.log(detail);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/delete/student/${detail._id}`
      );

      setStudents(students.filter((x) => x._id !== detail._id));
      setFilteredList(filteredList.filter((x) => x._id !== detail._id));
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
            <Dropdown
              value={filteredClass}
              onSelect={(e) => {
                setFilteredClass(e);
              }}
            >
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {!filteredClass
                  ? "Select Class"
                  : `Class: ${filteredClass.toUpperCase()}`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {classList.map((classI) => {
                  return (
                    <Dropdown.Item
                      eventKey={classI}
                      key={classI}
                      onClick={() => setFilterByClass(classI)}
                    >
                      {classI.toUpperCase()}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Form className="ms-3">
            <Form.Control
              placeholder="Search Students here..."
              value={searchQuery}
              onChange={(e) => setSearchQUery(e.target.value)}
            ></Form.Control>
          </Form>
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
          {filteredList?.map((student, index) => {
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
