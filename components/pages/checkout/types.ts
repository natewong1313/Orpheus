import React from "react"

export type ShippingMethod = {
	title: string
	estimatedDelivery: string
	price: number
}
export type CheckoutSession = {
	currentStep: number
	previousStep: number
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>
	setPreviousStep: React.Dispatch<React.SetStateAction<number>>
}