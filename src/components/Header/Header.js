import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Dashboard, ExitToApp } from '@material-ui/icons';
import './Header.css';
import logo from '../../assets/images/logo.png';
import { signOut } from '../../redux/actions/auth';

export const Header = (props) => (
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
          {props.loggedIn ? (
            <>
              <Link to="/dashboard" className="Dashboard">
                <Dashboard /> Dashboard
              </Link>
              <Link to="/signin" onClick={() => props.signUserOut()} className="SignOut">
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

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.currentUser !== null,
});

const mapDispatchToProps = (dispatch) => ({
  signUserOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
