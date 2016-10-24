import undoable from 'redux-undo';
import AppConstants from '../constants/index';

let {
	ADD_ELEMENT_TO_CANVAS,
	CLEAR_CANVAS,
	CHANGE_DRAWING_COMPONENT,

	MAKE_COMPONENT_ACTIVE,
	DELETE_COMPONENT,
	UPDATE_CANVAS_COMPONENT
} = AppConstants;

const canvasComponentsBasic = (state = {}, action) => {

   switch (action.type) {

		case CLEAR_CANVAS:
			return {};

		case ADD_ELEMENT_TO_CANVAS:
			return {...state, [action.uid]: action.component};

		case DELETE_COMPONENT:
			let _state = {...state};
			delete _state[action.uid];
			return _state;

		case UPDATE_CANVAS_COMPONENT:
			return {
				...state,
				[action.uid]: {
					...state[action.uid],
					...action.newProps
				}
			};

	}

   return state;
}
const undoableCanvasComponents = undoable(canvasComponentsBasic);
export const canvasComponents = undoableCanvasComponents;

const activeComponentUIDBasic = (state = null, action) => {

	switch (action.type) {

		case CLEAR_CANVAS:
			return null;

		case DELETE_COMPONENT:
			return action.uid === state ? null : state;

		case MAKE_COMPONENT_ACTIVE:
			return action.uid;

	}

   return state;
}
const undoableActiveComponentUID = undoable(activeComponentUIDBasic);
export const activeComponentUID = undoableActiveComponentUID;

export const activeDrawingComponent = (state = 'rectangle', action) => {

	switch (action.type) {

		case CHANGE_DRAWING_COMPONENT:
			return action.name;

	}

   return state;
}
