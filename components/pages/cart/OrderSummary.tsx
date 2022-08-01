import React, { useState } from "react"
import { useRouter } from "next/router"
import Loader from "@/components/global/Loader"
import type { CartItemInternal } from "@/pages/api/cart/types"
import { calcCartItemCount, calcCartItemsTotalPrice } from "@/utils/cartItem"

type Props = {
    cartItems: CartItemInternal[]
}
const OrderSummary = ({ cartItems }: Props) => {
    const router = useRouter()
    const [showCouponLoader, setShowCouponLoader] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const [couponInput, setCouponInput] = useState("")

    const cartItemCount = calcCartItemCount(cartItems)
    const cartItemsTotalPrice = calcCartItemsTotalPrice(cartItems).toFixed(2)

    const subtotal = cartItemsTotalPrice

    const hasCoupon = false
    const onCouponBtnClick = () => {
        setShowCouponLoader(true)
    }

    const onCheckoutBtnClick = async () => {
        setShowLoader(true)
        router.push("/checkout")
    }

    return (
        <div className="flex-none md:w-96 lg:w-[30rem] py-6 md:py-10 px-4 sm:px-6 md:px-8 bg-gray-50 flex-row space-y-4 order-1 md:order-2">
            <h1 className="font-semibold text-xl">Order Summary</h1>
            <div className="flex flex-row justify-between pb-4 border-b border-b-slate-200">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm bg-slate-200 text-slate-600">
                    {cartItemCount} item{cartItemCount !== 1 && "s"}
                </span>
                <span className="font-medium text-sm">${cartItemsTotalPrice}</span>
            </div>
            <div>
                <h2 className="font-medium text-sm text-slate-500">Promo Code</h2>
                {/* Promo code form */}
                <form className="mt-1 sm:flex sm:items-center">
                    <div className="w-full md:max-w-xs">
                        <input
                            type="text"
                            spellCheck={false}
                            className="text-sm rounded-md w-full focus:ring-blue-200 focus:border-blue-200 border-slate-200 shadow-sm placeholder:text-slate-400 focus:placeholder:text-slate-300"
                            placeholder="Enter code"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full sm:w-28 sm:ml-3 mt-2 sm:mt-0 hover:bg-gray-800"
                        onClick={onCouponBtnClick}
                    >
                        {/* Apply */}
                        {showCouponLoader ? <Loader size={9} speedMultiplier={0.6} /> : "Apply"}
                    </button>
                </form>
                {/* Promo code status */}
                {/* <p className="pt-2 text-sm font-medium text-emerald-500">STUDENT - 20% off</p> */}
            </div>
            <div className="flex justify-between">
                <h2 className="text-sm text-slate-600">Discount</h2>
                <h1 className="text-sm text-slate-600">{hasCoupon ? "(20%) - $20.00}" : "$0.00"}</h1>
            </div>
            <div className="flex justify-between">
                <h2 className="text-sm text-slate-600">Shipping</h2>
                <h1 className="text-sm text-slate-600">$0.00</h1>
            </div>
            <div className="flex justify-between border-b border-b-slate-200 pb-5">
                <h2 className="text-sm font-medium text-black">Subtotal</h2>
                <h1 className="text-sm font-medium text-black">${subtotal}</h1>
            </div>
            <div>
                <button
                    className="bg-sky-500 text-white font-medium rounded-md py-2.5 w-full hover:bg-sky-600"
                    onClick={onCheckoutBtnClick}
                >
                    {showLoader ? <Loader /> : "Continue to Checkout"}
                </button>
            </div>
        </div>
    )
}

export default OrderSummary
