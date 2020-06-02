import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Alert } from 'react-bootstrap';
import Skeleton from '@material-ui/lab/Skeleton';

import {
  Edit,
  Category,
  Room,
  People,
  Info,
  ContactMail,
  Home,
  Email,
  Link as WebLink,
  Phone,
  FileCopy,
  Add,
  PictureAsPdf,
  Image as PictureAsImage,
  Twitter,
  LinkedIn,
  MergeType
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { checkServerNetworkError } from '../../utils/validation';
import { getProfile, clearAuthErrors } from '../../redux/actions';

import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: false,
      isError: false
    };

    this._isMounted = false;

    this.fetchUserProfile = this.fetchUserProfile.bind(this);
  }

  async fetchUserProfile() {
    const res = await this.props.userProfile();
    if (res && this._isMounted) {
      this.setState({ user: this.props.userData });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    this.fetchUserProfile();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.clearErrors();
  }

  render() {
    const { loading } = this.props;
    const { user } = this.state;
    return (
      <Container className="Profile">
        <Card>
          <Row>
            <Col>
              <h2 className="text-center">Your Profile</h2>
              {checkServerNetworkError(this.props.error) ? (
                <Alert variant="info">{this.props.error.network}</Alert>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col md={3} className="Image mx-auto mb-2">
              {loading ? (
                <Skeleton variant="circle" width={200} height={200} />
              ) : (
                <Image
                  roundedCircle
                  src={user.profilePic || 'https://via.placeholder.com/200x200.png?text=No+Image'}
                  height={200}
                  width={200}
                />
              )}
            </Col>
            <Col>
              {loading ? (
                <Skeleton width={'100%'} height={'100%'} />
              ) : (
                <>
                  <div className="Heading">
                    <h4>{user.name || 'NA'}</h4>
                    <Link to={`${this.props.match.url}/edit`} className="btn btn-sm btn-outline-primary">
                      <Edit /> Edit Profile
                    </Link>
                  </div>
                  <div className="Body">
                    <p>
                      <Category /> {user.category || 'NA'}
                    </p>
                    <p>
                      <Room /> {user.city} | {user.country || 'NA'}
                    </p>
                    {user && user.teamSize ? (
                      <p>
                        <People /> {`${user.teamSize} People` || 'NA'}
                      </p>
                    ) : (
                      <p>
                        <People /> NA
                      </p>
                    )}
                    {user && user.type && (
                      <p>
                        <MergeType /> {user.type}
                      </p>
                    )}
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Card>

        <Card className="mt-5">
          <Row>
            <Col md={3} className="Left-Cat">
              <Info /> About
            </Col>
            <Col>
              {loading ? (
                <Skeleton width={'100%'} height={'100%'} />
              ) : (
                <div className="Body">
                  <p>{user.about}</p>
                </div>
              )}
            </Col>
          </Row>
        </Card>

        <Card className="mt-5">
          <Row>
            <Col md={3} className="Left-Cat">
              <ContactMail /> Contact
            </Col>
            <Col>
              {loading ? (
                <Skeleton width={'100%'} height={'100%'} />
              ) : (
                <div className="Body">
                  <p>
                    <Home /> {user.address || 'NA'}
                  </p>
                  <p>
                    <Email /> {user.email || 'NA'}
                  </p>
                  <p>
                    <Phone /> {user.phone || 'NA'}
                  </p>
                  <p>
                    <WebLink /> {user.webLink || 'NA'}
                  </p>
                  <p>
                    <Twitter /> {user.twitterLink || 'NA'}
                  </p>
                  <p>
                    <LinkedIn /> {user.linkedInLink || 'NA'}
                  </p>
                </div>
              )}
            </Col>
          </Row>
        </Card>

        <Card className="mt-5">
          <Row>
            <Col md={3} className="Left-Cat">
              <FileCopy /> Credentials
            </Col>
            <Col>
              {loading ? (
                <Skeleton width={'100%'} height={'100%'} />
              ) : (
                <>
                  <div className="Heading">
                    <Link to={`${this.props.match.url}/profile/edit`} className="btn btn-sm btn-outline-primary">
                      <Add /> Add Credentials
                    </Link>
                  </div>
                  <div className="Body">
                    <p>
                      <PictureAsPdf /> Certicate.pdf
                    </p>
                    <p>
                      <PictureAsImage /> ID.jpg
                    </p>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  loading: user.loading,
  error: user.error
});

const mapDispatchToProps = (dispatch) => ({
  userProfile: () => dispatch(getProfile()),
  clearErrors: () => dispatch(clearAuthErrors())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
