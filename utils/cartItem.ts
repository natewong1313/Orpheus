import { CartItem } from "@/pages/api/cart/types"

export function calcCartItemCount(cartItems: CartItem[] | null) {
	let cartItemCount = 0
	if (cartItems) {
		for (const cartItem of cartItems) {
			cartItemCount += cartItem.quantity
		}
	}
	return cartItemCount
}

export function calcCartItemsTotalPrice(cartItems: CartItem[] | null) {
	let subtotal = 0
	if (cartItems) {
		for (const cartItem of cartItems) {
			subtotal += cartItem.product.price * cartItem.quantity
		}
	}
	return subtotal
}