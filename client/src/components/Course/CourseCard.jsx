import { Card } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { skillLevels } from '../../constants/app.constants'
import '../../styles/Course/CourseCard.css'

const { Meta } = Card

const CourseCard = ({ course = {}, loading = false }) => {
	const history = useHistory()

	const getPrice = () => Number(course.price) === 0 ? 'Free' : `$ ${ course.price }`
	const getDescription = () => `Course • ${ skillLevels[course.level] } • ${ getPrice() }`
	const redirectToCourseDetails = () => history.push(`/courses/${ course.id }`)

	if (loading) {
		return <LoadingCard />
	}

	return (
			<Card hoverable
						className="course-card"
						cover={ <img alt="example"
												 src="https://leverageedu.com/blog/wp-content/uploads/2019/08/Course-after-MBA.png" /> }
						onClick={ redirectToCourseDetails }
			>
				<Meta className='course-card-title'
							title={ course.title }
							description={ getDescription() } />

				<p className='course-card-publisher'>Artelligence academy</p>
			</Card>
	)
}

const LoadingCard = () =>
		<Card loading={ true }
					className="course-card"
					cover={ <img alt="example"
											 src="https://www.unhcr.org/hk/wp-content/uploads/sites/13/2018/07/Grey-background.jpg" />
					} />

export default CourseCard