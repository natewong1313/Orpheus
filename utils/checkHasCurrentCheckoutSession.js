import { getCookie } from "cookies-next"
// import Stripe from "stripe"
//
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// 	apiVersion: "2020-08-27"
// })

export default async function checkHasCurrentCheckoutSession(req, res) {
	const clientCheckoutSession = getCookie("clientCheckoutSession", { req, res })
	if (clientCheckoutSession === undefined || clientCheckoutSession === null) {
		return false
	}
	const paymentIntent = await stripe.paymentIntents.retrieve(clientCheckoutSession.toString())
	console.log(paymentIntent)
	return true
}