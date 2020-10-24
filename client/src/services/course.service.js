import requests from '../utils/request'

const limit = (count, page) => `limit=${ count }&offset=${ page ? page * count : 0 }`

const CourseService = {
	fetchAll: page => requests.get('/api/courses', limit(6, page))
}

export default CourseService
