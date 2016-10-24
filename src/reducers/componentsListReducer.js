// Normally, this would be generated dynamically from an API/DB or something like that
// For now, it's a static object
const DEFAULT_COMPONENTS_LIST = {
	// rectangle with default properties
	'rectangle': {
		type: 'rectangle',
		width: 100,
		height: 100,
		fill: '#ffffff',
		stroke: '#000000',
		strokeWidth: 1
	},
	// circle with default properties
	'circle': {
		type: 'circle',
		radius: 10,
		fill: '#ffffff',
		stroke: '#000000',
		strokeWidth: 1
	}
}

export const componentsList = (state = DEFAULT_COMPONENTS_LIST, action) => {
   return state;
}
