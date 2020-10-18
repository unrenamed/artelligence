import axios from 'axios'

const login = ({ email, password }) => {
	return axios.post('/api/auth/authenticate', { email, password })
			.then(handleResponse)
			.catch(handleError)
}

const getLoggedUser = () => {
	return axios.get('/api/auth/loggedUser')
			.then(handleResponse)
			.catch(handleError)
}

const logout = () => {
	return axios.post('/api/auth/logout')
			.then(handleResponse)
			.catch(handleError)
}

const handleResponse = response => {
	const { data } = response.data
	return Promise.resolve(data)
}

const handleError = error => {
	const { message } = error.response.data
	return Promise.reject(message)
}

export const authService = {
	login,
	getLoggedUser,
	logout
}