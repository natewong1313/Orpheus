import Stripe from "stripe"
import { getCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from "next"
import type { CheckoutSessionResponse } from "@/pages/api/checkout/types"
import { ClientCheckoutSessionCookie, ClientCheckoutSession } from "@/pages/api/checkout/types"

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
				await stripe.paymentIntents.retrieve(paymentIntentId)
				return { clientSecret }
			} catch (err) {
			}
		}
	} catch (err) {
	}
	return null
}