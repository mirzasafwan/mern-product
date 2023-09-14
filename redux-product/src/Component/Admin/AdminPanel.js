import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/adminPanel.css";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken"); // Replace with the actual token
    // console.log(token);
    if (token) {
      // https://mern-product-backend.vercel.app/admin
      // http://localhost:8000/admin
      fetch("https://mern-product-backend.vercel.app/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token here
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          // console.log(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      console.log("token empty");

      navigate("/adminLogin");
      window.location.href = "/adminLogin";
    }
  });

  const columns = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 270,
    },
    {
      label: "Description",
      field: "description",
      sort: "asc",
      width: 200,
    },
  ];

  const mdbData = {
    columns: columns,
    rows: data.map((item) => ({
      name: item.name,
      email: item.email,
      description:
        item.todos.length > 0 ? (
          <ul>
            {item.todos.map((todo) => (
              <figure key={todo._id}>
                <blockquote className="blockquote">
                  <p>{todo.content}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {todo.updatedAt.substring(0, 11)}{" "}
                </figcaption>
              </figure>
            ))}
          </ul>
        ) : (
          <>
            <p className="mb-0">-</p>
          </>
        ),
    })),
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            // <MDBContainer className="mt-5">
            //   <div className="table-responsive">
            //     <MDBDataTableV5 data={mdbData} search bordered striped />
            //   </div>
            // </MDBContainer>
            <div className="table-responsive">
              <MDBDataTable striped bordered small data={mdbData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
