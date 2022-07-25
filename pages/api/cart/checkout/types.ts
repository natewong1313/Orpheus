import type { CheckoutSession } from "@prisma/client"

export type Response = {
	success: boolean
	message?: string
	checkout?: Checkout
}

export type Checkout = {
    cart: Cart
    paymentIntentId: string
    clientSecret: string
    shippingMethod: string | null
    shippingAddress: ShippingAddress | null
}

type Cart = {
    subtotal: number
    totalItems: number
}

export type ShippingAddress = {
    firstName: string
    lastName: string
    emailAddress: string

    address1: string
    address2?: string
    city: string
    state: string
    zipCode: string
    countryName: string
}

export type CheckoutSessionInternal = CheckoutSession & {
    shippingAddress: ShippingAddress
}