import React, { useState } from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import FormInput from "@/components/pages/checkout/FormInput"
import FormLabel from "@/components/pages/checkout/FormLabel"
import FormSelect from "@/components/pages/checkout/FormSelect"

type Props = {
	checkoutStep: number
	setCheckoutStep: React.Dispatch<React.SetStateAction<number>>
}
const ShippingAddressForm = ({ checkoutStep, setCheckoutStep }: Props) => {
	const showForm = checkoutStep === 1

	const [formSubmitted, setFormSubmitted] = useState(false)
	const [validateOnBlur, setValidateOnBlur] = useState(false)

	const formValidation = yup.object({
		emailAddress: yup.string().email().required(),
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		countryName: yup.string().required(),
		address1: yup.string().required(),
		address2: yup.string().optional(),
		city: yup.string().required(),
		region: yup.string().required(),
		zipCode: yup.number().required()
	})
	const formik = useFormik({
		initialValues: {
			emailAddress: "",
			firstName: "",
			lastName: "",
			countryName: "United States",
			address1: "",
			address2: "",
			city: "",
			region: "",
			zipCode: ""
		},
		validationSchema: formValidation,
		validateOnBlur,
		validateOnChange: validateOnBlur,
		enableReinitialize: true,
		onSubmit: values => {
			// console.log(JSON.stringify(values, null, 2))
			setFormSubmitted(true)
			setCheckoutStep(2)
		}
	})

	const onEdit = () => {
		setCheckoutStep(1)
		setFormSubmitted(false)
	}

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
				<p className="text-sm text-slate-600">John Doe</p>
				<p className="text-sm text-slate-600">Johndoe11@gmail.com</p>
				<p className="text-sm text-slate-600">123 road st, New York, New York 12345</p>
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
							<FormLabel>Region</FormLabel>
							<FormInput
								type="text"
								id="region"
								autoComplete="address-level1"
								placeholder="Enter region"
								onChange={formik.handleChange}
								value={formik.values.region}
								hasError={"region" in formik.errors}
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
