import { combineReducers } from 'redux'
import { auth } from './auth.reducer'
import { allCourses } from './course.reducer'
import { currentCourse } from './currentCourse.reducer'

export default combineReducers({
	auth,
	allCourses,
	currentCourse
})