import { Cart as CartType, CartItem as CartItemType, Product } from "@prisma/client"

export type Response = {
	success: boolean
	message?: string
	cart?: Cart
}

export type Cart = CartType & {cartItems: (CartItem & {product: Product})[]}

export type CartItem = CartItemType & {product: Product}