import { Carousel, Rate } from 'antd'
import { isEmpty } from 'lodash'
import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { skillLevels } from '../../constants/app.constants'
import '../../styles/Home/TopProductsCarousel.scss'

const TopProductsCarousel = ({ courses }) => {
	const history = useHistory()

	const getInfo = course => `Course • ${ skillLevels[course.level] }`

	const redirectToCoursePage = courseId => history.push(`/courses/${ courseId }`)

	const renderSlide = course => {
		const { id, title, avgRating, numberOfReviews } = course

		return (
				<div key={ id } className='slide' onClick={ () => redirectToCoursePage(id) }>
					<div className='board' />
					<div className='content'>
						<div className='info'>
							<h1>{ title }</h1>
							<h3>{ getInfo(course) }</h3>
							<Rate className='info-rating' disabled defaultValue={ avgRating } />
							<p className='rating-reviews'>({ numberOfReviews } reviews)</p>
						</div>
					</div>
				</div>
		)
	}

	return (
			<div className='top-courses-wrapper'>
				<h2 className='title'>TOP COURSES</h2>
				<div className='sub-title'>
					<h1 className='goal'>Reach your goals now</h1>
					<Link className='browse-all-link' to='/courses'>Browse All Courses</Link>
				</div>
				<p className='description'>Courses bring together the best projects and tutorials to guide you down the right
																	 path to advancing your skills.</p>
				<div className='top-courses-carousel'>
					<Carousel autoplay>
						{ !isEmpty(courses) && courses.map(renderSlide) }
					</Carousel>
				</div>
			</div>
	)
}

export default TopProductsCarousel