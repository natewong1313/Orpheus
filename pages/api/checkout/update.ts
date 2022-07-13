import type { NextApiRequest, NextApiResponse } from "next"
import loadStripePrivate from "@/lib/stripe/loadStripePrivate"
import { checkHasCurrentCheckoutSession, formatClientCheckoutSession } from "@/pages/api/checkout/utils"
import type { CheckoutSessionResponse, ClientCheckoutSession, ShippingAddress } from "@/pages/api/checkout/types"

const stripe = loadStripePrivate()

type ClientCheckoutSessionUpdate = {
	emailAddress?: string
	name?: string
	shippingAddress?: ShippingAddress
	shippingMethod?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckoutSessionResponse>) {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}
	const clientCheckoutSession: ClientCheckoutSession = await checkHasCurrentCheckoutSession(stripe, req, res)
	if (clientCheckoutSession === null) {
		return res.status(400).json({ success: false, message: "No active checkout session" })
	}

	const { emailAddress, name, shippingAddress, shippingMethod }: ClientCheckoutSessionUpdate = req.body

	try {
		const paymentIntent = await stripe.paymentIntents.update(
			clientCheckoutSession!.paymentIntentId,
			{
				receipt_email: emailAddress,
				shipping: {
					name,
					address: {
						country: shippingAddress?.countryName,
						line1: shippingAddress?.address1,
						line2: shippingAddress?.address2,
						city: shippingAddress?.city,
						postal_code: shippingAddress?.zipCode,
						state: shippingAddress?.state
					}
				},
				metadata: {
					shippingMethod
				}
			}
		)
		return res.status(200).json({
			success: true,
			clientCheckoutSession: formatClientCheckoutSession(paymentIntent)
		})
	} catch (err) {
		return res.status(500).json({ success: false, message: err.toString() })
	}
}