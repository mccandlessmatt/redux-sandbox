import React from 'react'
import Timer from './timer'
import AddTask from './addTask'
import TaskList from './taskList'
import TimeLine from './timeLine'
import CountDown from './countDown'
import {connect} from 'react-redux'

const flip = () => {
	const timer = document.querySelector('.workflow-container');
	const list = timer.classList;

	list.toggle('flip');
}

let MicroScheduler = ({numTasks}) => {
	 return (
		<div className="workflow-container">
			<div className="front-controls">
				<Timer />
				<AddTask />
				<TaskList />
				{ numTasks > 0 ? <button onClick={flip}>Done</button> : ''}
			</div>
			<div className="back-controls">
				<button onClick={flip} className="right no-border">
					<span className="lnr lnr-cog"></span>
				</button>
				<CountDown />
				<TimeLine />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({numTasks: state.taskList.tasks.length})

MicroScheduler = connect(mapStateToProps)(MicroScheduler);

export default MicroScheduler
