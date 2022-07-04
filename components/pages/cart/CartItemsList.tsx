import React from "react"
import CartItem from "@/components/pages/cart/CartItem"
import type { CartItemType } from "@/components/pages/cart/types"

type Props = {
	cartItems: CartItemType[]
}
const CartItemsList = ({ cartItems }: Props) => {
	return (
		<div
			className="flex-1 md:max-w-6xl md:mx-auto py-4 md:py-10 px-4 sm:px-6 md:px-8 divide-y divide-gray-200 md:col-span-2 order-2 md:order-1">
			<h1 className="font-semibold text-xl pb-4">Shopping Cart</h1>
			<div className="flex flex-col space-y-6 pt-4">
				<CartItem cartItem={cartItems[0]}/>
				<CartItem cartItem={cartItems[0]}/>
			</div>
		</div>
	)
}

export default CartItemsList
