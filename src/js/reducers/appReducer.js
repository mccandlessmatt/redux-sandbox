import { combineReducers } from 'redux'
import taskList from './taskListReducer'
import time from './timeReducer'

const reducer = combineReducers({
	taskList,
	time
})


export default reducer;
