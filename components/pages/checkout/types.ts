import React from "react"
import type { ClientCheckoutSession } from "@/pages/api/checkout/types"

export type ShippingMethod = {
	title: string
	estimatedDelivery: string
	price: number
}
export type CheckoutSession = {
	shippingAddressCompleted: boolean
	shippingMethodCompleted: boolean
	paymentInfoCompleted: boolean
	setShippingAddressCompleted: React.Dispatch<React.SetStateAction<boolean>>
	setShippingMethodCompleted: React.Dispatch<React.SetStateAction<boolean>>
	setPaymentInfoCompleted: React.Dispatch<React.SetStateAction<boolean>>
	client: ClientCheckoutSession
}