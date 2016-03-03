const timeReducer = (state = {value:0, label:'0h 0m'}, action = {}) => {
		switch(action.type){
			case 'CHANGE_TIME':
				return {
					value: action.time,
					label: `${ Math.floor(action.time / 60) }h ${action.time % 60}m`
				}
			default:
				return state;
		}
}

export default timeReducer;
