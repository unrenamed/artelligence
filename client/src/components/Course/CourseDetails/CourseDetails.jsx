import React from 'react'
import withTitle from '../../../helpers/withTitle'

const CourseDetails = ({ match }) => {
	const { id: courseId } = match.params

	return (
			<div>
				{ courseId }
			</div>
	)
}

export default withTitle(CourseDetails, '')