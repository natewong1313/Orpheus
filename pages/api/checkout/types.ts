export type CreateCheckoutResponse = {
	success: boolean
	clientCheckoutSession?: ClientCheckoutSession
	message?: string
}

export type ClientCheckoutSession = {
	clientSecret: string
}