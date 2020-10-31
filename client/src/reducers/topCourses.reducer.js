import { courseConstants } from '../constants/course.constants'

const initialState = {
	loading: false,
	data: []
}

export const topCourses = (state = initialState, action) => {
	switch (action.type) {
		case courseConstants.GET_TOP_COURSES_REQUEST:
			return {
				...state,
				loading: true
			}
		case courseConstants.GET_TOP_COURSES_SUCCESS:
			const courses = action.payload

			return {
				...state,
				loading: false,
				data: courses
			}
		case courseConstants.GET_TOP_COURSES_FAILURE:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}