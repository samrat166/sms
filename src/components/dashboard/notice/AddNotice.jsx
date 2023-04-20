import { AccountCircleSharp, Campaign, Face3 } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { noticeField } from "../../../common/constants";
import DeleteModal from "./DeleteModal";

const AddNotice = ({
  show,
  handleClose,
  handleCreateNotice,
  handleEdit,
  handleDeleteNotice,
}) => {
  const [notice, setNotice] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleSaveChanges = () => {
    if (!notice.description) return alert("Please Enter Description");

    if (!notice._id) {
      handleCreateNotice(notice);
    } else {
      handleEdit(notice);
    }
    handleClose();
  };

  const handleStudentDelete = () => {
    handleDeleteNotice(notice);
    handleClose();
  };
  useEffect(() => {
    setNotice(show);
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="py-1">
        <Modal.Title>
          {show?.description ? (
            <>
              <Campaign /> <span style={{ fontSize: 18 }}> Edit Notice</span>
            </>
          ) : (
            "Add New Notice"
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-1">
        <>
          {noticeField.map((field, index) => {
            return (
              <div xs={field.xs} className={index !== 0 && "mt-2"}>
                <h6 className="small mb-1 text-muted">{field.label}:</h6>
                {field.type === "text" && (
                  <input
                    placeholder=""
                    required=""
                    rows="4"
                    type="text"
                    value={notice?.[field.name]}
                    onChange={(e) =>
                      setNotice({
                        ...notice,
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

export default AddNotice;
