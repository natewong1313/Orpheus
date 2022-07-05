import type { NextApiRequest, NextApiResponse } from "next"
import { setCookie } from "cookies-next"
import checkHasCurrentCheckoutSession from "@/utils/checkHasCurrentCheckoutSession"
import loadStripePrivate from "@/utils/stripe/loadStripePrivate"
import type { CheckoutSessionResponse, ClientCheckoutSession } from "@/pages/api/checkout/types"

const stripe = loadStripePrivate()

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckoutSessionResponse>) {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}
	const clientCheckoutSession: ClientCheckoutSession = await checkHasCurrentCheckoutSession(stripe, req, res)
	if (clientCheckoutSession !== null) {
		return res.status(200).json({
			success: true,
			clientCheckoutSession
		})
	}

	const { amount } = req.body
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			automatic_payment_methods: { enabled: true }
		})
		setCookie("clientCheckoutSession", JSON.stringify({ clientSecret: paymentIntent.client_secret }), { req, res })
		return res.status(200).json({
			success: true,
			clientCheckoutSession: {
				clientSecret: paymentIntent.client_secret
			}
		})
	} catch (err) {
		return res.status(500).json({ success: false, message: err.toString() })
	}
}

