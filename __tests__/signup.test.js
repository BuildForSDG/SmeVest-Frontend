import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import { SignUp } from '../src/components/SignUp/SignUp';

const { Group } = Form;

describe('Sign Up Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  test('should render sign up component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render file input tags', () => {
    expect(wrapper.find(Group).length).toEqual(5);
  });
});
