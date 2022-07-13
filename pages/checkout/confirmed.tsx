import React from "react"
import Navbar from "@/components/global/Navbar"
import Footer from "@/components/global/Footer"
import { BsCheckCircle } from "react-icons/bs"
import ItemsList from "@/components/pages/confirmed/ItemsList"
import OrderSummary from "@/components/pages/confirmed/OrderSummary"

const ConfirmedPage = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Navbar/>
			<div className="py-8 mx-auto flex flex-col">
				<div className="text-center flex flex-col space-y-2 items-center border-b border-slate-200 pb-4 px-4">
					<div className="h-10 mb-1">
						<div className="bg-green-100 w-10 h-10 rounded-full"></div>
						<BsCheckCircle className="absolute -mt-10 z-10 text-green-500" size={42}/>
					</div>
					<h1 className="font-semibold text-2xl">Order Confirmed</h1>
					<h2 className="font-medium text-md text-slate-500">We&apos;ll email you with updates once your order is
						processed</h2>
				</div>
				<ItemsList/>
				<OrderSummary/>
			</div>
			<Footer/>
		</div>
	)
}

export default ConfirmedPage