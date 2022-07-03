import React from "react"
import Link from "next/link"
import { HiArrowLeft } from "react-icons/hi"
import Image from "next/image"
import OrpheusLogo from "@/public/photos/orpheus.png"

const Navbar = () => {
	return (
		<div className="px-6 py-4 flex items-center border-b border-b-gray-200 justify-between">
			{/* Return button */}
			<Link href="/cart">
				<a className="text-sm text-gray-500 hover:text-black font-medium flex flex-1 items-center">
					<HiArrowLeft className="mr-2"/>
					<span className="hidden md:block">Back to shopping cart</span>
					<span className="block md:hidden">Back</span>
				</a>
			</Link>
			<div>
				<h1 className="font-bold text-xl">Checkout</h1>
			</div>
			<div className="flex-1"/>
		</div>
	)
}

export default Navbar
