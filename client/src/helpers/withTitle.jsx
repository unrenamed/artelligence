import React from 'react'
import Helmet from 'react-helmet'

const withTitle = (Component, title) => (props) => {
	const DEFAULT_TITLE = 'Artelligence'

	const getTitle = () => title ?
			title + ' | ' + DEFAULT_TITLE : DEFAULT_TITLE

	return (
			<>
				<Helmet>
					<title>{ `${ getTitle() }` }</title>
				</Helmet>
				<Component { ...props } />
			</>
	)
}

export default withTitle