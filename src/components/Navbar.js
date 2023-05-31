import React from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { userSignOut } from "_actions/auth";
// Bootstrap imports
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
// asserts
import ivylogo from "assets/img/logo.svg";

function Navigation(props) {
  // User SignOut
  function handleSignOut(event) {
    props.dispatch(userSignOut());
  }

  return (
    <Navbar bg="light" expand="lg" className="elevated">
      <Navbar.Brand as={Link} to="/">
        <img src={ivylogo} alt="IVY-Logo" height="48px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {props.auth.isAuthenticated ? (
            <Nav>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Dropdown as={NavItem} alignRight>
                <Dropdown.Toggle as={NavLink}>
                  {props.auth.userData.first_name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleSignOut}>LogOut</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Navigation);
