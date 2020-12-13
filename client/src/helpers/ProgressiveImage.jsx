import React from 'react'
import ReactProgressiveImage from 'react-progressive-image'

const ProgressiveImage = ({ className, src, placeholder }) => (
		<div style={ { overflow: 'hidden' } }>
			<ReactProgressiveImage src={ src } placeholder={ placeholder }>
				{ (src, loading) => (
						<div className={ className }
								 style={ {
									 backgroundImage: `url(${ src })`,
									 filter: loading ? 'blur(10px)' : 'none',
									 transition: 'all .8s ease-out',
									 backgroundSize: 'cover',
									 backgroundPosition: 'center'
								 } } />
				) }
			</ReactProgressiveImage>
		</div>
)

export default ProgressiveImage