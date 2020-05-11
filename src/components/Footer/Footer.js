import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import { Room, Phone, Mail, Facebook, Twitter, Instagram, LinkedIn } from '@material-ui/icons';
import './Footer.css';

const Footer = () => (
  <div className="Footer">
    <Container>
      <Row>
        <Col sm className="Logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </Col>
        <Col sm className="Address">
          <p>
            <Room /> No. 3 Andela Estate, NY.
          </p>
          <p>
            <Phone /> +234 (80) 1234 5678
          </p>
          <p>
            <Mail /> <a href="mailto:info@smevest.org">info@smevest.org</a>
          </p>
        </Col>
        <Col sm className="Links">
          <ul className="Quicklinks">
            <li>
              <Link to="/about-use">About Us</Link>
            </li>
            <li>
              <Link to="/wwd">What We Do</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
          <ul className="Quicklinks">
            <li>
              <Link to="/career">Career</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </Col>
        <Col sm className="Icons">
          <ul className="SocialIcons">
            <a href="https://twitter.com/yasholma" rel="noopener noreferrer" target="_blank">
              <Facebook />
            </a>
            <a href="https://twitter.com/yasholma" rel="noopener noreferrer" target="_blank">
              <Twitter />
            </a>
            <a href="https://twitter.com/yasholma" rel="noopener noreferrer" target="_blank">
              <Instagram />
            </a>
            <a href="https://twitter.com/yasholma" rel="noopener noreferrer" target="_blank">
              <LinkedIn />
            </a>
          </ul>
        </Col>
      </Row>
    </Container>
    <p className="Copyright">&copy; Copyright 2020 SmeVest. All rights reserved. </p>
  </div>
);

export default Footer;
