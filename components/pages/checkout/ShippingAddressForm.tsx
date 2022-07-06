import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { getCountries, getCountry } from "@/utils/countries"
import FormInput from "@/components/pages/checkout/FormInput"
import FormLabel from "@/components/pages/checkout/FormLabel"
import FormSelect, { FormSelectOption } from "@/components/pages/checkout/FormSelect"
import type { CheckoutSession } from "@/components/pages/checkout/types"
import { CheckoutSessionResponse } from "@/pages/api/checkout/types"

const countries = getCountries()

type Props = {
	checkoutSession: CheckoutSession
}
const ShippingAddressForm = ({ checkoutSession }: Props) => {
	const showForm = checkoutSession.currentStep === 1

	const [formSubmitted, setFormSubmitted] = useState(false)
	const [validateOnBlur, setValidateOnBlur] = useState(false)

	const onSubmit = async (values) => {
		const response = await fetch("/api/checkout/update", {
			method: "POST",
			headers: {
				"accept": "application/json",
				"content-type": "application/json"
			},
			body: JSON.stringify({
				emailAddress: formik.values.emailAddress,
				name: `${formik.values.firstName} ${formik.values.lastName}`,
				shippingAddress: formik.values
			})
		})
		if (response.status == 200 && (await response.json() as CheckoutSessionResponse).success) {
			setFormSubmitted(true)
			checkoutSession.setCurrentStep(2)
		}
	}

	const formValidation = yup.object({
		emailAddress: yup.string().email().required(),
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		countryName: yup.string().required(),
		address1: yup.string().required(),
		address2: yup.string().optional(),
		city: yup.string().required(),
		state: yup.string().required(),
		zipCode: yup.number().required()
	})
	const formik = useFormik({
		initialValues: {
			emailAddress: "",
			firstName: "",
			lastName: "",
			countryName: "US",
			address1: "",
			address2: "",
			city: "",
			state: "",
			zipCode: ""
		},
		validationSchema: formValidation,
		validateOnBlur,
		validateOnChange: validateOnBlur,
		enableReinitialize: true,
		onSubmit
	})

	const onEdit = () => {
		checkoutSession.setPreviousStep(checkoutSession.currentStep)
		checkoutSession.setCurrentStep(1)
		setFormSubmitted(false)
	}

	const countryOptions = countries.map(country => ({ name: country.name, value: country.code }))
	const [stateOptions, setStateOptions] = useState<FormSelectOption[]>([])
	useEffect(() => {
		const states = getCountry(formik.values.countryName).states.map(state => ({ name: state, value: state }))
		setStateOptions(states)
		if (states.length > 0) {
		}
	}, [formik.values.countryName])

	return (
		<div className="flex flex-col border-b border-b-slate-200  pb-6">
			<div className="flex justify-between">
				<h1 className={`text-lg ${showForm ? "font-semibold" : "font-medium text-slate-800"}`}>Shipping Address</h1>
				{formSubmitted &&
					<button className="text-sm font-medium text-sky-600" onClick={onEdit}>Edit</button>
				}
			</div>
			{/* Shipping details preview*/}
			<div className={`${formSubmitted ? "block pt-2" : "hidden"}`}>
				<p className="text-sm text-slate-600">{formik.values.firstName} {formik.values.lastName}</p>
				<p className="text-sm text-slate-600">{formik.values.emailAddress}</p>
				<p className="text-sm text-slate-600">{formik.values.address1} {formik.values.address2}</p>
				<p className="text-sm text-slate-600">
					{formik.values.city}, {formik.values.state} {formik.values.zipCode} {formik.values.countryName}
				</p>
			</div>
			{/* Shipping address form*/}
			<div className={`${showForm ? "block pt-6" : "hidden"}`}>
				<form onSubmit={(e) => {
					setValidateOnBlur(true)
					formik.handleSubmit(e)
				}}>
					<div className="grid grid-cols-6 gap-4">
						<div className="col-span-6">
							<FormLabel>Email Address</FormLabel>
							<FormInput
								type="email"
								id="emailAddress"
								autoComplete="email"
								placeholder="Enter email address"
								onChange={formik.handleChange}
								value={formik.values.emailAddress}
								hasError={"emailAddress" in formik.errors}
							/>
						</div>
						<div className="col-span-3">
							<FormLabel>First Name</FormLabel>
							<FormInput
								type="text"
								id="firstName"
								autoComplete="given-name"
								placeholder="Enter first name"
								onChange={formik.handleChange}
								value={formik.values.firstName}
								hasError={"firstName" in formik.errors}
							/>
						</div>
						<div className="col-span-3">
							<FormLabel>Last Name</FormLabel>
							<FormInput
								type="text"
								id="lastName"
								autoComplete="family-name"
								placeholder="Enter last name"
								onChange={formik.handleChange}
								value={formik.values.lastName}
								hasError={"lastName" in formik.errors}
							/>
						</div>

						<div className="col-span-6">
							<FormLabel>Country</FormLabel>
							<FormSelect
								id="countryName"
								autoComplete="country-name"
								onChange={formik.handleChange}
								value={formik.values.countryName}
								hasError={"countryName" in formik.errors}
								options={countryOptions}
							/>
						</div>

						<div className="col-span-4">
							<FormLabel>Address</FormLabel>
							<FormInput
								type="text"
								id="address1"
								autoComplete="street-address"
								placeholder="Enter address"
								onChange={formik.handleChange}
								value={formik.values.address1}
								hasError={"address1" in formik.errors}
							/>
						</div>
						<div className="col-span-2">
							<FormLabel>Apt / Suite</FormLabel>
							<FormInput
								type="text"
								id="address2"
								autoComplete="street-address"
								placeholder="Enter apt/suite #"
								onChange={formik.handleChange}
								value={formik.values.address2}
								hasError={"address2" in formik.errors}
							/>
						</div>
						<div className="col-span-6 md:col-span-2">
							<FormLabel>City</FormLabel>
							<FormInput
								type="text"
								id="city"
								autoComplete="address-level2"
								placeholder="Enter city"
								onChange={formik.handleChange}
								value={formik.values.city}
								hasError={"city" in formik.errors}
							/>
						</div>

						<div className="col-span-3 md:col-span-2">
							<FormLabel>State</FormLabel>
							<FormSelect
								id="state"
								autoComplete="address-level1"
								onChange={formik.handleChange}
								value={formik.values.state}
								hasError={"state" in formik.errors}
								options={stateOptions}
							/>
						</div>

						<div className="col-span-3 md:col-span-2">
							<FormLabel>ZIP</FormLabel>
							<FormInput
								type="text"
								id="zipCode"
								autoComplete="postal-code"
								placeholder="Enter ZIP code"
								onChange={formik.handleChange}
								value={formik.values.zipCode}
								hasError={"zipCode" in formik.errors}
							/>
						</div>
					</div>
					<div className="pt-6">
						<button
							className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full hover:bg-slate-800 disabled:bg-slate-400 disabled:border-slate-400 disabled:hover:bg-slate-400 disabled:cursor-not-allowed"
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
