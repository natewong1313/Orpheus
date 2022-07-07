import React from "react"
import Link from "next/link"
import { HiArrowLeft } from "react-icons/hi"
import Image from "next/image"
import StripeBadge from "@/public/photos/stripe-badge.svg"

const Navbar = () => {
	return (
		<div className="px-6 py-4 flex items-center border-b border-b-gray-200 justify-between bg-white">
			{/* Return button */}
			<Link href="/cart">
				<a className="text-sm text-gray-500 hover:text-black font-medium flex items-center">
					<HiArrowLeft className="mr-2"/>
					<span className="hidden md:block">Back to shopping cart</span>
					<span className="block md:hidden">Back</span>
				</a>
			</Link>
			<div>
				<h1 className="font-bold text-xl">Checkout</h1>
			</div>
			<div className="text-right items-center flex">
				{/* Stripe badge element */}
				<a href="https://stripe.com/" target="_blank" className="flex items-center">
					<Image src={StripeBadge} width={152} height={42} loading="eager" priority={true} draggable={false}/>
				</a>
			</div>
		</div>
	)
}

export default Navbar
