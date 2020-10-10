class PaymentService {

		constructor({ stripeClient, paymentValidator }) {
				this.stripeClient = stripeClient;
				this.paymentValidator = paymentValidator;
		}

		async charge(chargeData) {
				this.paymentValidator.validateCharge(chargeData);

				return await this.stripeClient.charges.create({
						...chargeData,
						currency: 'usd'
				});
		}
}

export default PaymentService;