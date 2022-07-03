import React from "react"

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
				{/* Promo code status */}
				<p className="pt-2 text-sm font-medium text-emerald-500">STUDENT - 20% off</p>
			</div>
			<div className="flex justify-between pt-1">
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

export default OrderSummary
