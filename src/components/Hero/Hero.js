import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import { Container, Row } from 'react-bootstrap';

const Hero = () => (
  <Container>
    <div className="Hero">
      <Row className="GetStarted">
        <h1>Welcome To Your Gateway Of Business Investment</h1>
        {true && (
          <Link to="/signup" className="SignUp">
            Get Started For Free
          </Link>
        )}
      </Row>
    </div>
  </Container>
);

export default Hero;