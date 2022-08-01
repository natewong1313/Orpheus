import React, { useState, useEffect } from "react"
import { BsQuestionLg } from "react-icons/bs"
import type { Product } from "@prisma/client"
import PreviewImageModal from "@/components/pages/product/PreviewImageModal"

type Props = {
    product: Product
}
const ProductImageGallery = ({ product }: Props) => {
    const [selectedImg, setSelectedImg] = useState(null)
    const [selectedPreviewImg, setSelectedPreviewImg] = useState(null)
    const [showPreviewImageModal, setShowPreviewImageModal] = useState(false)

    useEffect(() => {
        if (product) {
            setSelectedImg(product?.images.length > 0 && product.images[0])
        }
    }, [product])

    return (
        <>
            <div>
                {/* Main image */}
                {selectedImg ? (
                    <button
                        onClick={() => {
                            setSelectedPreviewImg(selectedImg)
                            setShowPreviewImageModal(true)
                        }}
                    >
                        <img src={selectedImg} className="w-full object-center object-cover" />
                    </button>
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
            {/* Preview image modal */}
            <PreviewImageModal
                product={product}
                showPreviewImageModal={showPreviewImageModal}
                selectedPreviewImg={selectedPreviewImg}
                setShowPreviewImageModal={setShowPreviewImageModal}
                setSelectedPreviewImg={setSelectedPreviewImg}
            />
        </>
    )
}

export default ProductImageGallery
