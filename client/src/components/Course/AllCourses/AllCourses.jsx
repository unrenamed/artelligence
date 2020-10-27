import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { courseActions } from '../../../actions/course.action'
import InfiniteScroll from '../../../helpers/InfiniteScroll'
import withTitle from '../../../helpers/withTitle'
import '../../../styles/Course/AllCourses.scss'
import CourseCard from '../CourseCard'

const AllCourses = () => {
	const { data, page, count, firstLoad } = useSelector(state => state.allCourses)
	const dispatch = useDispatch()

	useEffect(() => {
		if (firstLoad) {
			dispatch(courseActions.fetchAll(0))
		}
	}, [
		dispatch,
		firstLoad
	])

	const loadMore = () => {
		dispatch(courseActions.fetchAll(page + 1))
	}

	const loader =
			[...Array(3).keys()].map(i => <CourseCard key={ i } loading={ true } />)

	return (
			<div className="all-courses-wrapper">
				<h1>Courses</h1>
				<p>Learn to draw and improve your skills with Artelligence</p>
				<InfiniteScroll
						data={ data }
						dataName='course'
						count={ count }
						loadMore={ loadMore }
						loader={ loader }
						childComponent={ CourseCard }
				/>
			</div>
	)
}

export default withTitle(AllCourses, 'Courses')