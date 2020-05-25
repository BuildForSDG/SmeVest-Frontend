import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const Hero = (props) => (
  <Container>
    <div className="Hero">
      <Row className="GetStarted">
        <h1>Welcome To Your Gateway Of Business Investment</h1>
        {props.loggedIn ? (
          <Link to="/dashboard" className="SignUp">
            Dashboard
          </Link>
        ) : (
          <Link to="/signup" className="SignUp">
            Get Started For Free
          </Link>
        )}
      </Row>
    </div>
  </Container>
);

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.currentUser !== null,
});

export default connect(mapStateToProps)(Hero);
