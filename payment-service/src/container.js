import {
		createContainer,
		asClass,
		asValue
} from 'awilix';

import PaymentController from './controllers/payment.controller';
import StripeClient from './helpers/stripe.client';
import PaymentService from './services/payment.service';

const container = createContainer();

// Register controllers
container.register({
		paymentController: asClass(PaymentController)
});

// Register services
container.register({
		paymentService: asClass(PaymentService)
});

// Register helper functions/values
container.register({
		timeout: asValue(1000),
		stripeClient: asValue(StripeClient)
});

export default container;