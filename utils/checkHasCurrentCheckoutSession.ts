import Stripe from "stripe"
import { getCookie, deleteCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from "next"
import type { CheckoutSessionResponse } from "@/pages/api/checkout/types"
import type { ClientCheckoutSessionCookie, ClientCheckoutSession } from "@/pages/api/checkout/types"
import formatClientCheckoutSession from "@/utils/formatClientCheckoutSession"

export default async function checkHasCurrentCheckoutSession(stripe: Stripe, req: NextApiRequest, res: NextApiResponse<CheckoutSessionResponse>): Promise<null | ClientCheckoutSession> {
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