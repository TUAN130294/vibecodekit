import Stripe from 'stripe';
import { env } from '../../../config/env';
import { APIError } from '../../../middleware/errorHandler';

const stripe = env.jwtSecret // just to ensure env import used
  ? new Stripe(process.env.STRIPE_KEY || '', { apiVersion: '2023-10-16' })
  : null;

export const createCheckoutSession = async (priceId: string, userId: string, successUrl: string, cancelUrl: string) => {
  if (!stripe) throw new APIError(500, 'STRIPE_NOT_CONFIGURED', 'Stripe not configured');
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId }
  });
  return session;
};

export const verifyWebhook = (payload: Buffer, sig: string | undefined) => {
  if (!stripe) throw new APIError(500, 'STRIPE_NOT_CONFIGURED', 'Stripe not configured');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new APIError(500, 'STRIPE_WEBHOOK_SECRET_MISSING', 'Missing webhook secret');
  return stripe.webhooks.constructEvent(payload, sig || '', secret);
};

