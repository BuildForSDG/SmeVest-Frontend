import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './App.js';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
