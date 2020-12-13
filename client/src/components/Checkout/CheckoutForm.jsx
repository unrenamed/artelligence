import { Button, Form, Result, message } from 'antd'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe } from 'react-stripe-elements'
import CourseService from '../../services/course.service'
import '../../styles/Checkout/CheckoutForm.scss'

const Success = ({ receiptUrl, courseId }) => (
		<Result
				className='checkout-result'
				status='success'
				title='Successfully Purchased Course!'
				subTitle='An order receipt is available via the link below. You will also receive an order receipt via your email. Thank you and have fun!'
				extra={ [
					<Button type='link' key='receipt-link' href={ receiptUrl } target='_blank' rel='noopener noreferrer'>
						View Receipt
					</Button>,
					<Button type='link' key='course-page-link' href={ `/courses/${ courseId }` }>
						Back To Course
					</Button>
				] }
		/>
)

const CARD_INPUT_STYLES = {
	base: {
		color: '#919191'
	}
}

const CheckoutForm = ({ stripe, courseId, amount, onClose }) => {
	const { currentUser } = useSelector(state => state.auth)

	const [receiptUrl, setReceiptUrl] = useState('')
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)

	const handleSubmit = async () => {
		setLoading(true)

		const { error, token } = await stripe.createToken()

		if (error) {
			setErrorMessage(error.message)
			setLoading(false)
			return
		}

		if (!currentUser || !currentUser.email) {
			setErrorMessage('User email is not defined')
			setLoading(false)
			return
		}

		setErrorMessage(null)

		try {
			const { paymentResult } = await CourseService.purchase(courseId, {
				amount: amount.replace('.', ''),
				source: token.id,
				receipt_email: currentUser.email
			})
			setReceiptUrl(paymentResult.data.receipt_url)
		} catch (error) {
			message.error(error)
		} finally {
			setLoading(false)
		}
	}

	if (!!receiptUrl) {
		return <Success receiptUrl={ receiptUrl } courseId={ courseId } />
	}

	return (
			<div className='checkout-form'>
				<h1 className='checkout-header'>
					Payment details
				</h1>

				<Form onFinish={ handleSubmit } layout='vertical'>
					<Form.Item label='Credit card'>
						<CardNumberElement showIcon style={ CARD_INPUT_STYLES } />
					</Form.Item>

					<div className='date-cvc-wrapper'>
						<Form.Item label='Security code'>
							<CardCVCElement style={ CARD_INPUT_STYLES } />
						</Form.Item>

						<Form.Item label='Expiration'>
							<CardExpiryElement style={ CARD_INPUT_STYLES } />
						</Form.Item>
					</div>

					{
						!isEmpty(errorMessage) && <p className='form-error-message'>{ errorMessage }</p>
					}

					<Form.Item className='submit-form-item'>
						<Button className='purchase-button' htmlType='submit' loading={ loading }>
							Purchase
						</Button>
						<Button className='cancel-button' onClick={ onClose } disabled={ loading }>
							Back
						</Button>
					</Form.Item>
				</Form>
			</div>
	)
}

export default injectStripe(CheckoutForm)