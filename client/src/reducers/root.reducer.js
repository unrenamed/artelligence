import { combineReducers } from 'redux'
import { auth } from './auth.reducer'
import { allCourses } from './course.reducer'

export default combineReducers({
	auth,
	allCourses
})