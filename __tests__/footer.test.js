import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../src/components/Footer/Footer.js';

describe('<Footer /> Component', () => {
  test('should render footer component', () => {
    expect(shallow(<Footer />)).toMatchSnapshot();
  });
});
