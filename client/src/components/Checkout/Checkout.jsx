import React, { useEffect } from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import withTitle from '../../helpers/withTitle'
import CheckoutForm from './CheckoutForm'

const Checkout = () => {

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
			<StripeProvider apiKey='pk_test_kKuARa71epB6JrYPuDJm7nRL'>
				<Elements>
					<CheckoutForm />
				</Elements>
			</StripeProvider>
	)
}

export default withTitle(Checkout, 'Checkout')