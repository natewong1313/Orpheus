export type CheckoutSessionResponse = {
	success: boolean
	clientCheckoutSession?: ClientCheckoutSession
	message?: string
}

export type ClientCheckoutSession = {
	paymentIntentId: string
	clientSecret: string
	name: string
	emailAddress: string | null
	shippingAddress: ShippingAddress | null
}

export type ClientCheckoutSessionCookie = {
	clientSecret: string
}

export type ShippingAddress = {
	address1: string
	address2: string
	city: string
	state: string
	zipCode: string
	countryName: string
}