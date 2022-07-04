import React, { useState } from "react"
import Navbar from "@/components/pages/checkout/Navbar"
import OrderSummary from "@/components/pages/checkout/OrderSummary"
import ShippingDetails from "@/components/pages/checkout/ShippingDetails"
import PaymentDetails from "@/components/pages/checkout/PaymentDetails"
import ShippingMethod from "@/components/pages/checkout/ShippingMethod"

const CheckoutPage = () => {
	const [checkoutStep, setCheckoutStep] = useState(1)
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Navbar/>
			<div className="md:max-w-4xl 2xl:max-w-7xl md:mx-auto py-0 md:py-8">
				<div className="text-center flex flex-col items-center">
					<div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 w-full text-left pt-6 px-6">
						<div className="md:col-span-3 flex flex-col space-y-6 py-6 md:py-0 md:pr-8">
							<ShippingDetails checkoutStep={checkoutStep} setCheckoutStep={setCheckoutStep}/>
							<ShippingMethod checkoutStep={checkoutStep} setCheckoutStep={setCheckoutStep}/>
							<PaymentDetails checkoutStep={checkoutStep} setCheckoutStep={setCheckoutStep}/>
						</div>
						<OrderSummary/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CheckoutPage
