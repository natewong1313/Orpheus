import React, { useState } from "react"
import { useRouter } from "next/router"
import type { Product } from "@prisma/client"
import Loader from "@/components/global/Loader"
import type { Response } from "@/pages/api/cart/types"

type Props = {
    product: Product
}
const ProductDetails = ({ product }: Props) => {
    const router = useRouter()

    const [quantity, setQuantity] = useState(1)
    const [showLoader, setShowLoader] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const onAddToCartBtnClick = async () => {
        setShowLoader(true)
        const response = await fetch("/api/cart/add", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ productId: product.id, quantity })
        })
        const responseBody: Response = await response.json()
        if (responseBody.success) {
            router.push("/cart")
        } else {
            setShowLoader(false)
            setErrorMsg(responseBody.message)
        }
    }

    return (
        <div className="flex flex-col space-y-2 max-w-md">
            <h1 className="font-semibold text-3xl">{product?.title}</h1>
            <h2 className="text-2xl font-medium tracking-tight">${product?.price}</h2>
            <h2 className="text-slate-500 font-medium pb-4">Shipping calculated at checkout.</h2>
            <div className="flex space-x-2">
                {/* Counter */}
                <div className="flex rounded-lg border border-slate-200 shadow-sm shadow-slate-50">
                    <button
                        className="px-4 text-lg text-slate-500 hover:text-black"
                        onClick={() => quantity !== 1 && setQuantity(quantity - 1)}
                    >
                        -
                    </button>
                    <input className="text-center w-8 disabled:bg-white" value={quantity} disabled={true} />
                    <button
                        className="px-4 text-lg text-slate-500 hover:text-black"
                        onClick={() => quantity < product?.inventoryCount + 1 && setQuantity(quantity + 1)}
                    >
                        +
                    </button>
                </div>
                <div className="w-full">
                    <button
                        type="button"
                        className="bg-sky-500 text-white font-semibold rounded-md py-2.5 w-full hover:bg-sky-600"
                        onClick={onAddToCartBtnClick}
                    >
                        {showLoader ? <Loader /> : "Add to Cart"}
                    </button>
                    <div className="absolute pt-1 text-sm text-red-600">{errorMsg}</div>
                </div>
            </div>
            <p className="pt-6 text-slate-600">{product?.description}</p>
        </div>
    )
}

export default ProductDetails
