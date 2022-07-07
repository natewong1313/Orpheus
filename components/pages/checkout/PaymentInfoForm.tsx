import React, { useEffect, useState } from "react"
import { Elements, PaymentElement } from "@stripe/react-stripe-js"
import FormLabel from "@/components/pages/checkout/FormLabel"
import FormInput from "@/components/pages/checkout/FormInput"
import FormSelect, { FormSelectOption } from "@/components/pages/checkout/FormSelect"
import { getCountries, getCountry } from "@/utils/countries"
import loadStripePublic from "@/utils/stripe/loadStripePublic"
import type { CheckoutSession } from "@/components/pages/checkout/types"
import * as yup from "yup"
import { useFormik } from "formik"
import { GoCheck } from "react-icons/go"

const countries = getCountries()
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
	checkoutSession: CheckoutSession
	clientSecret: string
}
const PaymentInfoForm = ({ checkoutSession, clientSecret }: Props) => {
	const stripePromise = loadStripePublic()
	stripeElementOptions.clientSecret = clientSecret

	const showForm = checkoutSession.shippingAddressCompleted && checkoutSession.shippingMethodCompleted
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [validateOnBlur, setValidateOnBlur] = useState(false)
	const [paymentElementComplete, setPaymentElementComplete] = useState(false)

	const onSubmit = () => {
		setFormSubmitted(true)
		checkoutSession.setPaymentInfoCompleted(true)
	}
	const validation = yup.object({
		shippingSameAsBilling: yup.boolean().required(),
		firstName: yup.string().when("shippingSameAsBilling", { is: false, then: yup.string().required() }),
		lastName: yup.string().when("shippingSameAsBilling", { is: false, then: yup.string().required() }),
		countryName: yup.string().when("shippingSameAsBilling", { is: false, then: yup.string().required() }),
		address1: yup.string().when("shippingSameAsBilling", { is: false, then: yup.string().required() }),
		address2: yup.string().optional().nullable(),
		city: yup.string().when("shippingSameAsBilling", { is: false, then: yup.string().required() }),
		state: yup.string().when("shippingSameAsBilling", { is: false, then: yup.string().required() }),
		zipCode: yup.number().when("shippingSameAsBilling", { is: false, then: yup.number().required() })
	})
	const formik = useFormik({
		initialValues: {
			shippingSameAsBilling: true,
			firstName: "",
			lastName: "",
			countryName: "US",
			address1: "",
			address2: "",
			city: "",
			state: "",
			zipCode: ""
		},
		validationSchema: validation,
		validateOnBlur,
		validateOnChange: validateOnBlur,
		enableReinitialize: true,
		onSubmit
	})

	const onEdit = () => {
		setFormSubmitted(false)
		setValidateOnBlur(false)
		// checkoutSession.setPaymentInfoCompleted(false)
	}

	const countryOptions = countries.map(country => ({ name: country.name, value: country.code }))
	const [stateOptions, setStateOptions] = useState<FormSelectOption[]>([])
	useEffect(() => {
		const states = getCountry(formik.values.countryName).states.map(state => ({ name: state, value: state }))
		setStateOptions(states)
		if (states.length > 0) {
			formik.setFieldValue("state", states[0].value)
		}
	}, [formik.values.countryName])

	return (
		<div className="flex flex-col border-b border-b-slate-200 pb-6">
			<div className="flex justify-between">
				<h1 className="text-lg font-semibold flex items-center">
					Payment Information
					{checkoutSession.paymentInfoCompleted && <GoCheck className="ml-2 text-emerald-500" size={24}/>}
				</h1>
			</div>
			<div className={`${showForm ? "block pt-6 " : "hidden"}`}>
				<Elements stripe={stripePromise} options={stripeElementOptions}>
					<form onSubmit={(e) => {
						setValidateOnBlur(true)
						formik.handleSubmit(e)
					}}>
						<div className="grid grid-cols-6 gap-4">
							<div className="col-span-6">
								<PaymentElement onChange={e => checkoutSession.setPaymentInfoCompleted(e.complete)}/>
							</div>
							{/* Shipping same as billing checkbox */}
							{/*<div className="col-span-6">*/}
							{/*	<div className="relative flex items-start">*/}
							{/*		<div className="flex items-center h-5">*/}
							{/*			<input*/}
							{/*				id="shippingSameAsBilling"*/}
							{/*				name="shippingSameAsBilling"*/}
							{/*				type="checkbox"*/}
							{/*				checked={formik.values.shippingSameAsBilling}*/}
							{/*				onChange={formik.handleChange}*/}
							{/*				className="h-4 w-4 rounded text-sky-500 border-slate-300 focus:ring-transparent"*/}
							{/*			/>*/}
							{/*		</div>*/}
							{/*		<label htmlFor="shippingSameAsBilling"*/}
							{/*					 className="ml-3 text-sm font-medium text-slate-500 select-none">*/}
							{/*			Shipping same as billing*/}
							{/*		</label>*/}
							{/*	</div>*/}
							{/*</div>*/}
						</div>
						<div className={`grid grid-cols-6 gap-4 ${formik.values.shippingSameAsBilling ? "hidden" : "pt-4"}`}>
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
						{/*<div className="pt-6">*/}
						{/*	<button*/}
						{/*		className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full hover:bg-slate-800 disabled:bg-slate-400 disabled:border-slate-400 disabled:hover:bg-slate-400 disabled:cursor-not-allowed"*/}
						{/*	>*/}
						{/*		Continue*/}
						{/*	</button>*/}
						{/*</div>*/}
					</form>
				</Elements>
			</div>
		</div>
	)
}

export default PaymentInfoForm
