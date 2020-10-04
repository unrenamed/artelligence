class PaymentService {

		constructor({ stripeClient }) {
				this.stripeClient = stripeClient;
		}

		async charge({ amount, source, receipt_email }) {
				const chargeData = {
						amount,
						currency: 'usd',
						source,
						receipt_email
				};

				return await this.stripeClient.charges.create(chargeData);
		}
}

export default PaymentService;