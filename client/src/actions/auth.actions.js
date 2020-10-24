import { message } from 'antd'
import { authConstants } from '../constants/auth.constants'
import AuthService from '../services/auth.service'

const login = ({ email, password }) => dispatch => {
	dispatch({ type: authConstants.LOGIN_REQUEST })

	AuthService.login({ email, password }).then(
			() => {
				dispatch({ type: authConstants.LOGIN_SUCCESS })
				authActions.getLoggedUser()(dispatch)
			},
			error => {
				dispatch({ type: authConstants.LOGIN_FAILURE })
				message.error(error)
			}
	)
}

const register = (user, successCallback) => dispatch => {
	dispatch({ type: authConstants.REGISTER_REQUEST })

	AuthService.register(user).then(
			() => {
				dispatch({ type: authConstants.REGISTER_SUCCESS })
				successCallback()
			},
			error => {
				dispatch({ type: authConstants.REGISTER_FAILURE })
				message.error(error)
			}
	)
}

const getLoggedUser = () => dispatch => {
	dispatch({ type: authConstants.GET_LOGGED_USER_REQUEST })

	AuthService.getLoggedUser().then(
			user => {
				dispatch({ type: authConstants.GET_LOGGED_USER_SUCCESS, payload: user })
			},
			error => {
				dispatch({ type: authConstants.GET_LOGGED_USER_FAILURE })
			}
	)
}

const logout = () => dispatch => {
	dispatch({ type: authConstants.LOGOUT_REQUEST })

	AuthService.logout().then(
			() => {
				dispatch({ type: authConstants.LOGOUT_SUCCESS })
			},
			() => {
				dispatch({ type: authConstants.LOGOUT_FAILURE })
			}
	)
}

export const authActions = {
	login,
	logout,
	register,
	getLoggedUser
}