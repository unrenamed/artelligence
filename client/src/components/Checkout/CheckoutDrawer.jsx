import { Modal } from 'antd'
import React, { useState } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import '../../styles/Checkout/Checkout.scss'
import CheckoutForm from './CheckoutForm'

const CheckoutDrawer = ({ course, visible, onClose }) => {
	const [isClosable] = useState(false)

	const renderForm = _ => (
			<StripeProvider apiKey='pk_test_kKuARa71epB6JrYPuDJm7nRL'>
				<Elements locale='en'>
					<CheckoutForm courseId={ course.id } amount={ course.price } onClose={ onClose } />
				</Elements>
			</StripeProvider>
	)

	return (
			<Modal
					className='checkout-drawer'
					visible={ visible }
					onCancel={ onClose }
					closable={ isClosable }
					keyboard={ isClosable }
					maskClosable={ isClosable }
					footer={ null }
					style={ { top: '20%' } }
			>
				{ renderForm() }
			</Modal>
	)
}

export default CheckoutDrawer