import { authConstants } from '../constants/auth.constants'

const initialState = {
	currentUser: null,
	signingIn: false,
	loadingUser: true,
	signingOut: false
}

export const auth = (state = initialState, action) => {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				signingIn: true
			}
		case authConstants.LOGIN_SUCCESS:
			return {
				signingIn: false
			}
		case authConstants.LOGIN_FAILURE:
			return {
				signingIn: false
			}
		case authConstants.GET_LOGGED_USER_REQUEST:
			return {
				loadingUser: true
			}
		case authConstants.GET_LOGGED_USER_SUCCESS:
			return {
				loadingUser: false,
				currentUser: action.payload
			}
		case authConstants.GET_LOGGED_USER_FAILURE:
			return {
				loadingUser: false,
				currentUser: null
			}
		case authConstants.LOGOUT_REQUEST:
			return {
				signingOut: true
			}
		case authConstants.LOGOUT_SUCCESS:
			return {
				signingOut: false,
				currentUser: null
			}
		case authConstants.LOGOUT_FAILURE:
			return {
				signingOut: false
			}
		default:
			return state
	}
}