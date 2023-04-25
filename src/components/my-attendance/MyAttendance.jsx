import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

const MyAttendance = () => {
  const [attendance, setAttendance] = useState();
  const [dataToShow, setDataToShow] = useState();
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  function getAttendanceDetailsById(arr, studentId) {
    // Sort the array by date

    arr?.sort((a, b) => a.date.localeCompare(b.date));

    const attendanceDetails = [];
    const todayDate = new Date().toISOString().slice(0, 10);
    let currentDate = arr?.[0].date;

    // Loop through all the dates from day 1 to today's date
    while (currentDate <= todayDate) {
      const attendance = arr?.find((item) => item.date === currentDate);
      if (attendance) {
        const attendanceRecord = attendance.absentOrPresent.find(
          (item) => item.studentId === studentId
        );
        if (attendanceRecord) {
          attendanceDetails.push({
            name: attendanceRecord.name,
            isPresent: attendanceRecord.isPresent,
            date: currentDate,
          });
        } else {
          attendanceDetails.push({
            name: user?.name,
            isPresent: false,
            date: currentDate,
          });
        }
      } else {
        attendanceDetails.push({
          name: user?.name,
          isPresent: false,
          date: currentDate,
        });
      }
      // Move to the next day
      currentDate = new Date(
        new Date(currentDate).getTime() + 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10);
    }
    return attendanceDetails;
  }

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
  }, []);
  useEffect(() => {
    if (attendance) {
      setDataToShow(getAttendanceDetailsById(attendance ?? [], user.id));
    }
  }, [attendance]);

  return (
    <>
      <Card className="">
        <Card.Header>Student Name: {user?.name?.toUpperCase()}</Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm" className="mt-1">
            <thead>
              <tr>
                <td style={{ fontSize: 14 }}>Date</td>
                <td style={{ fontSize: 14 }}>Attandance</td>
              </tr>
            </thead>
            <tbody>
              {dataToShow
                ? dataToShow?.map((att, index) => {
                    console.log(att);
                    return (
                      <tr key={att?.date} className={"bg-light text-dark"}>
                        <td style={{ fontSize: 12 }}>{att?.date}</td>{" "}
                        <td style={{ fontSize: 12 }}>
                          {att?.isPresent ? "Present" : "Absent"}
                        </td>
                      </tr>
                    );
                  })
                : "No Data to Show"}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyAttendance;
