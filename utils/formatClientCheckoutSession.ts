import Stripe from "stripe"
import type { ClientCheckoutSession } from "@/pages/api/checkout/types"

export default function (paymentIntent: Stripe.Response<Stripe.PaymentIntent>): ClientCheckoutSession {
	return {
		clientSecret: paymentIntent.client_secret,
		paymentIntentId: paymentIntent.id,
		name: paymentIntent.shipping?.name || null,
		emailAddress: paymentIntent.receipt_email || null,
		shippingAddress: {
			address1: paymentIntent.shipping?.address?.line1 || null,
			address2: paymentIntent.shipping?.address?.line2 || null,
			city: paymentIntent.shipping?.address?.city || null,
			state: paymentIntent.shipping?.address?.state || null,
			zipCode: paymentIntent.shipping?.address?.postal_code || null,
			countryName: paymentIntent.shipping?.address?.country || null
		},
		shippingMethod: paymentIntent.metadata.shippingMethod || null
	}
}