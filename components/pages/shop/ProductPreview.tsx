import React from "react"
import { BsQuestionLg } from "react-icons/bs"
import Link from "next/link"
import type { Product as ProductType } from "@prisma/client"

type Props = {
    category: string
    product: ProductType
}
const ProductPreview = ({ category, product }: Props) => {
    return (
        <Link
            href={`/shop/${category.toLowerCase()}/product/${product.id}/${product.title.replaceAll(
                " ",
                "-"
            )}`}
        >
            <a className="group flex flex-col">
                <div className="w-full rounded-lg overflow-hidden">
                    {product.images.length > 0 ? (
                        <img
                            src={product.images[0]}
                            className="w-full object-center object-cover group-hover:scale-110 transition ease-in-out duration-150"
                        />
                    ) : (
                        <div className="bg-gray-100 aspect-square w-full flex items-center justify-center">
                            <BsQuestionLg size={54} className="text-gray-400" />
                        </div>
                    )}
                </div>
                <h1 className="pt-3 font-medium truncate">{product.title}</h1>
                <h2 className="pt-1 font-medium -mt-1 text-slate-500">${product.price}</h2>
            </a>
        </Link>
    )
}

export default ProductPreview
