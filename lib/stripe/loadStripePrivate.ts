import Stripe from "stripe"

export default function loadStripePrivate(): Stripe {
    if (!global.stripe) {
        global.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" })
    }
    return global.stripe
}
