/* eslint-disable import/extensions */
import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App.js';
import Header from '../src/components/Header/Header.js';

describe('<App /> Component', () => {
  test('render App component', () => {
    expect(shallow(<App />).length).toEqual(1);
  });

  test('should contain Header Component', () => {
    expect(shallow(<App />).find(Header).length).toEqual(1);
  });
});
