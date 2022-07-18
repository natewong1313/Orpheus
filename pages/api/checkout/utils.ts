import type Stripe from "stripe"
import type { ClientCheckoutSession, CheckoutSessionResponse, ClientCheckoutSessionCookie } from "@/pages/api/checkout/types"
import type { NextApiRequest, NextApiResponse } from "next"
import { getCookie } from "cookies-next"

export async function checkHasCurrentCheckoutSession(stripe: Stripe, req: NextApiRequest, res: NextApiResponse<CheckoutSessionResponse>): Promise<null | ClientCheckoutSession> {
	const cookie = getCookie("clientCheckoutSession", { req, res })
	if (cookie === undefined || cookie === null || typeof cookie !== "string") {
		return null
	}
	try {
		const { clientSecret }: ClientCheckoutSessionCookie = JSON.parse(cookie)
		if (clientSecret !== undefined && clientSecret !== null) {
			const paymentIntentId = clientSecret.split("_secret_")[0]
			try {
				const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
				// If checkout session has already been completed
				if (paymentIntent.status === "succeeded") {
					return null
				}
				return formatClientCheckoutSession(paymentIntent)
			} catch (err) {
			}
		}
	} catch (err) {
	}
	return null
}

export function formatClientCheckoutSession(paymentIntent: Stripe.Response<Stripe.PaymentIntent>): ClientCheckoutSession {
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