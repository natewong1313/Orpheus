import React from "react"
import { useRouter } from "next/router"
import Navbar from "@/components/global/Navbar"
import EmptyCart from "@/components/pages/cart/EmptyCart"
import OrderSummary from "@/components/pages/cart/OrderSummary"
import CartItemsList from "@/components/pages/cart/CartItemsList"
import type { CartItemType } from "@/components/pages/cart/types"
import type { CreateCheckoutResponse } from "@/pages/api/checkout/types"

const CartPage = () => {
	const router = useRouter()
	const cartItems: CartItemType[] = [
		{
			id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
			title: "Mens Cotton Hooded Sweatshirt",
			price: 200.00,
			displayImage: "/photos/products/black-hoodie.png",
			variantDetails: {
				color: "Black",
				size: "S"
			},
			available: true
		}
	]
	const onCheckoutBtnClick = async () => {
		const response = await fetch("/api/checkout/create", {
			method: "POST",
			headers: {
				"accept": "application/json",
				"content-type": "application/json"
			},
			body: JSON.stringify({
				"amount": 200.00 * 100
			})
		})

		const { success, clientCheckoutSession }: CreateCheckoutResponse = await response.json()
		if (success) {
			// router.push("/checkout")
		}
	}
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar/>
			<>{
				cartItems.length > 0 ?
					<div className="text-left grid grid-cols-1 md:flex md:flex-grow">
						<CartItemsList cartItems={cartItems}/>
						<OrderSummary onCheckoutBtnClick={onCheckoutBtnClick}/>
					</div>
					: <div className="text-center flex flex-col items-center py-8">
						<EmptyCart/>
					</div>
			}</>
		</div>
	)
}

export default CartPage
