import React from 'react'
import {connect} from 'react-redux'

let countDown = ({startTime}) => (
	<p className="countdown">{Math.floor(startTime/60)}:{startTime%60}</p>
);

const stateToProps = state => ({
	startTime: state.time.value
});

countDown = connect(stateToProps)(countDown)

export default countDown

