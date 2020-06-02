import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar, Nav, NavDropdown, Container,
} from 'react-bootstrap';
import {
  AccountCircle, ExitToApp, Notifications, Message, Dashboard,
} from '@material-ui/icons';
import { signOut } from '../../redux/actions/auth';
import './DashNav.css';

const DashNav = (props) => (
    <Navbar bg="light" expand="lg" className="DashNav">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          SmeVest
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/dashboard/notifications">
              <Notifications />
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard/message">
              <Message />
            </Nav.Link>
          </Nav>
          <NavDropdown title={<Dashboard />} style={{ color: '#ddd' }}>
            <NavDropdown.Item as={Link} to="/dashboard/profile">
              <AccountCircle /> Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/signin" onClick={() => props.signUserOut()}>
              <ExitToApp /> Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
);

const mapDispatchToProps = (dispatch) => ({
  signUserOut: () => dispatch(signOut()),
});

export default connect(null, mapDispatchToProps)(DashNav);
