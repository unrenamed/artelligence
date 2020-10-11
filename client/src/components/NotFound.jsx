import { Button, Result } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
	const history = useHistory()

	const goToHome = () => {
		history.push('/')
	}

	return (
			<Result
					status="404"
					title="404"
					subTitle="Sorry, the page you visited does not exist."
					extra={
						<Button type="primary" onClick={ goToHome }>
							Back to home
						</Button> }
			/>
	)
}

export default NotFound