import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Container, Row, Col, Spinner, Alert,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { onSignIn, verifyAccountStart, clearAuthErrors } from '../../redux/actions';
import {
  checkValidity,
  isFormValidCheck,
  checkError,
  checkServerEmailError,
  checkServerNetworkError,
  checkServerVerifyError,
} from '../../utils/validation';
import './SignIn.css';

export class SignIn extends React.Component {
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
      isFormValid: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearStateErrors();
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ isFormValid: false });
    const { email, password } = this.state;
    const user = { email: email.value, password: password.value };
    const res = await this.props.signIn(user);
    if (res) this.props.history.push('/dashboard');
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

  render() {
    return (
      <div className="SignIn">
        <Container>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h2 className="SignIn-Heading">Sign In</h2>
              <Form className="Form">
                {checkServerNetworkError(this.props.error) ? (
                  <Alert variant="danger">{this.props.error.network}</Alert>
                ) : checkServerVerifyError(this.props.error) ? (
                  <Alert variant="info">
                    {this.props.error.unverified} <Link to="/verify">Verify Account</Link>
                  </Alert>
                ) : null}
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={this.state.email.value}
                    onChange={this.handleInputChange}
                    placeholder="Enter email"
                    className={`${
                      checkServerEmailError(this.props.error) ? 'is-invalid' : checkError(this.state.email)
                    }`}
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

                <Form.Group>
                  <Link to="/forgot-password">Forgot your password?</Link>
                  {this.props.loading && <Spinner animation="border" className="float-right" variant="info" />}
                  {!this.props.loading && (
                    <button
                      disabled={!this.state.isFormValid}
                      onClick={this.handleSubmit}
                      type="submit"
                      className="Auth-Button float-right"
                    >
                      Sign In
                    </button>
                  )}
                </Form.Group>
                <p>
                  Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isVerified: state.auth.isVerified,
  role: state.auth.role,
  loggedIn: state.auth.currentUser !== null,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: ({ email, password }) => dispatch(onSignIn({ email, password })),
  verifyAccountInit: ({ code, email }) => dispatch(verifyAccountStart({ code, email })),
  clearStateErrors: () => dispatch(clearAuthErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
