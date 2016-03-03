import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './components/app'
import appReducer from './reducers/appReducer'
import '../styles/app.scss'

const appNode = document.getElementById('app');
const store = createStore(appReducer);

ReactDOM.render(<App store={store} />, appNode);
