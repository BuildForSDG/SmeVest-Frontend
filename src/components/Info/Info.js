import React from 'react';
import { Link } from 'react-router-dom';
import {
  OfflineBolt,
  Security,
  SupervisorAccount,
  ArrowRightAlt,
  AllInclusive,
  VerifiedUser,
  Message,
} from '@material-ui/icons';
import './Info.css';
import { Container, Row, Col } from 'react-bootstrap';
import infoImage from '../../assets/images/info-image.webp';

const loggedIn = false;
const Info = () => (
  <>
    <div className="Info">
      <Container>
        <section className="Icons">
          <div className="Icon">
            <OfflineBolt className="Icons-svg" style={{ fontSize: 60, color: '#d4475a' }} />
            <p className="Icons-Text">Fast</p>
          </div>
          <div className="Icon">
            <Security className="Icons-svg" style={{ fontSize: 60, color: '#47d486' }} />
            <p className="Icons-Text">Secure</p>
          </div>
          <div className="Icon">
            <SupervisorAccount className="Icons-svg" style={{ fontSize: 60, color: '#4789d4' }} />
            <p className="Icons-Text">Connect</p>
          </div>
        </section>
        <section className="Details">
          <Row>
            <Col md>
              <div className="Detail">
                <div className="fast">
                  <h2 className="Detail-Heading">
                    <OfflineBolt className="Detail-Icon" />
                    Fast Connection
                  </h2>
                  <p className="Detail-Text">A reliable system that offers fast connection</p>
                </div>
                <div className="secure">
                  <h2 className="Detail-Heading">
                    <Security className="Detail-Icon" />
                    Secured Connection
                  </h2>
                  <p className="Detail-Text">Your connection is secured with this system</p>
                </div>
                <div className="connect">
                  <h2 className="Detail-Heading">
                    <SupervisorAccount className="Detail-Icon" />
                    SME/Investor
                  </h2>
                  <p className="Detail-Text">The right connection is waiting for you</p>
                </div>
              </div>
            </Col>
            <Col sm>
              <div className="RightImage">
                <img src={infoImage} alt="Info" className="Image-responsive" />
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </div>

    <div className="Works">
      <Container>
        <Row>
          <Col sm>
            <div className="LeftImage"></div>
          </Col>
          <Col md="auto">
            <div className="Work-Detail">
              <h2 className="Work-Detail-Heading">How The System Works</h2>
              <p className="Work-Detail-Text">
                <ArrowRightAlt className="Work-Detail-Icon" style={{ fontSize: 40, color: '#47d486' }} /> Automatically
                suggest SMEs/Investors matching Your Category
              </p>
              <p className="Work-Detail-Text">
                <AllInclusive className="Work-Detail-Icon" style={{ fontSize: 40, color: '#4789d4' }} /> Connects you to
                the SME/Investor
              </p>
              <p className="Work-Detail-Text">
                <Message className="Work-Detail-Icon" style={{ fontSize: 40, color: '#4789d4' }} /> On Successful
                connection, a private messaging system is enabled for both parties
              </p>
              <p className="Work-Detail-Text">
                <VerifiedUser className="Work-Detail-Icon" style={{ fontSize: 40, color: '#47d486' }} />
                <span
                  style={{
                    color: '#d4475a',
                    display: 'inline-block',
                    marginRight: 4,
                  }}
                >
                  Note:
                </span>
                Only connect to verified SME/Investor
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {!loggedIn && (
        <div className="Ready">
          <h2 className="Ready-Text">Ready To Make That Connection?</h2>
          <Link to="/signup" className="Ready-Btn">
            Get Started For Free
          </Link>
        </div>
      )}
    </div>
  </>
);

export default Info;
