import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27"
})

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
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
			"clientSecret": paymentIntent.client_secret
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ success: false, message: "Internal server error" })
	}
}