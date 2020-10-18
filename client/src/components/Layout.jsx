import NProgress from 'nprogress'
import React, { useEffect, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import { authActions } from '../actions/auth.actions'
import AppLoadSpinner from '../helpers/AppLoadSpinner'
import '../styles/Layout.css'

NProgress.configure({
	showSpinner: false,
	easing: 'ease',
	speed: 500,
	parent: '#root'
})

let prevPath = ''

const Layout = ({ children, location: { pathname, search } }) => {
	const { loadingUser, signingOut } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(authActions.getLoggedUser())
	}, [dispatch])

	const currentPath = pathname + search

	const onDone = () => {
		NProgress.done()
		prevPath = currentPath
	}

	if (currentPath !== prevPath) {
		NProgress.start()
		setTimeout(onDone, 300)
	}

	if (loadingUser || signingOut) {
		return <AppLoadSpinner />
	}

	return <Suspense fallback={ <AppLoadSpinner /> }>{ children }</Suspense>
}

export default withRouter(Layout)