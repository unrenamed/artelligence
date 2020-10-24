import axios from 'axios'

const requests = {
	get: (path, query) => handleRequest(() => axios.get(`${ path }?${ query }`)),
	post: (path, body) => handleRequest(() => axios.post(path, body)),
	put: (path, body) => handleRequest(() => axios.put(path, body)),
	patch: (path, body) => handleRequest(() => axios.patch(path, body)),
	delete: (path) => handleRequest(() => axios.delete(path))
}

const handleRequest = req =>
		req().then(handleResponse).catch(handleError)

const handleResponse = response => {
	const { data } = response.data
	return Promise.resolve(data)
}

const handleError = error => {
	const { message } = error.response.data
	return Promise.reject(message)
}

export default requests
