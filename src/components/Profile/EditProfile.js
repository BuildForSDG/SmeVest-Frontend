import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Card, Row, Form, Col, Spinner, Alert } from 'react-bootstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import { getCountries, getStates, getCities } from '../../utils/api';
import { createUserProfile } from '../../redux/actions';
import { checkValidity, isFormValidCheck, checkError, checkServerNetworkError } from '../../utils/validation';
import './Profile.css';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      states: [],
      cities: [],
      categories: {
        value: [],
        valid: props.role === 'sme',
        validation: {
          required: true
        },
        touched: false
      },
      state: {
        value: '',
        valid: true
      },
      profilePic: {
        value: null,
        valid: true,
        validation: {
          required: false,
          image: true
        },
        touched: false
      },
      name: {
        value: '',
        valid: false,
        validation: {
          required: true
        },
        touched: false
      },
      type: {
        value: '',
        valid: props.role === 'sme',
        validation: {
          required: true
        },
        touched: false
      },
      moto: {
        value: '',
        valid: true,
        validation: {
          required: false,
          minLength: 5
        },
        touched: false
      },
      about: {
        value: '',
        valid: false,
        validation: {
          required: true,
          minLength: 6
        },
        touched: false
      },
      category: {
        value: '',
        valid: props.role === 'investor',
        validation: {
          required: true
        },
        touched: false
      },
      teamSize: {
        value: '',
        valid: this.props.role === 'investor',
        validation: {
          required: true
        },
        touched: false
      },
      country: {
        value: 'Nigeria',
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      city: {
        value: '',
        valid: false,
        validation: {
          required: true
        },
        touched: false
      },
      phone: {
        value: '',
        valid: true,
        validation: {
          number: true,
          minLength: 9
        },
        touched: false
      },
      address: {
        value: '',
        valid: false,
        validation: {
          required: true
        },
        touched: false
      },
      webLink: {
        value: '',
        valid: true,
        validation: {
          required: false,
          url: true
        },
        touched: false
      },
      twitterLink: {
        value: '',
        valid: true,
        validation: {
          required: false,
          url: true
        },
        touched: false
      },
      linkedInLink: {
        value: '',
        valid: true,
        validation: {
          required: false,
          url: true
        },
        touched: false
      },
      isFormValid: false,
      loaded: true,
      isLoading: false,
      isError: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.handleCategoriesKeyDown = this.handleCategoriesKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMultiSelectCat = this.handleMultiSelectCat.bind(this);

    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    if (!this.props.userId) {
      this.props.history.push('/');
    }
    try {
      this.setState({ loaded: false, isError: false });
      const countries = await getCountries();
      this.setState({ countries }, async () => {
        try {
          const states = await getStates('Nigeria');
          if (this._isMounted) this.setState({ states, loaded: true });
        } catch (error) {
          this.setState({ loaded: true, isError: true });
        }
      });
    } catch (error) {
      this.setState({ loaded: true, isError: true });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  handleFileChange(e) {
    const { name, files } = e.target;
    if (!files.length === 0) return;

    const stateToUpdate = { ...this.state };
    const inputElement = stateToUpdate[name];
    inputElement.value = files[0];
    inputElement.valid = checkValidity(files[0].type, inputElement.validation, this.state);
    inputElement.touched = true;

    stateToUpdate[name] = inputElement;

    const isFormValid = isFormValidCheck(stateToUpdate);
    this.setState({ ...stateToUpdate, isFormValid });
  }

  async handleLocationChange(e) {
    e.preventDefault();
    e.persist();
    const stateToUpdate = { ...this.state };
    const inputElement = stateToUpdate[e.target.name];
    inputElement.value = e.target.value;
    inputElement.touched = true;
    if (e.target.name === 'country') {
      this.setState({ isLoading: true });

      const states = await getStates(e.target.value);
      stateToUpdate.states = states;

      stateToUpdate[e.target.name] = inputElement;
    }

    if (e.target.name === 'state') {
      try {
        this.setState({ isLoading: true });
        const cities = await getCities(e.target.value);
        stateToUpdate.cities = cities;
        stateToUpdate.city.value = cities[0].city_name;
        stateToUpdate.city.valid = true;
      } catch (error) {
        this.setState({ isLoading: false });
      }
      stateToUpdate[e.target.name] = inputElement;
    }

    const isFormValid = isFormValidCheck(stateToUpdate);
    this.setState({ ...stateToUpdate, isFormValid, isLoading: false });
  }

  removeCategory(i) {
    const newCategories = [...this.state.categories.value].filter((_, ind) => ind !== i);
    const isFormValid = isFormValidCheck(this.state) && this.state.categories.value.length > 0;
    this.setState({ categories: { value: newCategories }, isFormValid });
  }

  handleCategoriesKeyDown(e) {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (this.state.categories.value.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      const isFormValid = isFormValidCheck(this.state);
      this.setState({
        categories: {
          value: [...this.state.categories.value, val]
        },
        isFormValid
      });
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeCategory(this.state.tags.length - 1);
    }
  }

  handleMultiSelectCat(e) {
    this.setState({
      categories: {
        value: Array.from(e.target.selectedOptions, (item) => item.value),
        touched: true,
        valid: this.state.categories.value.length >= 1
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { userId } = this.props;
    const { role } = this.props;
    const {
      name,
      phone,
      profilePic,
      about,
      country,
      city,
      address,
      teamSize,
      webLink,
      linkedInLink,
      twitterLink,
      categories,
      category,
      type,
      moto
    } = this.state;

    const formData = new FormData();

    formData.append('profilePic', profilePic.value);
    formData.append('userId', userId);
    formData.append('name', name.value);
    formData.append('phone', phone.value);
    formData.append('moto', moto.value);
    formData.append('country', country.value);
    formData.append('city', city.value);
    formData.append('about', about.value);
    formData.append('address', address.value);
    formData.append('webLink', webLink.value);
    formData.append('linkedInLink', linkedInLink.value);
    formData.append('twitterLink', twitterLink.value);
    if (role === 'sme') {
      formData.append('teamSize', teamSize.value);
      formData.append('category', category.value);
    } else {
      formData.append('teamSize', 1);
      formData.append('type', type.value);
      formData.append('category', categories.value);
    }

    const res = await this.props.createProfile(formData);
    if (res) {
      this.props.history.push('/dashboard/profile');
    }
  }

  render() {
    const {
      countries,
      states,
      cities,
      categories,
      state,
      name,
      about,
      teamSize,
      category,
      country,
      city,
      address,
      webLink,
      twitterLink,
      linkedInLink,
      moto,
      phone,
      profilePic,
      type,
      loaded,
      isError
    } = this.state;

    if (!loaded) {
      return (
        <Container>
          <Skeleton width="100%" animation="wave" height={500} />
        </Container>
      );
    }

    if (loaded && isError) {
      return <p>Network Error</p>;
    }

    return (
      <Container className="Profile">
        <Row>
          <Col>
            <h2 className="text-center">Edit Your Profile</h2>
            {checkServerNetworkError(this.props.error) ? (
              <Alert variant="danger">{this.props.error.network}</Alert>
            ) : null}
          </Col>
        </Row>
        <Card className="px-3">
          <Form>
            <Row>
              <Col sm={12} md={4}>
                <Form.Group controlId="name">
                  <Form.Label>
                    Organization Name <small>*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Organization Name"
                    onChange={this.handleInputChange}
                    name="name"
                    value={name.value}
                    className={`${checkError(name)}`}
                  />
                  <Form.Control.Feedback type={`${name.valid ? 'valid' : 'invalid'}`}>
                    {`${name.valid ? 'Name looks good' : 'Invalid name provided'}`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="moto">
                  <Form.Label>Motto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Organization Moto"
                    name="moto"
                    onChange={this.handleInputChange}
                    className={`${checkError(moto)}`}
                    value={moto.value}
                  />
                  <Form.Control.Feedback type={`${moto.valid ? 'valid' : 'invalid'}`}>
                    {`${moto.valid ? 'Motto looks good' : 'Invalid motto entered'}`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="profilePic">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.File
                    name="profilePic"
                    id="profilePic"
                    label={profilePic.value ? profilePic.value.name : 'Profile Picture'}
                    onChange={this.handleFileChange}
                    className={`${checkError(profilePic)}`}
                    custom
                  />
                  <Form.Control.Feedback type={`${profilePic.valid ? 'valid' : 'invalid'}`}>
                    {`${
                      profilePic.valid ? `${profilePic.value && profilePic.value.name} selected` : 'Select only image'
                    }`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {this.props.role === 'sme' && (
                <Col sm={12} md={this.props.role === 'sme' ? 6 : 4}>
                  <Form.Group controlId="teamSize">
                    <Form.Label>
                      Team Size <small>*</small>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="teamSize"
                      value={teamSize.value}
                      onChange={this.handleInputChange}
                      className={`${checkError(teamSize)}`}
                    >
                      <option value="">Team Size</option>
                      <option value="1-10">1 - 10</option>
                      <option value="10-20">10 - 20</option>
                      <option value="20+">20+</option>
                    </Form.Control>
                    <Form.Control.Feedback type={`${teamSize.valid ? 'valid' : 'invalid'}`}>
                      {`${teamSize.valid ? `${teamSize.value} Selected` : 'Please Select Team Size'}`}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}

              <Col sm={12} md={this.props.role === 'sme' ? 6 : 4}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    placeholder="Enter Officail Phone Number"
                    value={phone.value}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              {this.props.role === 'investor' && (
                <Col sm={12} md={4}>
                  <Form.Group controlId="type">
                    <Form.Label>
                      Type <small>*</small>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      value={type.value}
                      onChange={this.handleInputChange}
                      className={`${checkError(type)}`}
                    >
                      <option value="">Type</option>
                      <option value="personal">Personal</option>
                      <option value="organization">Organization</option>
                      <option value="government">Government</option>
                    </Form.Control>
                    <Form.Control.Feedback type={`${type.valid ? 'valid' : 'invalid'}`}>
                      {`${type.valid ? `${type.value} Selected` : 'Please Select Type'}`}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
            </Row>

            <Row>
              <Col sm={12} md={4}>
                <Form.Group controlId="country">
                  <Form.Label>Country {this.state.isLoading && <Spinner animation="border" size="sm" />}</Form.Label>
                  <Form.Control as="select" name="country" value={country.value} onChange={this.handleLocationChange}>
                    {countries.map((c) => (
                      <option key={c.country_short_name} value={c.country_name}>
                        {c.country_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={12} md={4}>
                <Form.Group controlId="state">
                  <Form.Label>
                    State <small>*</small> {this.state.isLoading && <Spinner animation="border" size="sm" />}
                  </Form.Label>
                  <Form.Control as="select" name="state" value={state.value} onChange={this.handleLocationChange}>
                    {states.map((s) => (
                      <option key={s.state_name} value={s.state_name}>
                        {s.state_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={12} md={4}>
                <Form.Group controlId="city">
                  <Form.Label>
                    City <small>*</small>
                  </Form.Label>
                  <Form.Control as="select" name="city" value={city.value} onChange={this.handleInputChange}>
                    <option value="">Select City</option>
                    {cities &&
                      cities.map((c) => (
                        <option key={c.city_name} value={c.city_name}>
                          {c.city_name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={12} md={12}>
                {this.props.role === 'investor' ? (
                  <Form.Group controlId="categories">
                    <Form.Label>
                      Categories <small>*</small>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      multiple
                      name="categories"
                      value={categories.value}
                      onChange={this.handleMultiSelectCat}
                    >
                      <option value="real-estate">Real Estate</option>
                      <option value="education">Education</option>
                      <option value="stocks">Stocks</option>
                      <option value="bank">Bank</option>
                      <option value="technology">Technology</option>
                      <option value="bond">Bond</option>
                      <option value="security">Security</option>
                    </Form.Control>
                  </Form.Group>
                ) : (
                  <Form.Group controlId="categroy">
                    <Form.Label>
                      Category <small>*</small>
                    </Form.Label>
                    <Form.Control as="select" name="category" value={category.value} onChange={this.handleInputChange}>
                      <option value="real-estate">Real Estate</option>
                      <option value="education">Education</option>
                      <option value="stocks">Stocks</option>
                      <option value="bank">Bank</option>
                      <option value="technology">Technology</option>
                      <option value="bond">Bond</option>
                      <option value="security">Security</option>
                    </Form.Control>
                  </Form.Group>
                )}
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6}>
                <Form.Group controlId="about">
                  <Form.Label>
                    About Organization <small>*</small>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="about"
                    value={about.value}
                    onChange={this.handleInputChange}
                    className={`${checkError(about)}`}
                  />
                  <Form.Control.Feedback type={`${about.valid ? 'valid' : 'invalid'}`}>
                    {`${about.valid ? 'About looks good' : 'Invalid info provided'}`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId="address">
                  <Form.Label>
                    Address <small>*</small>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="address"
                    value={address.value}
                    onChange={this.handleInputChange}
                    className={`${checkError(address)}`}
                  />
                  <Form.Control.Feedback type={`${address.valid ? 'valid' : 'invalid'}`}>
                    {`${address.valid ? 'Address looks good' : 'Invalid address provided'}`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Web Links */}
            <Row>
              <Col sm={12} md={4}>
                <Form.Group controlId="webLink">
                  <Form.Label>Web Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="http://www.website.org"
                    name="webLink"
                    value={webLink.value}
                    onChange={this.handleInputChange}
                    className={`${checkError(webLink)}`}
                  />
                  <Form.Control.Feedback type={`${webLink.valid ? 'valid' : 'invalid'}`}>
                    {`${webLink.valid ? 'Link looks good' : 'Invalid url'}`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="twitterLink">
                  <Form.Label>Twitter Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="http://www.twitter.com/org"
                    name="twitterLink"
                    value={twitterLink.value}
                    onChange={this.handleInputChange}
                    className={`${checkError(webLink)}`}
                  />
                  <Form.Control.Feedback type={`${twitterLink.valid ? 'valid' : 'invalid'}`}>
                    {`${twitterLink.valid ? 'Link looks good' : 'Invalid url'}`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="linkedInLink">
                  <Form.Label>LinkedIn Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="linkedInLink"
                    placeholder="http://www.linkedin.com/org"
                    value={linkedInLink.value}
                    onChange={this.handleInputChange}
                    className={`${checkError(linkedInLink)}`}
                  />
                  <Form.Control.Feedback type={`${linkedInLink.valid ? 'valid' : 'invalid'}`}>
                    {`${linkedInLink.valid ? 'Link looks good' : 'Invalid url'}`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Link to="/dashboard/profile" className="btn btn-warning mt-3">
                  Cancel
                </Link>
              </Col>
              <Col>
                {this.props.loading && <Spinner animation="border" className="float-right" variant="info" />}
                {!this.props.loading && (
                  <button
                    disabled={!this.state.isFormValid}
                    onClick={this.handleSubmit}
                    type="submit"
                    className="Auth-Button float-right"
                  >
                    Save
                  </button>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  userId: auth.currentUser ? auth.currentUser.id : 0,
  role: auth.currentUser ? auth.currentUser.role : '',
  loading: user.loading,
  error: user.error
});

const mapDispatchToProps = (dispatch) => ({
  createProfile: (formData) => dispatch(createUserProfile(formData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
