import stripe from 'stripe';

export default stripe(process.env.STRIPE_API_SECRET_KEY);
