import Stripe from "stripe"
import type { ClientCheckoutSession } from "@/pages/api/checkout/types"

export default function (paymentIntent: Stripe.Response<Stripe.PaymentIntent>): ClientCheckoutSession {
	return {
		clientSecret: paymentIntent.client_secret,
		paymentIntentId: paymentIntent.id,
		name: paymentIntent.shipping?.name,
		emailAddress: paymentIntent.receipt_email,
		shippingAddress: {
			address1: paymentIntent.shipping?.address?.line1,
			address2: paymentIntent.shipping?.address?.line2,
			city: paymentIntent.shipping?.address?.city,
			state: paymentIntent.shipping?.address?.state,
			zipCode: paymentIntent.shipping?.address?.postal_code,
			countryName: paymentIntent.shipping?.address?.country
		},
		shippingMethod: paymentIntent.metadata.shippingMethod
	}
}