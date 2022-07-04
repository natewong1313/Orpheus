import React from "react"

const OrderSummaryOld = ({ onCheckoutBtnClick }) => {
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
						className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full sm:w-auto sm:ml-3 mt-2 sm:mt-0 hover:bg-slate-800"
					>
						Apply
					</button>
				</form>
				{/* Promo code status */}
				<p className="pt-2 text-sm font-medium text-emerald-500">STUDENT - 20% off</p>
			</div>
			<div className="flex justify-between pt-1">
				<h2 className="font-medium text-sm">Items (2)</h2>
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
				<button
					className="mt-3 bg-sky-500 text-white font-bold rounded-md py-2.5 w-full hover:bg-sky-600"
					onClick={onCheckoutBtnClick}
				>
					Checkout
				</button>
			</div>
		</div>
	)
}

const OrderSummary = ({ onCheckoutBtnClick }) => {
	return (
		<div
			className="flex-none md:w-96 lg:w-[30rem] py-6 md:py-10 px-4 sm:px-6 md:px-8 bg-gray-50 flex-row space-y-4 order-1 md:order-2">
			<h1 className="font-semibold text-xl">Order Summary</h1>
			<div className="flex flex-row justify-between pb-4 border-b border-b-slate-200">
					<span
						className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm bg-slate-200 text-slate-600">
						2 items
					</span>
				<span className="font-medium text-sm">$100.00</span>
			</div>
			<div>
				<h2 className="font-medium text-sm text-slate-500">Promo Code</h2>
				{/* Promo code form */}
				<form className="mt-1 sm:flex sm:items-center">
					<div className="w-full md:max-w-xs">
						<input
							type="email"
							name="email"
							id="email"
							spellCheck={false}
							className="text-sm rounded-md w-full focus:ring-blue-200 focus:border-blue-200 border-slate-200 shadow-sm placeholder:text-slate-400 focus:placeholder:text-slate-300"
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
			<div className="flex justify-between">
				<h2 className="text-sm text-slate-600">Discount</h2>
				<h1 className="text-sm text-slate-600">(20%) - $20.00</h1>
			</div>
			<div className="flex justify-between">
				<h2 className="text-sm text-slate-600">Shipping</h2>
				<h1 className="text-sm text-slate-600">$0.00</h1>
			</div>
			<div className="flex justify-between border-b border-b-slate-200 pb-5">
				<h2 className="text-sm font-semibold text-slate-600">Subtotal</h2>
				<h1 className="text-sm font-semibold text-slate-600">$80.00</h1>
			</div>
			<div>
				<button
					className="bg-sky-500 text-white font-semibold rounded-md py-2.5 w-full hover:bg-sky-600"
					onClick={onCheckoutBtnClick}
				>
					Continue to Checkout
				</button>
			</div>
		</div>
	)
}

export default OrderSummary
