import { Button, Form } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe } from 'react-stripe-elements'
import { post } from 'request'

const CheckoutForm = ({ stripe }) => {
	const [receiptUrl] = useState('')

	const handleSubmit = async () => {
		const { error, token } = await stripe.createToken()

		if (error) {
			console.log(error.message)
			return
		}

		const order = await post('http://localhost:8080/api/courses/1/purchase', {
			amount: '0.00'.replace('.', ''),
			source: token.id,
			receipt_email: 'john@example.com'
		})

		console.log(order)
	}

	if (receiptUrl) {
		return (
				<div className="success">
					<h2>Payment Successful!</h2>
					<a href={ receiptUrl }>View Receipt</a>
					<Link to="/">Home</Link>
				</div>
		)
	}

	return (
			<div className="checkout-form">
				<p>Amount: $0.00</p>
				<Form onFinish={ handleSubmit }>
					<Form.Item label='Card details'>
						<CardNumberElement />
					</Form.Item>

					<Form.Item label='Expiration date'>
						<CardExpiryElement />
					</Form.Item>

					<Form.Item label='CVC'>
						<CardCVCElement />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Pay
						</Button>
					</Form.Item>
				</Form>
			</div>
	)
}

export default injectStripe(CheckoutForm)