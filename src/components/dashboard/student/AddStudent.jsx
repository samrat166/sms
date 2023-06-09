import { AccountCircleSharp, Face3 } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { studentsField } from "../../../common/constants";
import DeleteModal from "./DeleteModal";

const AddStudent = ({
  show,
  handleClose,
  handleCreateStudent,
  handleEdit,
  handleDeleteStudent,
}) => {
  const [studentDetail, setStudentDetails] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(null);

  const handleSaveChanges = () => {
    if (!studentDetail.name) return alert("Please Enter Student's Name");
    if (!studentDetail.address) return alert("Please Enter Student's Address");
    if (!studentDetail.rollNo)
      return alert("Please Enter Student's Roll number");
    if (!studentDetail.class) return alert("Please Enter Student's Class");
    if (!studentDetail.phone)
      return alert("Please Enter Student's Phone Number");

    if (!studentDetail._id) {
      handleCreateStudent(studentDetail);
    } else {
      handleEdit(studentDetail);
    }
    handleClose();
  };

  const handleStudentDelete = () => {
    handleDeleteStudent(studentDetail);
    handleClose();
  };

  useEffect(() => {
    setStudentDetails(show);
    setOpenDeleteModal(null);
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
          {studentsField.map((field, index) => {
            return (
              <div xs={field.xs} className={index !== 0 && "mt-2"}>
                <h6 className="small mb-1 text-muted">{field.label}:</h6>
                {field.type === "text" && (
                  <input
                    placeholder=""
                    required=""
                    rows="4"
                    type="text"
                    value={studentDetail?.[field.name]}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetail,
                        [field.name]: e.target.value,
                      })
                    }
                    className="form-control form-control-sm"
                  ></input>
                )}
                {field.type === "enum" && (
                  <Dropdown
                    value={studentDetail?.[field.name]}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetail,
                        [field.name]: e.target.value,
                      })
                    }
                  >
                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                      {!studentDetail?.[field.name]
                        ? "Select Class"
                        : `Class: ${field.name.toUpperCase()}`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {field.options.map((classI) => {
                        return (
                          <Dropdown.Item
                            eventKey={classI}
                            key={classI}
                            onClick={(e) =>
                              setStudentDetails({
                                ...studentDetail,
                                [field.name]: classI,
                              })
                            }
                          >
                            {classI.toUpperCase()}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            );
          })}
        </>
      </Modal.Body>
      <Modal.Footer>
        {show?._id && (
          <Button variant="danger" onClick={() => setOpenDeleteModal(show)}>
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

export default AddStudent;
