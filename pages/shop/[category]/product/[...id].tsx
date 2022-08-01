import React, { useState, useEffect } from "react"
import useSWR from "swr"
import { useRouter } from "next/router"
import { BsQuestionLg } from "react-icons/bs"
import type { Product as ProductType } from "@prisma/client"
import Navbar from "@/components/global/Navbar"
import Footer from "@/components/global/Footer"
import PreviewImageModal from "@/components/pages/product/PreviewImageModal"
import Breadcrumbs from "@/components/pages/product/Breadcrumbs"
import Loader from "@/components/global/Loader"

export default function Product() {
    const router = useRouter()
    let { category, id } = router.query
    category = category?.toString()
    if (id?.length > 1) id = id[0]
    if (!id) {
        return null
    }

    const [selectedImg, setSelectedImg] = useState(null)
    const [selectedPreviewImg, setSelectedPreviewImg] = useState(null)
    const [showPreviewImageModal, setShowPreviewImageModal] = useState(false)

    let product: ProductType
    const { data, error } = useSWR(
        `/api/products/${id}`,
        (...args) => fetch(...args).then((res) => res.json()),
        { revalidateOnFocus: false }
    )
    if (!error && data) {
        product = data.product as ProductType
    }
    useEffect(() => {
        if (!error && data) {
            setSelectedImg(product?.images.length > 0 && product.images[0])
        }
    }, [data, error])

    const pages = [
        { name: "Shop", href: "/shop" },
        { name: category && category[0].toUpperCase() + category.slice(1), href: `/shop/${category}` },
        { name: product?.title, href: "#" }
    ]

    const [quantity, setQuantity] = useState(1)
    const [showLoader, setShowLoader] = useState(false)
    const onAddToCartBtnClick = async () => {
        setShowLoader(true)
        const response = await fetch("/api/cart/add", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ productId: product.id, quantity: 1 })
        })
        router.push("/cart")
    }

    return (
        <div className="min-h-full relative">
            <Navbar />
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto py-4 md:py-8 px-4 sm:px-6 md:px-8 pb-20">
                {/* Breadcrumbs */}
                <Breadcrumbs pages={pages} />
                {/* Product info */}
                <div className="mt-4 grid md:grid-cols-2 gap-x-8 gap-y-8">
                    {/* Product images */}
                    <div>
                        {/* Main image */}
                        {selectedImg ? (
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    setSelectedPreviewImg(selectedImg)
                                    setShowPreviewImageModal(true)
                                }}
                            >
                                <img src={selectedImg} className="w-full object-center object-cover" />
                            </div>
                        ) : (
                            <div className="bg-gray-100 aspect-square w-full flex items-center justify-center">
                                <BsQuestionLg size={54} className="text-gray-400" />
                            </div>
                        )}
                        {/*  Image gallery */}
                        <div className="mt-2.5 flex items-center justify-center">
                            <div className="flex flex-row space-x-4">
                                {product?.images.map((img) => (
                                    <button key={img} onClick={() => setSelectedImg(img)}>
                                        <img
                                            src={img}
                                            className={`w-32 ${
                                                selectedImg !== img && "opacity-50"
                                            } hover:opacity-100 transition duration-150 ease-in-out`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Product details */}
                    <div className="flex flex-col space-y-2 max-w-md">
                        <h1 className="font-semibold text-3xl">{product?.title}</h1>
                        <h2 className="text-2xl tracking-tight">${product?.price}</h2>
                        <h2 className="text-slate-500 pb-4">Shipping calculated at checkout.</h2>
                        <div className="flex space-x-2">
                            {/* Counter */}
                            <div className="flex rounded-lg border border-slate-200 shadow-sm shadow-slate-50">
                                <button
                                    className="px-4 text-lg text-slate-500 hover:text-black"
                                    onClick={() => quantity !== 1 && setQuantity(quantity - 1)}
                                >
                                    -
                                </button>
                                <input
                                    className="text-center w-8 disabled:bg-white"
                                    value={quantity}
                                    disabled={true}
                                />
                                <button
                                    className="px-4 text-lg text-slate-500 hover:text-black"
                                    onClick={() =>
                                        quantity < product?.inventoryCount + 1 && setQuantity(quantity + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <button
                                type="button"
                                className="bg-sky-500 text-white font-medium rounded-md py-2.5 w-full hover:bg-sky-600"
                                onClick={onAddToCartBtnClick}
                            >
                                {showLoader ? <Loader /> : "Add to cart"}
                            </button>
                        </div>
                        <p className="pt-6 text-slate-600">{product?.description}</p>
                    </div>
                </div>
            </div>
            {/* Preview image modal */}
            <PreviewImageModal
                product={product}
                showPreviewImageModal={showPreviewImageModal}
                selectedPreviewImg={selectedPreviewImg}
                setShowPreviewImageModal={setShowPreviewImageModal}
                setSelectedPreviewImg={setSelectedPreviewImg}
            />
            <Footer />
        </div>
    )
}
