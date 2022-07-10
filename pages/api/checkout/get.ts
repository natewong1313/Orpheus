import { NextApiRequest, NextApiResponse } from "next"
import type { CheckoutSessionResponse, ClientCheckoutSession } from "@/pages/api/checkout/types"
import checkHasCurrentCheckoutSession from "@/utils/checkHasCurrentCheckoutSession"
import loadStripePrivate from "@/lib/stripe/loadStripePrivate"

const stripe = loadStripePrivate()

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckoutSessionResponse>) {
	if (req.method !== "GET") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}
	const clientCheckoutSession: ClientCheckoutSession = await checkHasCurrentCheckoutSession(stripe, req, res)
	if (clientCheckoutSession !== null) {
		return res.status(200).json({
			success: true,
			clientCheckoutSession
		})
	}

	return res.status(400).json({ success: false, message: "Checkout session invalid" })
}