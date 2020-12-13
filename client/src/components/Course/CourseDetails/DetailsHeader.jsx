import { CheckOutlined } from '@ant-design/icons'
import { Rate } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { skillLevels } from '../../../constants/app.constants'
import '../../../styles/Course/CourseDetails/DetailsHeader.scss'
import PurchaseButton from './PurchaseButton'

const DetailsHeader = ({ course }) => {
	const history = useHistory()
	const currentUser = useSelector(state => state.auth.currentUser)

	const getPrice = () =>
			Number(course.price) === 0 ? 'Free' : `$ ${ course.price }`

	const getInfo = () =>
			`Course • ${ skillLevels[course.level] } • ${ getPrice() }`

	const buyCourse = () => !currentUser ?
			history.push('/login') :
			history.push('/checkout', { course })

	const renderPurchaseButton = () =>
			!course.isPurchased && Number(course.price) !== 0
					? <PurchaseButton course={ course } onClick={ buyCourse } />
					: <div className='purchased-block'><CheckOutlined className='icon' /> Purchased</div>

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