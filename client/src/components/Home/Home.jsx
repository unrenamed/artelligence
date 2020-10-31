import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { courseActions } from '../../actions/course.action'
import withTitle from '../../helpers/withTitle'
import '../../styles/Home/Home.scss'
import Jumbotron from './Jumbotron'
import TopProductsCarousel from './TopProductsCarousel'

const Home = () => {
	const dispatch = useDispatch()
	const { data: topCourses } = useSelector(state => state.topCourses)

	useEffect(() => {
		dispatch(courseActions.getTop())
	}, [dispatch])

	return (
			<>
				<Jumbotron />
				<TopProductsCarousel courses={ topCourses } />
			</>
	)
}

export default withTitle(Home, 'Home')