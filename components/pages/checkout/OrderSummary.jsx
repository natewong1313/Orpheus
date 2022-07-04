import React from "react"

const OrderSummary = () => {
	return (
		<div
			className="col-span-2 border border-slate-100 rounded-lg p-4 flex-row space-y-3 h-min mb-6 md:mb-0 bg-white shadow-sm">
			<h1 className="font-semibold text-xl">Order Summary</h1>
			<div className="flex justify-between pt-2">
				<h2 className="font-medium text-sm">Items (2)</h2>
				<h1 className="font-medium text-sm">$100.00</h1>
			</div>
			<div className="flex justify-between">
				<h2 className="text-sm text-gray-500">Discount</h2>
				<h1 className="text-sm text-emerald-500">- $20.00</h1>
			</div>
			<div className="flex justify-between">
				<h2 className="text-sm text-gray-500">Shipping</h2>
				<h1 className="text-sm text-gray-500">$0.00</h1>
			</div>
			<div className="flex justify-between border-b border-b-slate-200 pb-4">
				<h2 className="text-sm text-gray-500">Tax</h2>
				<h1 className="text-sm text-gray-500">$0.00</h1>
			</div>
			<div className="flex justify-between pt-1">
				<h2 className="font-semibold">Order Total</h2>
				<h1 className="font-bold text-lg">$80.00</h1>
			</div>
			<div>
				<button
					className="mt-1 bg-sky-500 text-white font-semibold rounded-md py-2.5 w-full hover:bg-sky-600 disabled:opacity-50 disabled:hover:bg-sky-500 disabled:cursor-not-allowed"
					disabled={true}
				>
					Place Order
				</button>

			</div>
			<p className="text-xs text-slate-500 pt-1">
				By placing your order, you agree to our <span className="underline">Terms of Use</span> and <span
				className="underline">Privacy Policy</span>
			</p>
		</div>
	)
}

export default OrderSummary
