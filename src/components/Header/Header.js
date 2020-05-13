import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Dashboard, ExitToApp } from '@material-ui/icons';
import './Header.css';
import logo from '../../assets/images/logo.png';

const loggedIn = false;
const Header = () => (
  <Navbar className="Header" expand="xl">
    <Container>
      <Navbar.Brand>
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto NavigationList">
          {loggedIn ? (
            <>
              <Link to="/dashboard" className="Dashboard">
                <Dashboard /> Dashboard
              </Link>
              <Link to="/signout" className="SignOut">
                <ExitToApp /> Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="SignInLink">
                Sign In
              </Link>
              <Link to="/signup" className="SignUpLink">
                Sign Up
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
