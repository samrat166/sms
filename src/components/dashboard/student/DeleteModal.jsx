import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ openDeleteModal, onHide, onDelete, name = "" }) => {
  console.log(openDeleteModal);
  return (
    <Modal
      show={openDeleteModal}
      onHide={onHide}
      style={{ zIndex: 1000000000000 }}
    >
      <Modal.Body className="bg-secondary">
        Are you sure you want to delete {name.toUpperCase()}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onDelete(openDeleteModal?._id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
