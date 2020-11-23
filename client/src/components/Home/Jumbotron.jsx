import React from 'react'
import ProgressiveImage from '../../helpers/ProgressiveImage'
import '../../styles/Home/Jumbotron.scss'

const Jumbotron = () => {
	return (
			<div className='jumbotron'>
				<ProgressiveImage className='board'
													src='/images/jumbotron-background.jpg'
													placeholder='/images/jumbotron-background-tiny.jpg' />
				<div className='text'>
					<h1>Build the skills to bring <br /> your vision to life</h1>
					<h3>Develop your skills and your career with resources to learn at your own pace using
							Artelligence.</h3>
				</div>
			</div>
	)
}

export default Jumbotron