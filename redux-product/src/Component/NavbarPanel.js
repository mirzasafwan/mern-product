import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarPanel = () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const logout = async () => {
    try {
      localStorage.clear();
      console.log("Local storage cleared.");
      window.location.reload(); // Reload the page when the user logs out
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand to="/" as={Link}>
            E-Com
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/dashboard" as={Link}>
                Dashboard
              </Nav.Link>
              <Nav.Link to="/product" as={Link}>
                Products
              </Nav.Link>

              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              align={{ lg: "end" }}
              title={name || "User"}
              id="dropdown-menu-align-responsive-2"
            >
              <NavDropdown.Item to="/cart" as={Link}>
                Cart
              </NavDropdown.Item>
              {token && ( // Only render the Logout item if a token exists
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              )}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarPanel;
