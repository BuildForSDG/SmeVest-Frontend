import React from 'react';
import { shallow } from 'enzyme';
import { PasswordReset } from '../src/components/PasswordReset/PasswordReset';

describe('PasswordReset Component', () => {
  let wrapper;
  beforeEach(() => {
    const match = {
      params: {
        token: 'sdkgsdjgndjfgnfdjgfdi'
      }
    };
    wrapper = shallow(<PasswordReset match={match} />);
  });

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
