import React, { useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import Navbar from "@/components/pages/checkout/Navbar"
import OrderSummary from "@/components/pages/checkout/OrderSummary"
import ShippingAddressForm from "@/components/pages/checkout/ShippingAddressForm"
import ShippingMethodForm from "@/components/pages/checkout/ShippingMethodForm"
import PaymentInfoForm from "@/components/pages/checkout/PaymentInfoForm"
import { checkHasCurrentCheckoutSession } from "@/pages/api/checkout/utils"
import loadStripePublic from "@/lib/stripe/loadStripePublic"
import loadStripePrivate from "@/lib/stripe/loadStripePrivate"
import type { ClientCheckoutSession } from "@/pages/api/checkout/types"
import type { CheckoutSession } from "@/components/pages/checkout/types"

const stripeElementOptions = {
	clientSecret: "",
	fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" }],
	appearance: {
		variables: {
			fontFamily: "Inter",
			fontWeightNormal: "500",
			colorTextPlaceholder: "rgb(148 163 184)",
			focusBoxShadow: "0 0 0 0.8px var(--p-colorPrimaryAlpha20)",
			spacingGridColumn: "1rem",
			spacingGridRow: "1rem"
		},
		rules: {
			".Label": {
				color: "rgb(100 116 139)",
				fontSize: "0.875rem",
				lineHeight: "1.25rem",
				marginBottom: "0px",
				textTransform: "capitalize"
			},
			".Input": {
				color: "black",
				fontSize: "0.875rem",
				paddingTop: "0.5rem",
				paddingBottom: "0.5rem",
				lineHeight: "1.25rem",
				borderColor: "rgb(226 232 240)",
				borderRadius: "0.375rem",
				marginTop: "0.25rem",
				boxShadow: "var(0 0 #0000, 0 0 #0000), var(0 0 #0000, 0 0 #0000), 0 1px 2px 0 rgb(0 0 0 / 0.05)",
				transition: "none"
			}
		}
	}
}

type Props = {
	clientCheckoutSession: ClientCheckoutSession
}
const CheckoutPage = ({ clientCheckoutSession }: Props) => {
	const [shippingAddressCompleted, setShippingAddressCompleted] = useState(false)
	const [shippingMethodCompleted, setShippingMethodCompleted] = useState(false)
	const [paymentInfoCompleted, setPaymentInfoCompleted] = useState(false)
	const checkoutSession: CheckoutSession = {
		shippingAddressCompleted,
		shippingMethodCompleted,
		paymentInfoCompleted,
		setShippingAddressCompleted,
		setShippingMethodCompleted,
		setPaymentInfoCompleted,
		client: clientCheckoutSession
	}

	const stripePromise = loadStripePublic()
	stripeElementOptions.clientSecret = clientCheckoutSession.clientSecret

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Navbar/>
			<div className="md:max-w-4xl 2xl:max-w-7xl mx-auto py-0 md:py-8">
				<div className="text-center flex flex-col items-center">
					<div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 w-full text-left pt-6 px-6">
						<Elements stripe={stripePromise} options={stripeElementOptions}>
							<div className="md:col-span-3 flex flex-col space-y-6 py-6 md:py-0 md:pr-8 2xl:w-[40rem]">
								<ShippingAddressForm checkoutSession={checkoutSession}/>
								<ShippingMethodForm checkoutSession={checkoutSession}/>
								<PaymentInfoForm checkoutSession={checkoutSession}/>
							</div>
							<OrderSummary checkoutSession={checkoutSession}/>
						</Elements>
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