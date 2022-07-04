import Stripe from "stripe"
import { getCookie } from "cookies-next"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27"
})

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}

	// const currentCheckoutSession = await checkHasCurrentCheckoutSession(req, res)
	// if (currentCheckoutSession !== null) {
	// 	return res.status(200).json({
	// 		success: true,
	// 		"clientCheckoutSessionn": currentCheckoutSession
	// 	})
	// }

	const { amount } = req.body

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			automatic_payment_methods: { enabled: true }
		})
		return res.status(200).json({
			success: true,
			"clientCheckoutSession": paymentIntent.client_secret
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ success: false, message: "Internal server error" })
	}
}

// async function checkHasCurrentCheckoutSession(req, res) {
// 	const clientCheckoutSession = getCookie("clientCheckoutSession", { req, res })
// 	if (clientCheckoutSession === undefined || clientCheckoutSession === null) {
// 		return null
// 	}
// 	try {
// 		return await stripe.paymentIntents.retrieve(clientCheckoutSession.toString())
// 	} catch (err) {
// 		console.log(err)
// 		return null
// 	}
// 	// const paymentIntent =
// 	// console.log(paymentIntent)
// 	// return paymentIntent
// }