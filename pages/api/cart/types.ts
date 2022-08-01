import type { Cart as CartType, CartItem as CartItemType, Product } from "@prisma/client"
import type { CheckoutSessionInternal } from "@/pages/api/cart/checkout/types"

export type Response = {
    success: boolean
    message?: string
    cart?: Cart
}

export type Cart = {
    items: CartItem[]
    subtotal: number
}

export type CartItem = {
    productId: string
    quantity: number
}

export type CartInternal = CartType & {
    cartItems: (CartItemInternal & {
        product: Product
    })[]
    checkoutSession: CheckoutSessionInternal
}

//  Legacy
export type CartItemInternal = CartItemType & { product: Product }
