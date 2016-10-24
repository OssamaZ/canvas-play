import shortid from 'shortid';
import AppConstants from '../constants/index';

// I need the store to get all the supported elements
import store from '../app';

let {
	ADD_ELEMENT_TO_CANVAS,
	CLEAR_CANVAS,
	CHANGE_DRAWING_COMPONENT,

	MAKE_COMPONENT_ACTIVE,
	DELETE_COMPONENT,
	UPDATE_CANVAS_COMPONENT
} = AppConstants;

export const addComponentToCanvas = (type, x, y) => {
	return dispatch => {
		let uid = shortid.generate(),
	      // WE SHOULD NOT ALTER THE STATE .. EVER
	      component = _.cloneDeep(store.getState().componentsList[type]);

		// to draw a component, we need its x and y coordinates on the canvas
		component = {...component, uid, x, y};
		dispatch({
			type: ADD_ELEMENT_TO_CANVAS,
			uid,
			component
		});
		// EVERYTHING actually is synchronous, but since i need uid in my next step (make the component active)
		// i made this whole action asynchronous ;)
		return new Promise((resolve, reject) => {
			resolve(uid);
		});
	}
}

export const clearCanvas = () => {
	return {
		type: CLEAR_CANVAS
	}
}

export const makeComponentActive = (uid) => {
	return {
		type: MAKE_COMPONENT_ACTIVE,
		uid
	}
}

export const deleteComponent = (uid) => {
	return {
		type: DELETE_COMPONENT,
		uid
	}
}

export const updateCanvasComponent = (uid, newProps) => {
	return {
		type: UPDATE_CANVAS_COMPONENT,
		uid,
		newProps
	}
}

export const changeTheDrawingComponent = (name) => {
	return {
		type: CHANGE_DRAWING_COMPONENT,
		name
	}
}
