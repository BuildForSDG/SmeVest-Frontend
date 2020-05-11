import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Room, Phone, Mail, Facebook, Twitter, Instagram, LinkedIn,
} from '@material-ui/icons';
import logo from '../../assets/images/logo.png';
import './Footer.css';

const Footer = () => (
  <div className="Footer">
    <Container>
      <Row>
        <Col sm className="Logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </Col>
        <Col sm className="Address">
          <p className="Address-Text first">
            <Room className="Address-Icon" /> No. 3 Andela Estate, NY.
          </p>
          <p className="Address-Text">
            <Phone className="Address-Icon" /> +234 (80) 1234 5678
          </p>
          <p className="Address-Text">
            <Mail className="Address-Icon" /> <a href="mailto:info@smevest.org">info@smevest.org</a>
          </p>
        </Col>
        <Col sm className="Links">
          <ul className="Quicklinks">
            <li>
              <Link className="Link" to="/about-use">
                About Us
              </Link>
            </li>
            <li>
              <Link className="Link" to="/wwd">
                What We Do
              </Link>
            </li>
            <li>
              <Link className="Link" to="/faq">
                FAQ
              </Link>
            </li>
          </ul>
          <ul className="Quicklinks">
            <li>
              <Link className="Link" to="/career">
                Career
              </Link>
            </li>
            <li>
              <Link className="Link" to="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="Link" to="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </Col>
        <Col sm className="Icons">
          <ul className="SocialIcons">
            <a href="#" rel="noopener noreferrer" target="_blank">
              <Facebook className="Icon" />
            </a>
            <a href="#" rel="noopener noreferrer" target="_blank">
              <Twitter className="Icon" />
            </a>
            <a href="#" rel="noopener noreferrer" target="_blank">
              <Instagram className="Icon" />
            </a>
            <a href="#" rel="noopener noreferrer" target="_blank">
              <LinkedIn className="Icon" />
            </a>
          </ul>
        </Col>
      </Row>
    </Container>
    <p className="Copyright">&copy; Copyright {new Date().getFullYear()} SmeVest. All rights reserved. </p>
  </div>
);

export default Footer;
