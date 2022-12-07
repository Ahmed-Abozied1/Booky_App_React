import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
export default function NavBar(props) {
  return (
    <>
      <Navbar className="fixed-top" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand className="fw-bolder logo" >
          <Nav.Link as= {Link}  to="/">
            Booky
          </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {props.userData ? (
              <>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link as={Link} to="/home">
                    Home
                  </Nav.Link>

                  <Nav.Link as={Link} to="/favourite">
                    Favourites
                  </Nav.Link>
                </Nav>
              </>
            ) : (
              " "
            )}

            {props.userData ? (
              <>
                <Button onClick={props.logOut} variant="outline-secondary">
                  LogOut
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  <Button variant="outline-secondary">Register</Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/login">
                  <Button className="m-2" variant="outline-secondary">
                    Login
                  </Button>
                </Nav.Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
