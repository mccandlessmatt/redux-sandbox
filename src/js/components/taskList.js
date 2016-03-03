import React from 'react'
import { connect } from 'react-redux'

const updateTask  = (id, update) => ({
	type: 'UPDATE_TASK',
	id,
	update
});

const list = (task, duration, dispatch) => (
	<tr key={task.id}>
		<td><div className="color" style={{backgroundColor: task.color}}></div>{task.name}</td>
		<td>{ Math.floor((task.duration || duration) * 100) / 100 }%</td>
		<td><button onClick={() => dispatch({type: 'EDIT_TASK', id: task.id})}>edit</button></td>
		<td>
			<button onClick={() => dispatch({type: 'REMOVE_TASK', id: task.id})}>
				<span className="lnr lnr-cross"></span>
			</button>
		</td>
	</tr>
);

const edit = (task, duration, dispatch) => (
	<tr key={task.id}>
		<td>
			<div className="color" style={{backgroundColor: task.color}}></div>
			<input type="text" value={task.name} onChange={e => dispatch(updateTask(task.id, {name: e.target.value}))}/>
		</td>
		<td><input type="text" value={task.duration !== undefined ? task.duration : duration} onChange={e => dispatch(updateTask(task.id, {duration:e.target.value}))} />%</td>
		<td><button onClick={() => dispatch({type: 'COMPLETE_EDIT_TASK', id: task.id})}>done</button></td>
		<td><button onClick={() => dispatch({type: 'REMOVE_TASK', id: task.id})}>x</button></td>
	</tr>
)

const row = (task, duration, dispatch) => {
	return task.editable ? edit(task, duration, dispatch) : list(task, duration, dispatch);
}

let TaskList = React.createClass({
	render(){
		return (
			<div>
				<table>
					<tbody>
						{this.props.tasks.map(t => row(t, this.props.duration, this.props.dispatch))}
					</tbody>
				</table>
			</div>
		)
	}
});



const mapStateToProps = (state) => ({tasks: state.taskList.tasks, duration: state.taskList.defaultDuration});

TaskList = connect(
	mapStateToProps
)(TaskList)

export default TaskList
