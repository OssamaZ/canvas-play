import { combineReducers } from 'redux';

// Reducers
import { componentsList } from "./componentsListReducer";
import { canvasComponents, activeComponentUID } from "./canvasComponentsReducer";

const appReducer = combineReducers({
  componentsList,
  canvasComponents,
  activeComponentUID
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
