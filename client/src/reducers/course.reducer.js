import { courseConstants } from '../constants/course.constants'

const initialState = {
	loading: false,
	data: [],
	page: 0,
	count: 0,
	firstLoad: true
}

export const allCourses = (state = initialState, action) => {
	switch (action.type) {
		case courseConstants.GET_ALL_COURSES_REQUEST:
			return {
				...state,
				loading: true
			}
		case courseConstants.GET_ALL_COURSES_SUCCESS:
			const { rows: newData, page: nextPage, count, } = action.payload
			const { data: prevData } = state

			return {
				...state,
				loading: false,
				count,
				page: nextPage,
				data: prevData.concat(newData),
				firstLoad: false
			}
		case courseConstants.GET_ALL_COURSES_FAILURE:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}