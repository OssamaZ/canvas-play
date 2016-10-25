import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';

import immutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers';

const logger = createLogger();
let createStoreWithMiddleware;

if(process.env.NODE_ENV === 'development') {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    // logger,
    immutableStateInvariant()
  )(createStore);
}
else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore);
}


export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
