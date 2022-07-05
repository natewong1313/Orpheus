import React, { useState } from "react"
import FormLabel from "@/components/pages/checkout/FormLabel"
import FormInput from "@/components/pages/checkout/FormInput"
import FormSelect from "@/components/pages/checkout/FormSelect"
import { Elements, PaymentElement } from "@stripe/react-stripe-js"
import loadStripePublic from "@/utils/stripe/loadStripePublic"

const stripeElementOptions = {
	clientSecret: "",
	fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" }],
	appearance: {
		variables: {
			fontFamily: `Inter`,
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
	checkoutStep: number
	setCheckoutStep: React.Dispatch<React.SetStateAction<number>>
}
const PaymentInfoForm = ({ checkoutStep, setCheckoutStep }: Props) => {
	const stripePromise = loadStripePublic()
	const showForm = checkoutStep === 3
	const onFormSubmit = () => {
		setCheckoutStep(0)
	}
	const formComplete = checkoutStep !== 3

	const [shippingSameAsBilling, setShippingSameAsBilling] = useState(true)
	return (
		<div className="flex flex-col border-b border-b-slate-200  pb-6">
			<div className="flex justify-between">
				<h1 className={`text-lg ${showForm ? "font-semibold" : "font-medium text-slate-800"}`}>Payment Information</h1>
				{formComplete && <button className="text-sm font-medium text-sky-600">Edit</button>}
			</div>
			{/* Payment information preview*/}
			<div className={`${formComplete ? "block pt-2" : "hidden"}`}>

			</div>
			<div className={`${showForm ? "block pt-6" : "hidden"}`}>
				<Elements stripe={stripePromise} options={stripeElementOptions}>
					<form action="#" method="POST">
						<div className="grid grid-cols-6 gap-4">
							<div className="col-span-6">
								<PaymentElement/>
							</div>
							<div className="col-span-6">
								<div className="relative flex items-start">
									<div className="flex items-center h-5">
										<input
											id="shippingSameAsBilling"
											name="shippingSameAsBilling"
											type="checkbox"
											checked={shippingSameAsBilling}
											className="h-4 w-4 rounded text-sky-500 border-slate-300 focus:ring-transparent"
											onChange={() => setShippingSameAsBilling(!shippingSameAsBilling)}
										/>
									</div>
									<label htmlFor="shippingSameAsBilling"
												 className="ml-3 text-sm font-medium text-slate-500 select-none">
										Shipping same as billing
									</label>
								</div>
							</div>
						</div>
						<div className={`grid grid-cols-6 gap-4 ${shippingSameAsBilling ? "hidden" : "pt-4"}`}>
							<div className="col-span-3">
								<FormLabel>First Name</FormLabel>
								<FormInput
									type="text"
									name="first-name"
									id="first-name"
									autoComplete="given-name"
									placeholder="Enter first name"
								/>
							</div>

							<div className="col-span-3">
								<FormLabel>Last Name</FormLabel>
								<FormInput
									type="text"
									name="last-name"
									id="last-name"
									autoComplete="family-name"
									placeholder="Enter last name"
								/>
							</div>

							<div className="col-span-6">
								<FormLabel>Country</FormLabel>
								<FormSelect
									id="country"
									name="country"
									autoComplete="country-name"
								/>
							</div>

							<div className="col-span-4">
								<FormLabel>Address</FormLabel>
								<FormInput
									type="text"
									name="street-address"
									id="street-address"
									autoComplete="street-address"
									placeholder="Enter address"
								/>
							</div>
							<div className="col-span-2">
								<FormLabel>Apt / Suite</FormLabel>
								<FormInput
									type="text"
									name="street-address"
									id="street-address"
									autoComplete="street-address"
									placeholder="Enter apt/suite #"
								/>
							</div>

							<div className="col-span-6 sm:col-span-6 lg:col-span-2">
								<FormLabel>City</FormLabel>
								<FormInput
									type="text"
									name="city"
									id="city"
									autoComplete="address-level2"
									placeholder="Enter city"
								/>
							</div>

							<div className="col-span-3 md:col-span-2">
								<FormLabel>State</FormLabel>
								<FormInput
									type="text"
									name="region"
									id="region"
									autoComplete="address-level1"
									placeholder="Enter state"
								/>
							</div>

							<div className="col-span-3 md:col-span-2">
								<FormLabel>ZIP</FormLabel>
								<FormInput
									type="text"
									name="postal-code"
									id="postal-code"
									autoComplete="postal-code"
									placeholder="Enter ZIP code"
								/>
							</div>
						</div>
						<div className="pt-6">
							<button
								type="button"
								className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full hover:bg-slate-800 disabled:bg-slate-400 disabled:border-slate-400 disabled:hover:bg-slate-400 disabled:cursor-not-allowed"
								// disabled={true}
								onClick={onFormSubmit}
							>
								Continue
							</button>
						</div>
					</form>
				</Elements>
			</div>
		</div>
	)
}

export default PaymentInfoForm
