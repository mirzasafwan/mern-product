import React, { useEffect, useState } from "react";
import { Badge, Card, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreateToDoComponent from "./CreateToDoComponent";
import DeleteToDoComponent from "./DeleteToDoComponent";
import UpdateToDoComponent from "./UpdateToDoComponent";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [activeTodo, setActiveTodo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // http://localhost:8000/
    // https://mern-product-backend.vercel.app/

    // Make a GET request to fetch todo items from your Express API
    fetch("https://mern-product-backend.vercel.app/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Only proceed if the response status is 200 (OK)
          return response.json();
        } else {
          localStorage.clear();
          // Handle other status codes (e.g., 401 unauthorized) as needed
          navigate("/signin");
          window.location.reload();
          throw new Error("Invalid token or server error");
        }
      })
      .then((data) => setTodos(data))
      .catch((error) => navigate("/signin"));
  }, [navigate]);

  const cardStyle = {
    textDecoration: "none", // Remove underline from the card header
  };

  const toggleAccordion = (todoId) => {
    setActiveTodo((prevActiveTodo) =>
      prevActiveTodo === todoId ? null : todoId
    );
  };
  // Callback function to add a new to-do to the list
  const handleCreateTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // Callback function to update a to-do in the list
  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  // Callback function to delete a to-do from the list
  const handleDeleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
  };

  return (
    <Container>
      <h2 className="m-2 text-center">My Todo List</h2>
      <Row>
        <Link>
          <CreateToDoComponent onCreate={handleCreateTodo} />
        </Link>
        {todos.map((todo) => (
          <div key={todo._id}>
            <Card className="my-1 p-0" style={cardStyle}>
              <Card.Header className="d-flex" style={{ cursor: "pointer" }}>
                <span
                  className="mt-1"
                  style={{
                    color: "black",
                    flex: "1",
                    fontSize: "18",
                  }}
                  onClick={() => toggleAccordion(todo._id)}
                >
                  {todo.title}
                </span>
                <UpdateToDoComponent todo={todo} onUpdate={handleUpdateTodo}>
                  Update
                </UpdateToDoComponent>
                <DeleteToDoComponent todo={todo} onDelete={handleDeleteTodo}>
                  Delete
                </DeleteToDoComponent>
              </Card.Header>
              {activeTodo === todo._id && (
                <Card.Body
                  className={
                    activeTodo === todo._id ? "card-body expanded" : "card-body"
                  }
                >
                  <h4>
                    <Badge bg="success">{todo.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p> {todo.content}</p>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">
                        Updated at{" "}
                        {todo.updatedAt
                          ? todo.updatedAt.substring(0, 10)
                          : "N/A"}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              )}
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default TodoList;
