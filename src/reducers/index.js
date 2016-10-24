import { combineReducers } from 'redux';

// Reducers
import { componentsList } from "./componentsListReducer";
import { canvasComponents } from "./canvasComponentsReducer";

const appReducer = combineReducers({
  componentsList,
  canvasComponents
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
