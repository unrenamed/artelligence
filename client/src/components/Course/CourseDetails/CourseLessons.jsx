import { LockOutlined } from '@ant-design/icons'
import { Card, Timeline } from 'antd'
import { some } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { lessonStatus } from '../../../constants/app.constants'

const { Item } = Timeline

const CourseLessons = ({ lessons = [] }) => {
	const currentUser = useSelector(state => state.auth.currentUser)

	const isFirst = lesson =>
			lesson.number === 1

	const isCourseStarted = _ =>
			some(lessons, { status: lessonStatus.COMPLETED })

	const renderLesson = lesson => {
		const { status, title } = lesson
		const isClosed = !isFirst(lesson) && !!status && status === lessonStatus.NOT_STARTED

		const getStatusColor = _ => {
			const noUser = !currentUser
			const isNew = !isCourseStarted() && isFirst(lesson)
			if (noUser || isNew)
				return '#d1a700'

			switch (status) {
				case lessonStatus.COMPLETED:
					return '#00bf08'
				case lessonStatus.IN_PROGRESS:
					return '#d1a700'
				case lessonStatus.NOT_STARTED:
					return '#808080'
				default:
					return '#d1a700'
			}
		}

		const getStatusLabel = _ => {
			if (!isCourseStarted() && isFirst(lesson)) return 'Start here'

			if (!currentUser) return null

			switch (status) {
				case lessonStatus.COMPLETED:
					return 'Completed'
				case lessonStatus.IN_PROGRESS:
					return 'Next'
				case lessonStatus.NOT_STARTED:
					return 'Closed'
				default:
					return null
			}
		}

		return (
				<Item className='lesson-item' key={ lesson.id }
							color={ getStatusColor() } label={ getStatusLabel() }>
					<Card className={ `lesson-card ${ isClosed ? 'shake-effect' : '' }` }
								hoverable={ currentUser && !isClosed }>
						<img className='lesson-logo'
								 src='https://i.ytimg.com/vi/TLlVhDv1TAA/maxresdefault.jpg' alt='' />
						<div className='lesson-body'>
							<h1>{ title }</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et magna quis ante venenatis hendrerit
								 condimentum non sem. Aenean in accumsan orci, sed consequat est. In rutrum faucibus lectus eget
								 lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae est porttitor, congue nisl
								 non, aliquet nulla. Aenean molestie tincidunt elementum. Mauris gravida mauris at elit malesuada
								 viverra. Curabitur sed massa ut ipsum ultricies lobortis ac vestibulum elit.
							</p>
						</div>
						{
							isClosed ?
									<div className='lesson-closed-backdrop'>
										<LockOutlined className='lock-icon' />
									</div> : null
						}
					</Card>
				</Item>
		)
	}

	return (
			<div className='course-lessons-wrapper'>
				<Timeline>{ lessons.map(renderLesson) }</Timeline>
			</div>
	)
}

export default CourseLessons