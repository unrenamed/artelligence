import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const currentUser = useSelector(state => state.auth.currentUser)

	return (
			<Route { ...rest } render={ props =>
					currentUser
							? <Component currentUser={ currentUser } { ...props } />
							: <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
			} />
	)
}

export default PrivateRoute