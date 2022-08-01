import React from "react"
import Link from "next/link"
import { ImArrowRight2 } from "react-icons/im"

const EmptyCart = () => {
    return (
        <>
            <h1 className="font-bold text-3xl">Shopping Cart</h1>
            <h2 className="font-medium text-gray-500 mt-2 mb-4">Your shopping cart is currently empty</h2>
            <Link href="/">
                <a className="flex items-center bg-black text-white text-sm font-semibold w-max py-2.5 px-6 rounded-md hover:bg-gray-800">
                    Continue Shopping
                    <ImArrowRight2 className="ml-2" />
                </a>
            </Link>
        </>
    )
}
export default EmptyCart
