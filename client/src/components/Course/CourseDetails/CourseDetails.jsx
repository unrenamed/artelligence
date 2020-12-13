import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { courseActions } from '../../../actions/course.action'
import '../../../styles/Course/CourseDetails/CourseDetails.scss'
import CourseLessons from './CourseLessons'
import DetailsHeader from './DetailsHeader'

const CourseDetails = ({ match }) => {
	const { id: courseId } = match.params
	const { loading, data: course } = useSelector(state => state.currentCourse)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(courseActions.getById(courseId))
	}, [])

	if (loading) return null

	return (
			<div className='course-details'>
				<DetailsHeader course={ course } />
				<CourseLessons lessons={ course.lessons } />
			</div>
	)
}

export default CourseDetails