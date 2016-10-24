import { combineReducers } from 'redux'

// Reducers
import { componentsList } from "./componentsListReducer";

const appReducer = combineReducers({
  componentsList
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
