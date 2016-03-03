import React from 'react'
import Time from './time'
import TimerControls from './timerControls'

const Timer = () => (
	<div className='timer'>
		<p>How much Time do you have?</p>
		<Time />
		<TimerControls />
	</div>
);

export default Timer