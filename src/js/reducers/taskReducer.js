const taskReducer = (state = {}, action = {}) => {
	switch(action.type){
		case 'ADD_TASK':
			return {
				id: action.id,
				name: action.name,
				color: action.color,
				editable: false
			}

		case 'EDIT_TASK':
			if (state.id !== action.id){
				return state;
			}

			return {
				...state,
				editable: true
			}

		case 'UPDATE_TASK':
			if (state.id !== action.id){
				return state;
			}

			let newTask = {
				...state,
				...action.update
			}

			return newTask;

		case 'COMPLETE_EDIT_TASK':
			if (state.id !== action.id){
				return state;
			}

			return {
				...state,
				editable: false
			}
			default:
				return state;
	}
}

export default taskReducer;
