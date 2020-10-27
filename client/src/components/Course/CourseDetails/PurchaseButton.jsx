import React from 'react'
import '../../../styles/Course/CourseDetails/PurchaseButton.scss'

const PurchaseButton = ({ course, onClick }) => ((
		<div className="course-purchase-btn">
			<span className="mas">${ course.price }</span>
			<button onClick={ onClick }>BUY THIS COURSE</button>
		</div>
))

export default PurchaseButton