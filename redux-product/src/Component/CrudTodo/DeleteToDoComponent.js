import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteToDoComponent({ todo, onDelete }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteTodo = async () => {
    try {
      console.log("Deleting todo with ID:", todo);

      const response = await fetch(`http://localhost:8000/${todo._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        onDelete(todo._id);
        handleClose();
      } else {
        // Handle the case when the delete request fails
        console.error("Failed to delete todo.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this to-do item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTodo}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteToDoComponent;
