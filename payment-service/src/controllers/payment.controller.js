class PaymentController {

		constructor({ paymentService }) {
				this.paymentService = paymentService;

				this.charge = this.charge.bind(this);
		}

		async charge(req, res) {
				const { amount, source, receipt_email } = req.body;

				const chargeData = {
						amount,
						source,
						receipt_email
				};

				const result = await this.paymentService.charge(chargeData);

				res.status(200).json({
						message: 'Charge was posted successfully',
						data: result
				});
		}
}

export default PaymentController;