import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Application from './containers/Application';
import configureStore from './store/configureStore';

// Initial state
let _initialState;
try {
  let _savedStateInstance = localStorage.getItem('canvas-playground')
  _initialState = _savedStateInstance ? JSON.parse(_savedStateInstance) : {};
} catch (e) {};

const store = configureStore(_initialState);
store.subscribe(() => {
  // I'm only persisting the canvasComponents piece of my state .. just a choice i made
  localStorage.setItem('canvas-playground', JSON.stringify({
    canvasComponents: store.getState().canvasComponents.present
  }));
});

// Exporting store is fine as long as you keep the state immutable
export default store;

render(
  <Provider store={store}>
    <Application />
  </Provider>,

  document.getElementById('main-container')
);
