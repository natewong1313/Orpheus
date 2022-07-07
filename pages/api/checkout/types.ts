export type CheckoutSessionResponse = {
	success: boolean
	clientCheckoutSession?: ClientCheckoutSession
	message?: string
}

export type ClientCheckoutSessionCookie = {
	clientSecret: string
}

export type ClientCheckoutSession = {
	paymentIntentId: string
	clientSecret: string
	name: string | null
	emailAddress: string | null
	shippingAddress: ShippingAddress | null
	shippingMethod: string | null
}

export type ShippingAddress = {
	address1: string
	address2: string
	city: string
	state: string
	zipCode: string
	countryName: string
}

export type BillingAddress = {
	address1: string
	address2: string
	city: string
	state: string
	zipCode: string
	countryName: string
}