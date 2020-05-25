import React from 'react';
import { shallow } from 'enzyme';
import { PasswordReset } from '../src/components/PasswordReset/PasswordReset';

describe('PasswordReset Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PasswordReset />);
  });

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
