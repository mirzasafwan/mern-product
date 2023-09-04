import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function UpdateToDoComponent({ todo, onUpdate }) {
  const [show, setShow] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    category: todo.category,
    content: todo.content,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // https://mern-product-backend.vercel.app/
      // http://localhost:8000
      const response = await fetch(
        `fetch://mern-product-backend.vercel.app/${todo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedTodo),
        }
      );
      if (response) {
        const data = await response.json();
        onUpdate(data); // Update the edited todo in the list
        handleClose();
      } else {
        // Handle errors here
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="warning" className="mx-1" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={updatedTodo.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={updatedTodo.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={updatedTodo.content}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateToDoComponent;
