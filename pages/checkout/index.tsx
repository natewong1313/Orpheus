import React, { useState } from "react"
import Navbar from "@/components/pages/checkout/Navbar"
import OrderSummary from "@/components/pages/checkout/OrderSummary"
import ShippingAddressForm from "@/components/pages/checkout/ShippingAddressForm"
import ShippingMethodForm from "@/components/pages/checkout/ShippingMethodForm"
import PaymentInfoForm from "@/components/pages/checkout/PaymentInfoForm"
import checkHasCurrentCheckoutSession from "@/utils/checkHasCurrentCheckoutSession"
import loadStripePrivate from "@/utils/stripe/loadStripePrivate"
import type { ClientCheckoutSession } from "@/pages/api/checkout/types"
import type { CheckoutSession } from "@/components/pages/checkout/types"

type Props = {
	clientCheckoutSession: ClientCheckoutSession
}
const CheckoutPage = ({ clientCheckoutSession }: Props) => {
	const [currentStep, setCurrentStep] = useState(1)
	const [previousStep, setPreviousStep] = useState(1)
	const checkoutSession: CheckoutSession = {
		currentStep,
		previousStep,
		setCurrentStep,
		setPreviousStep
	}
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Navbar/>
			<div className="md:max-w-4xl 2xl:max-w-7xl mx-auto py-0 md:py-8">
				<div className="text-center flex flex-col items-center">
					<div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 w-full text-left pt-6 px-6">
						<div className="md:col-span-3 flex flex-col space-y-6 py-6 md:py-0 md:pr-8 2xl:w-[40rem]">
							<ShippingAddressForm checkoutSession={checkoutSession}/>
							<ShippingMethodForm checkoutSession={checkoutSession}/>
							{/*<PaymentInfoForm checkoutStep={checkoutStep} setCheckoutStep={setCheckoutStep}*/}
							{/*								 setPreviousCheckoutStep={setPreviousCheckoutStep}*/}
							{/*								 clientSecret={clientCheckoutSession.clientSecret}/>*/}
						</div>
						<OrderSummary/>
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps({ req, res }) {
	const clientCheckoutSession = await checkHasCurrentCheckoutSession(loadStripePrivate(), req, res)
	if (clientCheckoutSession !== null) {
		return { props: { clientCheckoutSession } }
	} else {
		return {
			redirect: {
				destination: "/cart",
				permanent: false
			}
		}
	}
}

export default CheckoutPage
