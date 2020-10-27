import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import './App.scss'
import Layout from './components/Layout'
import Main from './components/Main'
import { getRoutes } from './routes'

const App = () => {

	const renderRoutes = () => (
			<Main>
				<Switch>
					{ getRoutes() }
					<Redirect from='*' to='/404' />
				</Switch>
			</Main>
	)

	return (
			<Router>
				<Layout>
					{ renderRoutes() }
				</Layout>
			</Router>
	)
}

export default App