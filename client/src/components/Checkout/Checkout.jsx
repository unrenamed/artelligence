import { CreditCardOutlined, LockOutlined, SecurityScanOutlined } from '@ant-design/icons'
import { Table, Button } from 'antd'
import React, { useState } from 'react'
import { useLocation, Redirect } from 'react-router'
import { skillLevels } from '../../constants/app.constants'
import withTitle from '../../helpers/withTitle'
import '../../styles/Checkout/Checkout.scss'
import CheckoutDrawer from './CheckoutDrawer'

const { Column } = Table

const Checkout = () => {
	const location = useLocation()
	const [formVisible, setFormVisible] = useState(false)

	if (!location.state || !location.state.course) {
		return <Redirect to='/404' />
	}

	const { course } = location.state

	const getPrice = ({ price }) =>
			Number(price) === 0 ? 'Free' : `$${ price }`

	const getInfo = ({ level }) =>
			`Course • ${ skillLevels[level] }`

	const getTableData = _ => [course].map(course => ({
		key: course.id,
		id: course.id,
		price: (
				<div className='item-price-column'>
					{ getPrice(course) }
				</div>
		),
		itemName: (
				<div className='item-info-column'>
					<h1 className='item-name'>{ course.title }</h1>
					<p className='item-info'>{ getInfo(course) }</p>
				</div>
		),
	}))

	const getTableFooter = _ => (
			<div className='table-footer'>
				<p>Total</p>
				<h1>${ course.price }</h1>
			</div>
	)

	return (
			<div className='checkout-wrapper'>
				<h1 className='header'>Complete Your Purchase</h1>

				<div className='table-wrapper'>
					<Table dataSource={ getTableData() || [] }
								 pagination={ false }
								 footer={ getTableFooter }>
						<Column title="Item Name" className='name-column' dataIndex="itemName" key="itemName" />
						<Column title="Price" className='price-column' dataIndex="price" key="price" />
					</Table>
				</div>

				<Button className='purchase-button' type="primary" onClick={ () => setFormVisible(true) }>
					<CreditCardOutlined /> PLACE YOUR ORDER
				</Button>

				<CheckoutDrawer
						course={ course }
						visible={ formVisible }
						onClose={ () => setFormVisible(false) } />

				<div className='security-wrapper'>
					<LockOutlined className='security-icon' />
					<h1 className='security-header'>Your Information is Safe</h1>
					<p className='security-text'>We will not sell or rent your personal contact
																			 information for any marketing purposes whatsoever.
					</p>
				</div>

				<div className='security-wrapper'>
					<SecurityScanOutlined className='security-icon' />
					<h1 className='security-header'>Secure Checkout</h1>
					<p className='security-text'>All information is encrypted and transmitted without
																			 risk using a <b>Transport Layer Security</b> protocol. You can trust us!
					</p>
				</div>
			</div>
	)
}

export default withTitle(Checkout, 'Checkout')