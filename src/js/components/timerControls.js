import React from 'react'
import {connect} from 'react-redux'

const changeTime = newTime => (
	{
		type: 'CHANGE_TIME',
		time: newTime
	}
);

const mapStateToProps = (state) => ({ time:state.time.value });

let TimerControls = React.createClass({
	render(){
		return(
			<input type="range" min={0} max={8*60} value={this.props.time} step={15} onChange={(event)=>{
				this.props.dispatch(changeTime(event.target.value))
			}}/>
		)
	}
})

TimerControls = connect(mapStateToProps)(TimerControls);

export default TimerControls