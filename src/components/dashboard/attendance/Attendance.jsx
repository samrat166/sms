import { Person2Rounded } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Form, Table } from "react-bootstrap";
import {
  addOrUpdateItemInArray,
  attendanceField,
} from "../../../common/constants";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState();
  const [studentsBasedOnDate, setStudentsBasedOnDates] = useState();
  const [students, setStudents] = useState();
  const [overallStudentsByClass, setOverallStudentByClass] = useState();

  const onDateChanges = (e) => {
    setDate(e);
    const result = attendance?.filter((x) => x.date === e);
    setStudentsBasedOnDates(result[0]?.absentOrPresent);
  };

  const onAttandanceClick = async (
    individualStudent,
    studentIfExists,
    value
  ) => {
    const allStudentOnSpecificDate = studentsBasedOnDate ?? [];
    const updatedStudents = addOrUpdateItemInArray(
      allStudentOnSpecificDate,
      studentIfExists
        ? { ...studentIfExists, isPresent: value }
        : {
            name: individualStudent?.name,
            class: individualStudent?.class,
            isPresent: value,
          }
    );
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/attendences`, {
        date,
        absentOrPresent: updatedStudents,
      });
      if (res.data.success) {
        getAttendance();
      }
    } catch (error) {
      console.log(error);
    }
  };

  function groupStudentsByClass(std) {
    const classes = new Set(std?.map((student) => student.class)); // get a list of unique classes
    const result = [];

    for (const classNumber of classes) {
      const studentsInClass = std?.filter(
        (student) => student.class === classNumber
      );
      result.push(studentsInClass); // add filtered students to the result array
    }
    return result;
  }

  const getStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/students`);
      setStudents(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getAttendance = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/attendences`);
      setAttendance(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttendance();
    getStudent();
  }, []);

  useEffect(() => {
    setOverallStudentByClass(groupStudentsByClass(students));
    const result = attendance?.filter((x) => x.date === date);
    setStudentsBasedOnDates(result[0]?.absentOrPresent);
  }, [students, attendance]);

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
              Attendance
            </h5>
          </div>
        </div>
      </div>
      <input
        type="date"
        className="w-25"
        value={date}
        onChange={(e) => onDateChanges(e.target.value)}
      />
      {date ? (
        <>
          {overallStudentsByClass?.map((students) => {
            return (
              <div>
                <h6 className="large p-1 bg-secondary w-25 text-light text-center my-2 rounded">
                  Class {students?.[0]?.class}
                </h6>
                <Table striped bordered hover size="sm" className="mt-1">
                  <thead>
                    <tr>
                      {attendanceField.map((field) => {
                        return <td style={{ fontSize: 14 }}>{field.label}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {students?.map((student, index) => {
                      return (
                        <tr className={"bg-light text-dark"}>
                          <td style={{ fontSize: 12 }}>{student?.name}</td>
                          <td style={{ fontSize: 12 }}>
                            <Form.Check
                              type={"checkbox"}
                              label={`Present`}
                              checked={
                                studentsBasedOnDate?.find(
                                  (x) => x.name === student?.name
                                )?.isPresent
                                  ? true
                                  : false
                              }
                              onClick={(e) =>
                                onAttandanceClick(
                                  student,
                                  studentsBasedOnDate?.find(
                                    (x) => x.name === student?.name
                                  ),
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            );
          })}
        </>
      ) : (
        <h6 className="mt-2 d-flex justify-content-center bg-muted p-3 rounded">
          Please Choose a Date!
        </h6>
      )}
    </Card>
  );
};

export default Attendance;
