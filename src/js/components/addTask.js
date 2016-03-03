import React from 'react'
import { connect } from 'react-redux'

const generateRGB = () => {
	let rgb = [0,0,0].map(() => Math.floor(Math.random() * 255));
	return rgb.join(', ');
}

const addTask = (text, total) => {
  return {
    type: 'ADD_TASK',
    id: total,
    name: text,
    color: `rgb(${generateRGB()})`
  };
};

const ENTER_KEY = 13;

let AddTask = React.createClass({
	checkEnter(e){
		if (e.which === ENTER_KEY){
			this.props.dispatch(addTask(this.refs.taskInput.value, this.props.numTasks + 1));
			this.refs.taskInput.value = '';
		}
	},
	render(){
		return(
			<div>
				<input type="text" ref="taskInput" placeholder="What do you need to do?" onKeyUp={this.checkEnter}/>
			</div>
		)
	}
});

const mapStateToProps = (state) => ({numTasks: state.taskList.tasks.length})

AddTask = connect(
	mapStateToProps
)(AddTask)

export default AddTask
