import AppConstants from '../constants/index';

let {
	ADD_ELEMENT_TO_CANVAS,
	CLEAR_CANVAS,
	MAKE_COMPONENT_ACTIVE,
	DELETE_COMPONENT
} = AppConstants;

export const canvasComponents = (state = {}, action) => {

   switch (action.type) {

		case CLEAR_CANVAS:
			return {};

		case ADD_ELEMENT_TO_CANVAS:
			return {...state, [action.uid]: action.component};

		case DELETE_COMPONENT:
			let _state = {...state};
			delete _state[action.uid];
			return _state;

	}

   return state;
}


export const activeComponentUID = (state = null, action) => {

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
