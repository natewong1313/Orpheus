import type { CartItemInternal } from "@/pages/api/cart/types"

export function calcCartItemCount(cartItems: CartItemInternal[] | null) {
    let cartItemCount = 0
    if (cartItems) {
        for (const cartItem of cartItems) {
            cartItemCount += cartItem.quantity
        }
    }
    return cartItemCount
}

export function calcCartItemsTotalPrice(cartItems: CartItemInternal[] | null) {
    let subtotal = 0
    if (cartItems) {
        for (const cartItem of cartItems) {
            subtotal += cartItem.product.price * cartItem.quantity
        }
    }
    return subtotal
}
