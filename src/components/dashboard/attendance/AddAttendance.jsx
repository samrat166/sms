import { AccountCircleSharp, Face3 } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { attendanceField } from "../../../common/constants";

const AddAttendance = ({
  show,
  handleClose,
  handleCreateTeacher,
  handleDeleteTeacher,
  handleEdit,
}) => {
  const [attendanceDetail, setAttendanceDetail] = useState({});
  const handleSaveChanges = () => {
    if (!attendanceDetail.name) return alert("Please Enter Student's Name");

    if (!attendanceDetail._id) {
      handleCreateTeacher({
        className: attendanceDetail?.className,
        attandenceData: [],
        date: attendanceDetail?.date,
      });
    } else {
      handleEdit(attendanceDetail);
    }
    handleClose();
  };

  useEffect(() => {
    setAttendanceDetail(show);
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="py-1">
        <Modal.Title>
          {show?.name ? (
            <>
              <AccountCircleSharp />{" "}
              <span style={{ fontSize: 18 }}> {show?.name.toUpperCase()}</span>
            </>
          ) : (
            "Add New Customer"
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-1">
        <>
          {attendanceField.map((field, index) => {
            return (
              <div xs={field.xs} className={index !== 0 && "mt-2"}>
                <h6 className="small mb-1 text-muted">{field.label}:</h6>
                {field.type === "text" && (
                  <input
                    placeholder=""
                    required=""
                    rows="4"
                    type="text"
                    value={attendanceDetail?.[field.name]}
                    onChange={(e) =>
                      setAttendanceDetail({
                        ...attendanceDetail,
                        [field.name]: e.target.value,
                      })
                    }
                    className="form-control form-control-sm"
                  ></input>
                )}{" "}
                {field.type === "date" && (
                  <input
                    placeholder=""
                    required=""
                    rows="4"
                    type="date"
                    value={attendanceDetail?.[field.name]}
                    onChange={(e) =>
                      setAttendanceDetail({
                        ...attendanceDetail,
                        [field.name]: new Date(e.target.value),
                      })
                    }
                    className="form-control form-control-sm"
                  ></input>
                )}
                {field.type === "boolean" && (
                  <Form.Check
                    type={"checkbox"}
                    label={``}
                    onChange={(e) =>
                      setAttendanceDetail({
                        ...attendanceDetail,
                        [field.name]: new Date(e.target.checked),
                      })
                    }
                  />
                )}
              </div>
            );
          })}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAttendance;
