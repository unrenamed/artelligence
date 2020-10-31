import requests from '../utils/request'

const limit = (count, page) => `limit=${ count }&offset=${ page ? page * count : 0 }`

const CourseService = {
	fetchAll: page => requests.get('/api/courses', limit(6, page)),
	getById: courseId => requests.get(`/api/courses/${ courseId }`),
	getTop: () => requests.get('/api/courses/top')
}

export default CourseService
