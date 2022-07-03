import React from "react"
import Navbar from "@/components/global/Navbar"
import EmptyCart from "@/components/pages/cart/EmptyCart"
import OrderSummary from "@/components/pages/cart/OrderSummary"
import CartItem from "@/components/pages/cart/CartItem"

const CartPage = () => {
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
	return (
		<div>
			<Navbar/>
			<div className="max-w-6xl 2xl:max-w-7xl mx-auto py-8">
				<div className="text-center flex flex-col items-center">
					<h1 className="font-bold text-3xl">Shopping Cart</h1>
					{/* Display empty cart notice otherwise show cart items */}
					{cartItems.length > 0 ?
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left pt-6 px-6">
							{/* Cart items */}
							<div className="md:col-span-2 flex flex-col space-y-6 order-2 md:order-1 pt-6 md:pt-0">
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
								<CartItem cartItem={cartItems[0]}/>
							</div>
							<OrderSummary/>
						</div> :
						<EmptyCart/>
					}
				</div>
			</div>
		</div>
	)
}

export default CartPage
