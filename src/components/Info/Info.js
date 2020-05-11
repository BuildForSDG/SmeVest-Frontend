import React from 'react';
import { Link } from 'react-router-dom';
import {
  OfflineBolt,
  Security,
  SupervisorAccount,
  ArrowRightAlt,
  AllInclusive,
  VerifiedUser,
  Message
} from '@material-ui/icons';
import './Info.css';
import { Container, Row, Col } from 'react-bootstrap';
import infoImage from '../../assets/images/info-image.webp';

const Info = () => (
  <>
    <div className="Info">
      <Container>
        <section className="InfoSocial">
          <div className="Icon">
            <OfflineBolt style={{ fontSize: 60, color: '#d4475a' }} />
            <p>Fast</p>
          </div>
          <div className="Icon">
            <Security style={{ fontSize: 60, color: '#47d486' }} />
            <p>Secure</p>
          </div>
          <div className="Icon">
            <SupervisorAccount style={{ fontSize: 60, color: '#4789d4' }} />
            <p>Connect</p>
          </div>
        </section>
        <section className="InfoDetails">
          <div className="Details">
            <div>
              <h2>
                <OfflineBolt />
                Fast Connection
              </h2>
              <p>A reliable system that offers fast connection</p>
            </div>
            <div>
              <h2>
                <Security />
                Secured Connection
              </h2>
              <p>Your connection is secured with this system</p>
            </div>
            <div>
              <h2>
                <SupervisorAccount />
                SME/Investor
              </h2>
              <p>The right connection is waiting for you</p>
            </div>
          </div>
          <div className="Image">
            <img src={infoImage} alt="Info" />
          </div>
        </section>
      </Container>
    </div>

    <div className="Info2">
      <Container>
        <Row>
          <Col sm>
            <div className="LeftImage"></div>
          </Col>
          <Col md="auto">
            <div className="Info2Details">
              <h2>How The System Works</h2>
              <p>
                <ArrowRightAlt style={{ fontSize: 40, color: '#47d486' }} /> Automatically suggest SMEs/Investors
                matching Your Category
              </p>
              <p>
                <AllInclusive style={{ fontSize: 40, color: '#4789d4' }} /> Connects you to the SME/Investor
              </p>
              <p>
                <Message style={{ fontSize: 40, color: '#4789d4' }} /> On Successful connection, a private messaging
                system is enabled for both parties
              </p>
              <p>
                <VerifiedUser style={{ fontSize: 40, color: '#47d486' }} />
                <span
                  style={{
                    color: '#d4475a',
                    display: 'inline-block',
                    marginRight: 4
                  }}
                >
                  Note:
                </span>{' '}
                Only connect to verified SME/Investor
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {true && (
        <div className="Ready">
          <h2>Ready To Make That Connection?</h2>
          <Link to="/signup" className="SignUp">
            Get Started For Free
          </Link>
        </div>
      )}
    </div>
  </>
);

export default Info;
