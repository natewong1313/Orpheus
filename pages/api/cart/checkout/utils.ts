import type { CartInternal } from "@/pages/api/cart/types"
import { calcCartTotal } from "@/pages/api/cart/utils"
import type { Checkout, CheckoutSessionInternal } from "@/pages/api/cart/checkout/types"
import loadStripePrivate from "@/lib/stripe/loadStripePrivate"

const stripe = loadStripePrivate()

export async function formatCheckoutResponse(cart: CartInternal): Promise<Checkout> {
    const stripeCheckoutSession = await getStripeCheckoutSession(cart.checkoutSession)
    return {
        cart: {
            subtotal: calcCartTotal(cart),
            totalItems: cart.cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0)
        },
        paymentIntentId: cart.checkoutSession.paymentIntentId,
        clientSecret: stripeCheckoutSession.client_secret,
        shippingMethod: cart.checkoutSession.shippingMethod,
        shippingAddress: cart.checkoutSession.shippingAddress
    }
}

export async function getStripeCheckoutSession(checkout: CheckoutSessionInternal) {
    return await stripe.paymentIntents.retrieve(checkout.paymentIntentId)
}
