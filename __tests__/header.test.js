import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../src/components/Header/Header';

describe('<Header /> Component', () => {
  test('should render header component', () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  });
});
