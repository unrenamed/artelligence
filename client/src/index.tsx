import React from 'react'
import { render } from 'react-dom'
import { store } from './helpers/store'
import { Provider } from 'react-redux'

import App from './App'
import './index.css'

const rootNode = document.querySelector('#root')

render(
	<Provider store={ store }>
		<App />
	</Provider>,
	rootNode
)