import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './helpers/PrivateRoute'

export const routes = [
	{
		path: '/',
		Component: lazy(() => import('./components/Home/Home')),
		exact: true,
		private: false
	},
	{
		path: '/login',
		Component: lazy(() => import('./components/Auth/Login')),
		exact: true,
		private: false
	},
	{
		path: '/checkout',
		Component: lazy(() => import('./components/Checkout/Checkout')),
		exact: true,
		private: true
	},
	{
		path: '/404',
		Component: lazy(() => import('./components/NotFound')),
		exact: true,
		private: false
	}
]

export const getRoutes = () =>
		routes.map(route => {
			const { path, Component, exact, private: isPrivate } = route

			return isPrivate ?
					<PrivateRoute key={ path } exact={ exact } path={ path } component={ Component } /> :
					<Route key={ path } exact={ exact } path={ path } component={ Component } />
		})
