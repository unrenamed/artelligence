import {
		createContainer,
		asClass,
		asValue
} from 'awilix';

import StripeClient from './helpers/stripe.client';

import PaymentController from './controllers/payment.controller';
import PaymentService from './services/payment.service';
import PaymentValidator from './validators/payment.validator';

const container = createContainer();

// Register controllers
container.register({
		paymentController: asClass(PaymentController)
});

// Register services
container.register({
		paymentService: asClass(PaymentService)
});

// Register validators
container.register({
		paymentValidator: asClass(PaymentValidator)
});

// Register helper functions/values
container.register({
		timeout: asValue(1000),
		stripeClient: asValue(StripeClient)
});

export default container;