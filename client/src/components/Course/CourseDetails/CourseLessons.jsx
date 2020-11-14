import { LockOutlined } from '@ant-design/icons'
import { List, Card } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { lessonStatus } from '../../../constants/app.constants'

const { Item } = List

const CourseLessons = ({ lessons = [] }) => {
	const currentUser = useSelector(state => state.auth.currentUser)

	const isFirst = lesson => lesson.number === 1

	const renderLesson = lesson => {
		const { status, title, id } = lesson
		const isClosed = !isFirst(lesson) && !!status && status === lessonStatus.NOT_STARTED

		return (
				<Item className='lesson-item'>
					<Card className='lesson-card'
								hoverable={ currentUser && !isClosed }>
						<img className='lesson-logo'
								 src='https://i.ytimg.com/vi/TLlVhDv1TAA/maxresdefault.jpg'
								 alt={ `image-${ id }-log` } />
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
				<List
						dataSource={ lessons }
						renderItem={ renderLesson }
				/>
			</div>
	)
}

export default CourseLessons