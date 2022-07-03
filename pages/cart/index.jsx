import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ImArrowRight2 } from "react-icons/im"
import { CgClose } from "react-icons/cg"
import Navbar from "@/components/global/Navbar"

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
					{cartItems.length > 0 ?
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left pt-6 px-6">
							<CartItemsList cartItems={cartItems}/>
							<OrderSummary/>
						</div> :
						<EmptyCart/>
					}
				</div>
			</div>
		</div>
	)
}

const CartItemsList = ({ cartItems }) => {
	return (
		<div className="md:col-span-2 flex flex-col space-y-6 order-2 md:order-1">
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
	)
}

const CartItem = ({ cartItem }) => {
	return (
		<div className="flex flex-row space-x-4 w-full md:pr-8">
			{/* Product image */}
			<div className="relative h-32 w-32 rounded-md overflow-hidden">
				<Image
					src={cartItem.displayImage}
					layout="fill"
					loading="eager"
					priority={true}
					draggable={false}
				/>
			</div>
			<div className="flex flex-col space-y-1 py-3 w-full">
				<div className="flex justify-between w-full space-x-2">
					<h1 className="font-medium">{cartItem.title}</h1>
					<h1 className="font-bold flex flex-row items-center">
						{/*<span className="font-medium">Total: </span>*/}
						$14.99
						{/*<span className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"><RiCloseCircleFill*/}
						{/*	size={20}/></span>*/}
					</h1>
				</div>
				{/*<div>*/}
				{/*	<p*/}
				{/*		className="text-sm text-gray-500 font-medium">*/}
				{/*		{cartItem.variantDetails.color}<span className="text-gray-300"> / </span>*/}
				{/*		{cartItem.variantDetails.size}</p>*/}
				{/*</div>*/}
				<div>
					<p className="text-sm font-medium text-gray-500">
						$14.99
						<span className="text-gray-300"> | </span>
						{cartItem.available ? <span className="text-emerald-500">In Stock</span> :
							<span className="text-red-500">Out of Stock</span>}
					</p>
				</div>
				<div className="pt-3 flex flex-row space-x-2 items-center">
					{/* Size select */}
					<div>
						<select
							className="block pl-3 pr-10 py-2 text-sm font-medium text-gray-500 rounded-lg border-gray-300 focus:outline-none focus:ring-blue-200 focus:border-blue-200"
						>
							{["Small", "Medium", "Large", "XLarge"].map(sz => <option key={sz}>{sz}</option>)}
						</select>
					</div>
					{/* Color select*/}
					{/*<div>*/}
					{/*	<select*/}
					{/*		className="block pl-3 pr-10 py-2 text-sm font-medium text-gray-500 rounded-lg border-gray-300 focus:outline-none focus:ring-blue-200 focus:border-blue-200"*/}
					{/*	>*/}
					{/*		{["Black", "White"].map(clr => <option key={clr}>{clr}</option>)}*/}
					{/*	</select>*/}
					{/*</div>*/}
					{/* Quantity select */}
					<div>
						<select
							className="block pl-3 pr-10 py-2 text-sm font-medium text-gray-500 rounded-lg border-gray-300 focus:outline-none focus:ring-blue-200 focus:border-blue-200"
						>
							{[1, 2, 3, 4, 5].map(sz => <option key={sz}>{sz}</option>)}
						</select>
					</div>
					{/*<button className="text-red-600 hover:text-red-700">*/}
					{/*	<MdDeleteForever size={24}/>*/}
					{/*</button>*/}
					{/*<div className="w-full text-right">*/}
					{/*	<button className="text-red-500 text-sm font-medium hover:text-red-700">Remove*/}
					{/*	</button>*/}
					{/*</div>*/}
				</div>
			</div>
			<div>
				<button className="text-gray-400 p-1 rounded-full hover:bg-slate-100">
					<CgClose size={20}/>
				</button>
			</div>
		</div>
	)
}

const OrderSummary = () => {
	return (
		<div className="border border-gray-200 rounded-lg p-4 flex-row space-y-3 h-min order-1 md:order-2">
			<h1 className="font-bold text-xl">Order Summary</h1>
			<div>
				<h2 className="font-medium text-sm">Promo Code</h2>
				{/* Promo code form */}
				<form className="mt-1 sm:flex sm:items-center">
					<div className="w-full md:max-w-xs">
						<input
							type="email"
							name="email"
							id="email"
							spellCheck={false}
							className="text-sm rounded-md w-full focus:ring-blue-200 focus:border-blue-200 border-gray-300"
							placeholder="Enter code"
						/>
					</div>
					<button
						type="button"
						className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full sm:w-auto sm:ml-3 mt-2 sm:mt-0 hover:bg-gray-800"
					>
						Apply
					</button>
				</form>
			</div>
			<div className="flex justify-between pt-2">
				<h2 className="font-medium text-sm">Subtotal</h2>
				<h1 className="font-medium text-sm">$100.00</h1>
			</div>
			<div className="flex justify-between">
				<h2 className="text-sm text-gray-500">Discount</h2>
				<h1 className="text-sm text-gray-500">(20%) - $20.00</h1>
			</div>
			<div className="flex justify-between">
				<h2 className="font-bold">Total</h2>
				<h1 className="font-bold text-lg">$80.00</h1>
			</div>
			<div>
				<button className="mt-3 bg-sky-500 text-white font-bold rounded-md py-3 px-6 w-full hover:bg-sky-600">
					Checkout
				</button>
			</div>
		</div>
	)
}

const EmptyCart = () => {
	return (
		<>
			<h2 className="font-medium text-gray-500 mt-2 mb-6">Your shopping cart is currently empty</h2>
			<Link href="/">
				<a
					className="flex items-center bg-black text-white font-semibold w-max py-3 px-6 rounded-md hover:bg-gray-800">
					Continue Shopping
					<ImArrowRight2 className="ml-2"/>
				</a>
			</Link>
		</>
	)
}

export default CartPage
