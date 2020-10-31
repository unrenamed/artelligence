import { Rate } from 'antd'
import React from 'react'
import { skillLevels } from '../../../constants/app.constants'
import '../../../styles/Course/CourseDetails/DetailsHeader.scss'
import PurchaseButton from './PurchaseButton'

const DetailsHeader = ({ course }) => {

	const getPrice = () =>
			Number(course.price) === 0 ? 'Free' : `$ ${ course.price }`

	const getInfo = () =>
			`Course • ${ skillLevels[course.level] } • ${ getPrice() }`

	const buyCourse = () => alert('PURCHASED')

	const renderPurchaseButton = () => Number(course.price) !== 0 ?
			<PurchaseButton course={ course } onClick={ buyCourse } /> : null

	return (
			<div className='course-details-header'>
				<div className='board' />
				<div className='content'>
					<div className='logo' />
					<div className='info'>
						<h1>{ course.title }</h1>
						<div>
							<h3>{ getInfo() }</h3>
							<div className='course-rating'>
								<Rate className='rating' disabled defaultValue={ course.rating } />
								<p className='reviews'>({ course.numberOfReviews } reviews)</p>
							</div>
						</div>
						<p>{ course.description }</p>
						{ renderPurchaseButton() }
					</div>
				</div>
			</div>
	)
}

export default DetailsHeader