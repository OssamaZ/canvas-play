import shortid from 'shortid';
import AppConstants from '../constants/index';

// I need the store to get all the supported elements
import store from '../app';

let {
	ADD_ELEMENT_TO_CANVAS,
	CLEAR_CANVAS
} = AppConstants;

export const addComponentToCanvas = (type, x, y) => {
	let uid = shortid.generate(),
      // WE SHOULD NOT ALTER THE STATE .. EVER
      component = _.cloneDeep(store.getState().componentsList[type]);

  // to draw a component, we need its x and y coordinates on the canvas
	component = {...component, uid, x, y}
	return {
		type: ADD_ELEMENT_TO_CANVAS,
		uid,
		component
	};
}

export const clearCanvas = () => {
	return {
		type: CLEAR_CANVAS
	}
}
