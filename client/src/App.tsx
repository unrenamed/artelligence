import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'

import NotFound from "./components/NotFound"
import Checkout from "./components/checkout/Checkout"
import Main from "./components/Main"

const App = () => {

	const renderRoutes = () => (
		<Main>
			<Switch>
				<Route exact path="/checkout" component={ Checkout } />
				<Route path='/404' component={ NotFound } />
				<Redirect from='*' to='/404' />
			</Switch>
		</Main>
	)

	return (
		<Router>
			{ renderRoutes() }
		</Router>
	)
}

export default App