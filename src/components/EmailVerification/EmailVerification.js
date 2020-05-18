import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Form, Alert, Spinner,
} from 'react-bootstrap';
import { checkServerNetworkError } from '../../utils/validation';
import './EmailVerification.css';

class EmailVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Check if token is available before user can view this page
    if (!this.props.verificationCode) this.props.history.push('/');
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ code: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.verifyCode(this.state.code, this.props.verificationCode);
  }

  render() {
    return (
      <Container className="EmailVerification">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form className="Form">
              {checkServerNetworkError(this.props.error) ? (
                <Alert variant="danger">{this.props.error.network}</Alert>
              ) : (
                <Alert variant="info">
                  <Alert.Heading>{this.props.message && 'Account created successfully.'}</Alert.Heading>A code has been
                  sent to {this.props.email}. Enter the code to verify your account. Didn&apos;t get a code ?{' '}
                  <Link to="/">Resend Code</Link>
                </Alert>
              )}
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email verification code</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.code}
                  onChange={this.handleInputChange}
                  placeholder="Enter verification code"
                />
              </Form.Group>
              <Form.Group>
                {this.props.loading && <Spinner animation="border" className="float-right" variant="info" />}
                {!this.props.loading && (
                  <button
                    disabled={!this.state.code}
                    onClick={this.handleSubmit}
                    type="submit"
                    className="Auth-Button float-right"
                  >
                    Verify
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
  verificationCode: state.auth.emailConfirmCode,
  loading: state.auth.loading,
  error: state.auth.error,
  email: state.auth.email,
});

const mapDispatchToProps = (dispatch) => ({
  verifyCode: (userCode, correctCode) => dispatch(() => correctCode === userCode),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
