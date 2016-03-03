import taskReducer from './taskReducer'

const calculateDuration = tasks => {
	let numDefault = tasks.filter(t => t.duration === undefined).length;
	let explicitTotal = tasks.reduce((previous, current) => previous + parseInt((current.duration || 0),10), 0)
	let maxDuration = 100 - explicitTotal;

	return maxDuration / numDefault;
}

const taskListReducer = (state = {tasks: [], currentTask: {}, defaultDuration: 100}, action) => {
	let tasks;
	let defaultDuration;
	let currentTask;

	switch(action.type){
		case 'ADD_TASK':

			tasks = [...state.tasks,
				taskReducer(null, action)
			];

			defaultDuration = calculateDuration(tasks);

			currentTask = tasks[0];

			return {
				...state,
				tasks,
				currentTask,
				defaultDuration
			}

		case 'REMOVE_TASK':
			tasks = state.tasks.filter(t => t.id !== action.id);
			defaultDuration = calculateDuration(tasks);
			currentTask = tasks[0];

			return {
				...state,
				tasks,
				defaultDuration
			}
		case 'UPDATE_CURRENT_TASK': {
			currentTask = state.tasks[action.index];

			return {
				...state,
				currentTask
			}

		}
		case 'EDIT_TASK':
		case 'UPDATE_TASK':
		case 'COMPLETE_EDIT_TASK':
			tasks = state.tasks.map(t => taskReducer(t, action));
			defaultDuration = calculateDuration(tasks);

			return {
				...state,
				tasks,
				defaultDuration
			}
		default:
			return state;
	}
}

export default taskListReducer;
