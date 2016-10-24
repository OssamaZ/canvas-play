import { combineReducers } from 'redux';

// Reducers
import { componentsList } from "./componentsListReducer";
import { canvasComponents, activeComponentUID, activeDrawingComponent } from "./canvasComponentsReducer";

const appReducer = combineReducers({
  componentsList,
  canvasComponents,
  activeComponentUID,
  activeDrawingComponent
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
