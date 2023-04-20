import { AccountCircleSharp, Face3 } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { teacherField } from "../../../common/constants";
import DeleteModal from "./DeleteModal";

const AddAttendance = ({
  show,
  handleClose,
  handleCreateTeacher,
  handleDeleteTeacher,
  handleEdit,
}) => {
  const [attendanceDetail, setAttendanceDetail] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleSaveChanges = () => {
    if (!attendanceDetail.name) return alert("Please Enter Student's Name");
    if (!attendanceDetail.address) return alert("Please Enter Student's Address");
    if (!attendanceDetail.phoneNumber)
      return alert("Please Enter Student's Phone Number");

    if (!attendanceDetail._id) {
      handleCreateTeacher(attendanceDetail);
    } else {
      handleEdit(attendanceDetail);
    }
    handleClose();
  };

  const handleStudentDelete = () => {
    handleDeleteTeacher(attendanceDetail);
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
          {teacherField.map((field, index) => {
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
                )}
              </div>
            );
          })}
        </>
      </Modal.Body>
      <Modal.Footer>
        {show?._id && (
          <Button variant="danger" onClick={() => setOpenDeleteModal(true)}>
            Delete
          </Button>
        )}
        <Button variant="success" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
      <DeleteModal
        openDeleteModal={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        onDelete={handleStudentDelete}
        name={show?.name}
      />
    </Modal>
  );
};

export default AddAttendance;
