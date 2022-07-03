import React from "react"
import FormInput from "@/components/pages/checkout/FormInput"
import FormLabel from "@/components/pages/checkout/FormLabel"
import FormSelect from "@/components/pages/checkout/FormSelect"

const ShippingDetails = () => {
	return (
		<div className="flex flex-col">
			<h1 className="font-semibold text-lg">Shipping Address</h1>
			<div>
				<form action="#" method="POST">
					<div className="py-6 bg-white">
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
									placeholder="Select country"
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
								<FormLabel>Apt # / Suite</FormLabel>
								<FormInput
									type="text"
									name="street-address"
									id="street-address"
									autoComplete="street-address"
									placeholder="Enter apt # / suite"
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
								<FormLabel>ZIP Code</FormLabel>
								<FormInput
									type="text"
									name="postal-code"
									id="postal-code"
									autoComplete="postal-code"
									placeholder="Enter ZIP code"
								/>
							</div>
						</div>
					</div>
					{/*<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">*/}
					{/*	<button*/}
					{/*		type="submit"*/}
					{/*		className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
					{/*	>*/}
					{/*		Save*/}
					{/*	</button>*/}
					{/*</div>*/}
				</form>
			</div>
		</div>
	)
}

export default ShippingDetails
