import React from 'react'
import withTitle from '../../helpers/withTitle'
import '../../styles/Home/Home.css'
import Jumbotron from './Jumbotron'

const Home = () => {
	return (
			<>
				<Jumbotron />
			</>
	)
}

export default withTitle(Home, 'Home')