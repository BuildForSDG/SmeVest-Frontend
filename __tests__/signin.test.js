import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import { SignIn } from '../src/components/SignIn/SignIn';

const { Group } = Form;

describe('Sign In Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignIn />);
  });

  test('should render sign in component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render file input tags', () => {
    expect(wrapper.find(Group).length).toEqual(3);
  });
});
