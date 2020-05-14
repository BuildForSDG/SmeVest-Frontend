import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Spinner,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { checkValidity, isFormValidCheck, checkError } from '../../utils/validation';
import './SignUp.css';

class SignUp extends React.Component {
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
      role: {
        value: '',
        valid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      terms: {
        value: false,
        valid: false,
        touched: false,
      },
      isFormValid: false,
      loading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
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

    this.setState({ ...stateToUpdate, isFormValid, terms: { value: false, valid: false } });
  }

  render() {
    return (
      <div className="SignUp">
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h2 className="SignUp-Heading">SignUp With SmeVest</h2>
              <Form className="Form">
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={this.state.email.value}
                    onChange={this.handleInputChange}
                    placeholder="Enter email"
                    className={`${checkError(this.state.email)}`}
                  />
                  <Form.Control.Feedback type={`${this.state.email.valid ? 'valid' : 'invalid'}`}>
                    {`${this.state.email.valid ? 'Email looks good' : 'Invalid email address'}`}
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
                <Form.Group controlId="formGroupSelect">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    className={`${checkError(this.state.role)}`}
                    onChange={this.handleInputChange}
                    value={this.state.role.value}
                    custom
                  >
                    <option value="">Select Role</option>
                    <option value="sme">SME</option>
                    <option value="investor">INVESTOR</option>
                  </Form.Control>
                  <Form.Control.Feedback type={`${this.state.role.valid ? 'valid' : 'invalid'}`}>
                    {`${this.state.role.valid ? `${this.state.role.value} selected` : 'Select role'}`}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    custom
                    name="terms"
                    label="Agree to terms and conditions"
                    onChange={() => this.setState(
                      (state) => ({
                        terms: {
                          value: !state.terms.value,
                          valid: !state.terms.value,
                          touched: true,
                        },
                      }),
                      () => this.setState((s) => ({ isFormValid: isFormValidCheck(s) })),
                    )
                    }
                    checked={this.state.terms.value}
                    required={!this.state.terms.value}
                    className={`${this.state.terms.touched && (!this.state.terms.value ? 'was-validated' : '')}`}
                    feedback="You must agree before submitting."
                    id="terms"
                  />
                  <Link to="/terms">Terms and conditions</Link>
                  {this.state.loading && <Spinner animation="border" className="float-right" variant="info" />}
                  {!this.state.loading
                    && <button
                      disabled={!this.state.isFormValid}
                      onClick={this.handleSubmit}
                      type="submit"
                      className="Auth-Button float-right"
                    >
                      Sign Up
                    </button>
                  }
                </Form.Group>
                <p>
                  Already have an account? <Link to="/signin">Sign In</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SignUp;
