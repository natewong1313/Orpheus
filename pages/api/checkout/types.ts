export type CheckoutSessionResponse = {
	success: boolean
	clientCheckoutSession?: ClientCheckoutSession
	message?: string
}

export type ClientCheckoutSession = {
	clientSecret: string
}

export type ClientCheckoutSessionCookie = {
	clientSecret: string
}