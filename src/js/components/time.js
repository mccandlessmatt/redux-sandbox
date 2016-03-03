import React from 'react'
import {connect} from 'react-redux'

let Time = ({timeLabel}) => (
	<p className="xlarge-text">{timeLabel}</p>
);

const mapStateToProps = (state) => ({ timeLabel: state.time.label });
Time = connect(mapStateToProps)(Time);

export default Time
