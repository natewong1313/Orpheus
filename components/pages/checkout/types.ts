import type React from "react"

export type ShippingMethod = {
    title: string
    estimatedDelivery: string
    price: number
}

export type CheckoutState = {
    shippingAddressCompleted: boolean
    shippingMethodCompleted: boolean
    paymentInfoCompleted: boolean
    setShippingAddressCompleted: React.Dispatch<React.SetStateAction<boolean>>
    setShippingMethodCompleted: React.Dispatch<React.SetStateAction<boolean>>
    setPaymentInfoCompleted: React.Dispatch<React.SetStateAction<boolean>>
}
