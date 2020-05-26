import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Container, Row, Col, Form, Alert, Spinner,
} from 'react-bootstrap';
import {
  checkServerNetworkError,
  checkServerEmailError,
  checkError,
  checkValidity,
  isFormValidCheck,
} from '../../utils/validation';
import { clearAuthErrors, resetPassword } from '../../redux/actions';

import './PasswordReset.css';

export class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        valid: false,
        validation: {
          required: true,
          email: true,
        },
        touched: false,
      },
      password: {
        value: '',
        valid: false,
        validation: {
          required: true,
          minLength: 6,
        },
        touched: false,
      },
      confirm: {
        value: '',
        valid: false,
        validation: {
          required: true,
          match: 'password',
        },
        touched: false,
      },
      token: '',
      isFormValid: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Get token from url
    const { token } = this.props.match.params;
    if (!token.trim()) {
      this.props.history.push('/');
    } else {
      this.setState((prevState) => ({ ...prevState, token }));
    }
  }

  componentWillUnmount() {
    this.props.clearStateErrors();
  }

  handleInputChange(e) {
    e.preventDefault();
    const stateToUpdate = { ...this.state };
    const inputElement = stateToUpdate[e.target.name];
    inputElement.value = e.target.value;
    inputElement.valid = checkValidity(e.target.value, inputElement.validation, this.state);
    inputElement.touched = true;
    stateToUpdate[e.target.name] = inputElement;

    const isFormValid = isFormValidCheck(stateToUpdate);

    this.setState({ ...stateToUpdate, isFormValid });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password, token } = this.state;
    const user = { email: email.value, password: password.value, token };
    const res = await this.props.reset(user);
    if (res) {
      this.setState({
        success: true,
        email: '',
        password: '',
        confirm: '',
      });
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
                  <Alert.Heading>Password reset is successful. Proceed to sign in.</Alert.Heading>
                  <Link to="/signin">Sign In</Link>
                </Alert>
              ) : checkServerNetworkError(this.props.error) ? (
                <Alert variant="danger">{this.props.error.network}</Alert>
              ) : (
                <Alert variant="info">Enter your email and new password</Alert>
              )}
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email.value}
                  onChange={this.handleInputChange}
                  placeholder="Enter email"
                  className={`${checkServerEmailError(this.props.error) ? 'is-invalid' : checkError(this.state.email)}`}
                />
                <Form.Control.Feedback type={`${this.state.email.valid && !this.props.error ? 'valid' : 'invalid'}`}>
                  {`${
                    checkServerEmailError(this.props.error)
                      ? this.props.error.email
                      : this.state.email.valid
                        ? 'Email looks good'
                        : 'Invalid email address'
                  }`}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={this.state.password.value}
                  onChange={this.handleInputChange}
                  placeholder="Password"
                  className={`${checkError(this.state.password)}`}
                />
                <Form.Control.Feedback type={`${this.state.password.valid ? 'valid' : 'invalid'}`}>
                  {`${this.state.password.valid ? 'Passowrd looks good' : 'Password min length is 6'}`}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm"
                  value={this.state.confirm.value}
                  onChange={this.handleInputChange}
                  placeholder="Confirm Password"
                  className={`${checkError(this.state.confirm)}`}
                />
                <Form.Control.Feedback type={`${this.state.confirm.valid ? 'valid' : 'invalid'}`}>
                  {`${this.state.confirm.valid ? 'Password match' : 'Password does not match'}`}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                {this.props.loading && <Spinner animation="border" className="float-right" variant="info" />}
                {!this.props.loading && (
                  <button
                    disabled={!this.state.isFormValid}
                    onClick={this.handleSubmit}
                    type="submit"
                    className="Auth-Button float-right"
                  >
                    Reset
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
  reset: ({ email, password, token }) => dispatch(resetPassword({ email, password, token })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset));
