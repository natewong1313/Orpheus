import React from "react"
import Navbar from "@/components/pages/checkout/Navbar"
import OrderSummary from "@/components/pages/checkout/OrderSummary"
import ShippingDetails from "@/components/pages/checkout/ShippingDetails"

const CheckoutPage = () => {
	return (
		<div>
			<Navbar/>
			<div className="max-w-4xl 2xl:max-w-7xl mx-auto py-0 md:py-8">
				<div className="text-center flex flex-col items-center">
					<div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 w-full text-left pt-6 px-6">
						<div className="md:col-span-3 flex flex-col space-y-6 pt-6 md:pt-0 md:pr-8">
							<ShippingDetails/>
						</div>
						<OrderSummary/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CheckoutPage
