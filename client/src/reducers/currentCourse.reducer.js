import { courseConstants } from '../constants/course.constants'

const initialState = {
	loading: false,
	data: {}
}

export const currentCourse = (state = initialState, action) => {
	switch (action.type) {
		case courseConstants.GET_COURSE_REQUEST:
			return {
				...state,
				loading: true
			}
		case courseConstants.GET_COURSE_SUCCESS:
			const course = action.payload
			const { data: prevData } = state

			return {
				...state,
				loading: false,
				data: { ...prevData, ...course }
			}
		case courseConstants.GET_COURSE_FAILURE:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}
