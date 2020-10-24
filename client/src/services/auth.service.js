import requests from '../utils/request'

const AuthService = {
	login: ({ email, password }) => requests.post('/api/auth/authenticate', { email, password }),
	getLoggedUser: () => requests.get('/api/auth/loggedUser',),
	logout: () => requests.post('/api/auth/logout'),
}

export default AuthService
