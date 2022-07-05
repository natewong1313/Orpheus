import type { NextApiRequest, NextApiResponse } from "next"
import type { CreateCheckoutResponse } from "@/pages/api/checkout/types"
import checkHasCurrentCheckoutSession from "@/utils/checkHasCurrentCheckoutSession"
import loadStripePrivate from "@/utils/stripe/loadStripePrivate"

const stripe = loadStripePrivate()

export default async function handler(req: NextApiRequest, res: NextApiResponse<CreateCheckoutResponse>) {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}
	const currentCheckoutSession = await checkHasCurrentCheckoutSession(stripe, req, res)
	if (currentCheckoutSession !== null) {
		return res.status(200).json({
			success: true,
			clientCheckoutSession: currentCheckoutSession
		})
	}

	const { amount } = req.body
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			automatic_payment_methods: { enabled: true }
		})
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

