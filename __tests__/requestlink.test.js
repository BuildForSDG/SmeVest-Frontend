import React from 'react';
import { shallow } from 'enzyme';
import { RequestLink } from '../src/components/PasswordReset/RequestLink';

describe('PasswordReset Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RequestLink />);
  });

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
