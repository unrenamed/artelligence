import { message } from 'antd'
import { courseConstants } from '../constants/course.constants'
import CourseService from '../services/course.service'

const fetchAll = page => dispatch => {
	dispatch({ type: courseConstants.GET_ALL_COURSES_REQUEST })

	CourseService.fetchAll(page).then(
			({ rows, count }) => {
				dispatch({ type: courseConstants.GET_ALL_COURSES_SUCCESS, payload: { rows, count, page } })
			},
			error => {
				dispatch({ type: courseConstants.GET_ALL_COURSES_FAILURE })
				message.error(error)
			}
	)
}

const getById = courseId => dispatch => {
	dispatch({ type: courseConstants.GET_COURSE_REQUEST })

	CourseService.getById(courseId).then(
			course => {
				dispatch({ type: courseConstants.GET_COURSE_SUCCESS, payload: course })
			},
			error => {
				dispatch({ type: courseConstants.GET_COURSE_FAILURE })
				message.error(error)
			}
	)
}

export const courseActions = {
	fetchAll,
	getById
}
