import type { Cart as CartType, CartItem as CartItemType, CheckoutSession, Product } from "@prisma/client"

export type Response = {
	success: boolean
	message?: string
	cart?: CartItemApiType[]
}

export type CartItemApiType = {
	productId: string
	quantity: number
}

export type Cart = 
	CartType & {
		cartItems: (CartItem & {
			product: Product
		})[],
		checkoutSession: CheckoutSession
	}

//  Legacy
export type CartItem = CartItemType & {product: Product}