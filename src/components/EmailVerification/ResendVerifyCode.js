import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Container, Row, Col, Form, Alert, Spinner,
} from 'react-bootstrap';
import { checkServerNetworkError } from '../../utils/validation';
import './EmailVerification.css';
import { resendVerifyCode, clearAuthErrors } from '../../redux/actions';

class ResendVerifyCode extends React.Component {
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
    const res = await this.props.resendCode(this.state.email);
    if (res) {
      this.setState({ success: true, email: '' });
    }
  }

  render() {
    return (
      <Container className="EmailVerification">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form className="Form">
              {this.state.success ? (
                <Alert variant="success">
                  <Alert.Heading>Verification code sent successfully.</Alert.Heading>
                  <Link to="/verify">Verify Account</Link>
                </Alert>
              ) : checkServerNetworkError(this.props.error) ? (
                <Alert variant="danger">{this.props.error.network}</Alert>
              ) : (
                <Alert variant="info">
                  Enter your email address. <Link to="/">Cancel</Link>
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
                    Resend Code
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
  resendCode: (email) => dispatch(resendVerifyCode(email)),
  clearStateErrors: () => dispatch(clearAuthErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResendVerifyCode));
