import Stripe from "stripe"

let stripe: Stripe | null
export default function loadStripePrivate() {
	if (!stripe) {
		stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" })
	}
	return stripe
}