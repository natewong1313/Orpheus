import React from "react"
import { BsQuestionLg } from "react-icons/bs"
import Link from "next/link"
import type { Product as ProductType } from "@prisma/client"

type Props = {
    product: ProductType
}
function Product({ product }: Props) {
    return (
        <Link href={`/${product.id}/${product.title.replace(" ", "-")}`}>
            <a className="group flex flex-col">
                <div className="w-full rounded-lg overflow-hidden">
                    {product.images.length > 0
                        ? <img
                            src={product.images[0]}
                            className="w-full aspect-square object-center object-cover group-hover:scale-110 transition ease-in-out duration-150"
                        />
                        : <div className="bg-gray-50 aspect-square w-full flex items-center justify-center">
                            <BsQuestionLg size={48} className="text-gray-400"/>
                        </div>
                    }
                </div>
                <h1 className="pt-3 truncate">{product.title}</h1>
                <h2 className="pt-1 -mt-1 font-medium text-slate-500">${product.price}</h2>
            </a>
        </Link>
    )
}

export default Product