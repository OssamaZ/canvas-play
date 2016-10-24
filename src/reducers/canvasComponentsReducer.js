import AppConstants from '../constants/index';

let {
	ADD_ELEMENT_TO_CANVAS,
	CLEAR_CANVAS,
} = AppConstants;

export const canvasComponents = (state = {}, action) => {

   switch (action.type) {

		case CLEAR_CANVAS:
			return {};

		case ADD_ELEMENT_TO_CANVAS:
			return {...state, [action.uid]: action.component};

	}

   return state;
}
