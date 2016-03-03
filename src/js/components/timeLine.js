import React from 'react'
import {connect} from 'react-redux'

let pointer;
let timeline;
let x = 0;
let time = 0;
let start;
let begin = 0;
let position = 0;
let times;
let currentIndex = 0;
let previous = 0;

const taskStyles = ({task, duration}) => ({
	width: `${duration}%`,
	height: '20px',
	backgroundColor: task.color,
	float:'left'
});

const mapTasks = ({tasks, duration}) => (
	tasks.map(task => (
		<li style={taskStyles({task, duration})} key={task.id}></li>
	))
);

const drawCountDown = function(arc, duration){
	const CIRCLE = (2 * Math.PI);
	let interval =  CIRCLE * (duration / 100) ;
		this.context.clearRect(0,0,200,200);

		this.props.tasks.reduce((prev, current) => {
			let end = prev + (current.duration !== undefined ? CIRCLE * (current.duration / 100) : interval);
			this.context.beginPath();
			this.context.strokeStyle = current.color;
			this.context.arc(100,100,75,prev, end);
			this.context.lineWidth = 25;
			this.context.stroke();
			return end;
		}, 0);

		this.context.beginPath();
		this.context.strokeStyle = '#ffffff'
		this.context.arc(100,100,95, 0, Math.PI * 2 + arc, true);
		this.context.lineWidth = 5;
		this.context.stroke();
}


let TimeLine = React.createClass({
	componentDidMount(){
		Notification.requestPermission()
		this.context = this.refs.timeline.getContext('2d');
		this.started = false;

	},

	componentDidUpdate(){
		drawCountDown.call(this, 0, this.props.duration);
	},

	startTimer(){
		this.started = true;
		window.requestAnimationFrame(this.countDown);
		times = this.props.tasks.map((current, index, tasks) => ((Math.PI * 2 / tasks.length) * (index+1)));
		console.log(times);
	},

	stopTimer(){
		this.started = false;
	},

	countDown(timestamp){
		x++;




		//console.log(times);

		if(start){
			//console.log(this.props.time);
			//console.log(start)
			position = ((Math.PI * 2) / (this.props.time * 60 * 1000)) * (x * (timestamp - start));
			//console.log(position);

		} else {
			begin = timestamp;
		}
		//console.log(position, times[currentIndex], currentIndex);
		if(position > times[currentIndex]){
			currentIndex++;
			//this.setState({currentTask: this.props.tasks[currentIndex]});

			//console.log(`changing task to: ${this.props.tasks[currentIndex].name}`);
			//console.log(times);
			/*
			this.props.dispatch({
				type: 'UPDATE_CURRENT_TASK',
				index: currentIndex
			})
			*/
/*
				new Notification('moving onto',{
					body:`moving onto ${this.props.currentTask.name}`,
					icon: this.context.getImageData(0,0,200,200)
				});
*/
			//times.shift();
		}

		if(this.started && position <= Math.PI*2){
			console.log(position, position - previous)

			if (position - previous > .01){
				previous = position;
				console.log(`drawing the donut: ${position}`)
				drawCountDown.call(this, position, this.props.duration);
			}

			window.requestAnimationFrame(this.countDown);
		}	else {
				console.log(`the animation took ${(timestamp - begin) / 1000} seconds`)
		}

		start = timestamp;


	},
	render(){
		return (
			<div>
				<canvas height="200px" width="200px" ref="timeline"></canvas>
				<p style={{color: this.props.currentTask.color}} className="large-text center-text">{this.props.currentTask.name}</p>
				<div className="center-children stopwatch-buttons">
					<button onClick={this.startTimer} className="large large-text">Start</button>
					<button onClick={this.stopTimer} className="large large-text">Stop</button>
				</div>
			</div>
		)
	}
});

const mapStateToProps = (state) => ({
	tasks: state.taskList.tasks,
	currentTask: state.taskList.currentTask,
	duration: state.taskList.defaultDuration,
	time: state.time.value
});

TimeLine = connect(mapStateToProps)(TimeLine);

export default TimeLine;
