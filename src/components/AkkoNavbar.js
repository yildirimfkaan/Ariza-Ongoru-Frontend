import React from "react";
import { Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AkkoNavbar() {
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("index");
    localStorage.removeItem("userNewAKK1");
    localStorage.removeItem("totalAKK");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            {window.location.pathname === "/login" ? (
              <></>
            ) : (
              <>
                <Nav.Link href="/profile">About</Nav.Link>
                <Nav.Link>User Detail</Nav.Link>
              </>
            )}

            {localStorage.getItem("user") ? (
              <Nav.Link onClick={logout} href="/login">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AkkoNavbar;
