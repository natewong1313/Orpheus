import React, { useEffect, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import type { ShippingMethod, CheckoutState } from "@/components/pages/checkout/types"
import type { Checkout, Response } from "@/pages/api/cart/checkout/types"
import Loader from "@/components/global/Loader"
import { GoCheck } from "react-icons/go"

type Props = {
    checkout: Checkout
    checkoutState: CheckoutState
}
const ShippingMethodForm = ({ checkout, checkoutState }: Props) => {
    const showForm = !checkoutState.shippingMethodCompleted && checkoutState.shippingAddressCompleted
    const [showLoader, setShowLoader] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const shippingMethods: ShippingMethod[] = [
        { title: "USPS Priority Mail", estimatedDelivery: "2-3 days", price: 8.99 },
        { title: "USPS Parcel Select", estimatedDelivery: "7 days", price: 7.99 },
        { title: "USPS Priority Mail Express", estimatedDelivery: "1-2 days", price: 14.99 }
    ]
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(shippingMethods[0].title)

    const onFormSubmit = async () => {
        setShowLoader(true)
        const response = await fetch("/api/cart/checkout/update", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ shippingMethod: selectedShippingMethod })
        })
        setShowLoader(false)
        if (response.status === 200 && ((await response.json()) as Response).success) {
            setFormSubmitted(true)
            checkoutState.setShippingMethodCompleted(true)
        }
    }

    const onEdit = () => {
        checkoutState.setShippingMethodCompleted(false)
        setFormSubmitted(false)
    }

    // Set field values if user has already submitted shipping method previously
    useEffect(() => {
        if (shippingMethods.find((method) => method.title === checkout.shippingMethod)) {
            setSelectedShippingMethod(checkout.shippingMethod)
            setFormSubmitted(true)
            checkoutState.setShippingMethodCompleted(true)
        }
    }, [])
    return (
        <div className="flex flex-col border-b border-b-slate-200 pb-6">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold flex items-center">
                    Shipping Method
                    {formSubmitted && <GoCheck className="ml-2 text-emerald-500" size={24} />}
                </h1>
                {formSubmitted && (
                    <button className="text-sm font-medium text-sky-600" onClick={onEdit}>
                        Edit
                    </button>
                )}
            </div>
            {/* Shipping method preview */}
            <div className={`${formSubmitted ? "block pt-2" : "hidden"}`}>
                <p className="text-sm text-slate-600">{selectedShippingMethod}</p>
            </div>
            {/* Shipping method form */}
            <div className={`${showForm ? "block pt-6" : "hidden"}`}>
                <form>
                    <RadioGroup value={selectedShippingMethod} onChange={setSelectedShippingMethod}>
                        <div className="bg-white rounded-md -space-y-px shadow-sm">
                            {shippingMethods.map((shippingMethod, shippingMethodIdx) => (
                                <RadioGroup.Option
                                    key={shippingMethod.title}
                                    value={shippingMethod.title}
                                    className={({
                                        checked
                                    }) => `relative border p-4 flex items-center cursor-pointer focus:outline-none 
										${shippingMethodIdx === 0 ? "rounded-tl-md rounded-tr-md " : " "} 
										${shippingMethodIdx === shippingMethods.length - 1 ? "rounded-bl-md rounded-br-md " : " "}
										${checked ? "bg-sky-50 border-sky-200 z-10" : "border-slate-200"}
									`}
                                >
                                    {({ checked }) => (
                                        <>
                                            {/*	Radio circle */}
                                            <span
                                                className={`h-5 w-5 cursor-pointer shrink-0 rounded-full border flex items-center justify-center 
											${checked ? "bg-sky-600 border-transparent " : "bg-white border-slate-300 "} 
										`}
                                            >
                                                <span className="rounded-full bg-white w-1.5 h-1.5" />
                                            </span>
                                            <div className="ml-4 flex flex-col">
                                                <RadioGroup.Label
                                                    as="span"
                                                    className={`block text-sm font-medium ${
                                                        checked ? "text-sky-900" : "text-slate-900"
                                                    }`}
                                                >
                                                    {shippingMethod.title}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`block text-sm ${
                                                        checked ? "text-sky-700" : "text-slate-500"
                                                    }`}
                                                >
                                                    {shippingMethod.estimatedDelivery}
                                                </RadioGroup.Description>
                                            </div>
                                            <div className="ml-auto">
                                                <RadioGroup.Label
                                                    as="span"
                                                    className={`block text-sm font-semibold ${
                                                        checked ? "text-sky-900" : "text-slate-900"
                                                    }`}
                                                >
                                                    {shippingMethod.price}
                                                </RadioGroup.Label>
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                    <div className="pt-6">
                        <button
                            type="button"
                            className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full hover:bg-slate-800 disabled:bg-slate-400 disabled:border-slate-400 disabled:hover:bg-slate-400 disabled:cursor-not-allowed"
                            onClick={onFormSubmit}
                        >
                            {showLoader ? <Loader /> : "Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShippingMethodForm
