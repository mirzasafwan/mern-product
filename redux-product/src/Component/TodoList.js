import { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [activeTodo, setActiveTodo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Make a GET request to fetch todo items from your Express API
    fetch("http://localhost:8000/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  }, []);

  const cardStyle = {
    textDecoration: "none", // Remove underline from the card header
  };

  const toggleAccordion = (todoId) => {
    setActiveTodo((prevActiveTodo) =>
      prevActiveTodo === todoId ? null : todoId
    );
  };
  return (
    <Container>
      <h2 className="m-2 text-center">My Todo List</h2>
      <Row>
        <Link to="createnote">
          <Button className="my-2" size="sm">
            Create ToDo List
          </Button>
        </Link>
        {todos.map((todo) => (
          <div key={todo.id}>
            {/* {todo._id} */}
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
                <Button variant="warning mx-1">Update</Button>
                <Button variant="danger mx-1">Delete</Button>
              </Card.Header>
              {activeTodo === todo._id && (
                <Card.Body>
                  <h4>
                    <Badge bg="success">{todo.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p> {todo.content}</p>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">
                        Created at{" "}
                        {todo.createdAt
                          ? todo.createdAt.substring(0, 10)
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
