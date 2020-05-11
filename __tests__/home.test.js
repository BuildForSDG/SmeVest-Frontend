import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/pages/Home/Home.js';
import Hero from '../src/components/Hero/Hero.js';
import Info from '../src/components/Info/Info.js';

describe('<Home /> Component', () => {
  const wrapper = shallow(<Home />);
  test('should render home component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should contain hero component and info component', () => {
    expect(wrapper.containsAllMatchingElements([<Hero key="1" />, <Info key="2" />])).toBe(true);
  });
});
