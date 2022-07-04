import React from "react"
import FormInput from "@/components/pages/checkout/FormInput"
import FormLabel from "@/components/pages/checkout/FormLabel"
import FormSelect from "@/components/pages/checkout/FormSelect"

type Props = {
	checkoutStep: number
	setCheckoutStep: React.Dispatch<React.SetStateAction<number>>
}
const ShippingAddressForm = ({ checkoutStep, setCheckoutStep }: Props) => {
	const showForm = checkoutStep === 1
	const onFormSubmit = () => {
		setCheckoutStep(2)
	}
	const formComplete = checkoutStep !== 1
	return (
		<div className="flex flex-col border-b border-b-slate-200  pb-6">
			<div className="flex justify-between">
				<h1 className={`text-lg ${showForm ? "font-semibold" : "font-medium text-slate-800"}`}>Shipping Address</h1>
				{formComplete &&
					<button className="text-sm font-medium text-sky-600">Edit</button>
				}
			</div>
			{/* Shipping details preview*/}
			<div className={`${formComplete ? "block pt-2" : "hidden"}`}>
				<p className="text-sm text-slate-600">John Doe</p>
				<p className="text-sm text-slate-600">Johndoe11@gmail.com</p>
				<p className="text-sm text-slate-600">123 road st, New York, New York 12345</p>
			</div>
			{/* Shipping address form*/}
			<div className={`${showForm ? "block pt-6" : "hidden"}`}>
				<form action="#" method="POST">
					<div className="grid grid-cols-6 gap-4">
						<div className="col-span-6">
							<FormLabel>Email Address</FormLabel>
							<FormInput
								type="email"
								name="email-address"
								id="email-address"
								autoComplete="email"
								placeholder="Enter email address"
							/>
						</div>
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

						<div className="col-span-6 md:col-span-2">
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
			</div>
		</div>
	)
}

export default ShippingAddressForm
