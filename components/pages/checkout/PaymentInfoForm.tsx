import React from "react"
import { PaymentElement } from "@stripe/react-stripe-js"
import type { CheckoutSession } from "@/components/pages/checkout/types"
import { GoCheck } from "react-icons/go"

type Props = {
	checkoutSession: CheckoutSession
}
const PaymentInfoForm = ({ checkoutSession }: Props) => {
	const showForm = checkoutSession.shippingAddressCompleted && checkoutSession.shippingMethodCompleted
	return (
		<div className="flex flex-col border-b border-b-slate-200 pb-6">
			<div className="flex justify-between">
				<h1 className="text-lg font-semibold flex items-center">
					Payment Information
					{checkoutSession.paymentInfoCompleted && <GoCheck className="ml-2 text-emerald-500" size={24}/>}
				</h1>
			</div>
			<div className={`${showForm ? "block pt-6 " : "hidden"}`}>
				<form>
					<div className="grid grid-cols-6 gap-4">
						<div className="col-span-6">
							<PaymentElement onChange={e => checkoutSession.setPaymentInfoCompleted(e.complete)}/>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default PaymentInfoForm
