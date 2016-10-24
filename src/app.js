import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Application from './containers/Application';
import configureStore from './store/configureStore';

const store = configureStore();
export default store;

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  
  document.getElementById('main-container')
);
