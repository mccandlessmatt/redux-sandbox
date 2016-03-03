import React from 'react'
import {Provider} from 'react-redux'
import MicroScheduler from './MicroScheduler'

const App = ({store}) => (
	<Provider store={store}>
		<MicroScheduler />
	</Provider>
)

export default App
