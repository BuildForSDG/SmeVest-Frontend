import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/pages/Home/Home';
import Hero from '../src/components/Hero/Hero';
import Info from '../src/components/Info/Info';
import { Header } from '../src/components/Header/Header';

describe('<Home /> Component', () => {
  const wrapper = shallow(<Home />);
  test('should render home component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
