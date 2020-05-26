import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Container, Row, Col, Form, Alert, Spinner,
} from 'react-bootstrap';
import { checkServerNetworkError } from '../../utils/validation';
import { clearAuthErrors, requestResetLink } from '../../redux/actions';
import './PasswordReset.css';

export class RequestLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      success: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearStateErrors();
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const res = await this.props.requestLink(this.state.email);
    if (res) {
      this.setState({ success: true, email: '' });
    }
  }

  render() {
    return (
      <Container className="PasswordReset">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form className="Form">
              {this.state.success ? (
                <Alert variant="success">
                  <Alert.Heading>
                    A link has been sent to your email address.{'\n'}
                    Follow the link to reset your password.
                  </Alert.Heading>
                </Alert>
              ) : checkServerNetworkError(this.props.error) ? (
                <Alert variant="danger">{this.props.error.network}</Alert>
              ) : (
                <Alert variant="info">
                  <Alert.Heading> Forgot your password?</Alert.Heading>
                  Please enter your email address below. We&apos;ll{'\n'}
                  send you an email with a link to reset your password. <Link to="/">Cancel</Link>
                </Alert>
              )}
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  placeholder="Enter email address"
                />
              </Form.Group>
              <Form.Group>
                {this.props.loading && <Spinner animation="border" className="float-right" variant="info" />}
                {!this.props.loading && (
                  <button
                    disabled={!this.state.email}
                    onClick={this.handleSubmit}
                    type="submit"
                    className="Auth-Button float-right"
                  >
                    Send
                  </button>
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  clearStateErrors: () => dispatch(clearAuthErrors()),
  requestLink: (email) => dispatch(requestResetLink(email)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestLink));
