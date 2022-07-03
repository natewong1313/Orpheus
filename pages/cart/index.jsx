import React from "react"
import { useRouter } from "next/router"
import Navbar from "@/components/global/Navbar"
import EmptyCart from "@/components/pages/cart/EmptyCart"
import OrderSummary from "@/components/pages/cart/OrderSummary"
import CartItemsList from "@/components/pages/cart/CartItemsList"

const CartPage = () => {
	const router = useRouter()
	const cartItems = [
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
	const onCheckoutBtnClick = () => {
		router.push("/checkout")
	}
	return (
		<div className="flex flex-col h-screen">
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
