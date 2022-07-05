import { Stripe, loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>
export default function loadStripePublic() {
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
	}
	return stripePromise
}