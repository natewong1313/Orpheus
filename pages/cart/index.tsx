import React from "react"
import { useRouter } from "next/router"
import Navbar from "@/components/global/Navbar"
import Footer from "@/components/global/Footer"
import EmptyCart from "@/components/pages/cart/EmptyCart"
import OrderSummary from "@/components/pages/cart/OrderSummary"
import CartItemsList from "@/components/pages/cart/CartItemsList"
import { getCart, getCartId } from "@/pages/api/cart/utils"
import type { CheckoutSessionResponse } from "@/pages/api/checkout/types"
import type { Cart } from "@/pages/api/cart/types"

type Props = {
	cart: Cart
}
const CartPage = ({ cart }: Props) => {
	const router = useRouter()

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

		const { success }: CheckoutSessionResponse = await response.json()
		if (success) {
			router.push("/checkout")
		}
	}
	return (
		<div>
			<div className="flex flex-col min-h-screen">
				<Navbar cart={cart}/>
				<>{
					cart?.cartItems?.length > 0 ?
						<div className="text-left grid grid-cols-1 md:flex md:flex-grow pb-6 sm:pb-0">
							<CartItemsList cartItems={cart.cartItems}/>
							<OrderSummary cartItems={cart.cartItems} onCheckoutBtnClick={onCheckoutBtnClick}/>
						</div>
						: <div className="text-center flex flex-col items-center py-10">
							<EmptyCart/>
						</div>
				}</>
			</div>
			<Footer/>
		</div>
	)
}

export async function getServerSideProps({ req, res }) {
	const cartId = await getCartId(req, res)
	const cart = await getCart(cartId)

	return { props: { cart: JSON.parse(JSON.stringify(cart)) } }
}

export default CartPage
