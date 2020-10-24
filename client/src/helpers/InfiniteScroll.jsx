import React from 'react'
import InfiniteScrollComponent from 'react-infinite-scroll-component'
import '../styles/InfiniteScroll.css'

const InfiniteScroll = ({
	data = [],
	dataName,
	count,
	loadMore,
	loader = <h1>Loading...</h1>,
	childComponent: ChildComponent
}) => {

	const renderData = () =>
			data.map(obj => <ChildComponent key={ obj.id } { ...{ [dataName]: obj } } />)

	return (
			<div className='infinite-scroll-wrapper'>
				<InfiniteScrollComponent
						dataLength={ data.length }
						next={ loadMore }
						hasMore={ data.length < count }
						loader={ loader }
				>
					{ renderData() }
				</InfiniteScrollComponent>
			</div>
	)
}

export default InfiniteScroll