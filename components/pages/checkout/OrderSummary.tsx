import React, { useState } from "react"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import Loader from "@/components/global/Loader"
import type { Checkout } from "@/pages/api/cart/checkout/types"
import type { CheckoutState } from "@/components/pages/checkout/types"

type Props = {
	checkout: Checkout
	checkoutState: CheckoutState
}
const OrderSummary = ({ checkout, checkoutState }: Props) => {
	const allowOrderToBePlaced = checkoutState.shippingAddressCompleted && checkoutState.shippingMethodCompleted && checkoutState.paymentInfoCompleted
	const [showLoader, setShowLoader] = useState(false)
	const [errorMsg, setErrorMsg] = useState("")

	const stripe = useStripe()
	const elements = useElements()

	const onSubmitOrder = async () => {
		setShowLoader(true)
		setErrorMsg("")
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/checkout/confirmed"
			}
		})
		setShowLoader(false)
		setErrorMsg("Error: " + error.message)
	}
	return (
		<div
			className="col-span-2 border border-slate-100 rounded-lg p-4 flex-row space-y-3 h-min mb-6 md:mb-0 bg-white shadow-sm">
			<h1 className="font-semibold text-xl">Order Summary</h1>
			<div className="flex justify-between pt-2">
				<h2 className="font-medium text-sm">Items ({checkout.cart.totalItems})</h2>
				<h1 className="font-medium text-sm">${checkout.cart.subtotal}</h1>
			</div>
			<div className="flex justify-between">
				<h2 className="text-sm text-gray-500">Discount</h2>
				<h1 className="text-sm text-emerald-500">- $20.00</h1>
			</div>
			<div className="flex justify-between">
				<h2 className="text-sm text-gray-500">Shipping</h2>
				<h1 className="text-sm text-gray-500">$0.00</h1>
			</div>
			<div className="flex justify-between border-b border-b-slate-200 pb-3">
				<h2 className="text-sm text-gray-500">Tax</h2>
				<h1 className="text-sm text-gray-500">$0.00</h1>
			</div>
			<div className="flex justify-between pt-1">
				<h2 className="font-semibold">Order Total</h2>
				<h1 className="font-bold text-lg">$80.00</h1>
			</div>
			<div className="border-b border-b-slate-100 pb-4">
				<button
					className="mt-1 bg-sky-500 text-white font-semibold rounded-md py-2.5 w-full hover:bg-sky-600 disabled:opacity-50 disabled:hover:bg-sky-500 disabled:cursor-not-allowed"
					disabled={!allowOrderToBePlaced || showLoader}
					onClick={onSubmitOrder}
				>
					{showLoader ? <Loader/> : "Place Order"}
				</button>
				<p className="mt-3 -mb-1 text-sm text-red-600 font-medium">{errorMsg}</p>
			</div>
			<p className="text-xs text-slate-500">
				By placing your order, you agree to our <span className="underline">Terms of Use</span> and <span
					className="underline">Privacy Policy</span>
			</p>
		</div>
	)
}

export default OrderSummary