import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../src/App';
import Header from '../src/components/Header/Header';

describe('<App /> Component', () => {
  test('render App component', () => {
    expect(shallow(<App attemptSignIn={() => {}} />).length).toEqual(1);
  });

  test('should contain Header Component', () => {
    expect(shallow(<App attemptSignIn={() => {}} />).find(Header).length).toEqual(1);
  });

  test('should take a snapshot of App component', () => {
    expect(shallow(<App attemptSignIn={() => {}} />)).toMatchSnapshot();
  });
});
