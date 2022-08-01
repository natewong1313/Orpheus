import React from "react"
import Image from "next/image"
import type { CartItemType } from "@/components/pages/cart/types"

const ItemsList = () => {
    const cartItems: CartItemType[] = [
        {
            id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
            title: "Mens Cotton Hooded Sweatshirt",
            price: 200.0,
            displayImage: "/photos/products/black-hoodie.png",
            variantDetails: {
                color: "Black",
                size: "S"
            },
            available: true
        },
        {
            id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
            title: "Mens Cotton Hooded Sweatshirt",
            price: 200.0,
            displayImage: "/photos/products/black-hoodie.png",
            variantDetails: {
                color: "Black",
                size: "S"
            },
            available: true
        },
        {
            id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
            title: "Mens Cotton Hooded Sweatshirt",
            price: 200.0,
            displayImage: "/photos/products/black-hoodie.png",
            variantDetails: {
                color: "Black",
                size: "S"
            },
            available: true
        },
        {
            id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
            title: "Mens Cotton Hooded Sweatshirt",
            price: 200.0,
            displayImage: "/photos/products/black-hoodie.png",
            variantDetails: {
                color: "Black",
                size: "S"
            },
            available: true
        }
        // {
        // 	id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
        // 	title: "Mens Cotton Hooded Sweatshirt",
        // 	price: 200.00,
        // 	displayImage: "/photos/products/black-hoodie.png",
        // 	variantDetails: {
        // 		color: "Black",
        // 		size: "S"
        // 	},
        // 	available: true
        // }, {
        // 	id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
        // 	title: "Mens Cotton Hooded Sweatshirt",
        // 	price: 200.00,
        // 	displayImage: "/photos/products/black-hoodie.png",
        // 	variantDetails: {
        // 		color: "Black",
        // 		size: "S"
        // 	},
        // 	available: true
        // }, {
        // 	id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
        // 	title: "Mens Cotton Hooded Sweatshirt",
        // 	price: 200.00,
        // 	displayImage: "/photos/products/black-hoodie.png",
        // 	variantDetails: {
        // 		color: "Black",
        // 		size: "S"
        // 	},
        // 	available: true
        // }, {
        // 	id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
        // 	title: "Mens Cotton Hooded Sweatshirt",
        // 	price: 200.00,
        // 	displayImage: "/photos/products/black-hoodie.png",
        // 	variantDetails: {
        // 		color: "Black",
        // 		size: "S"
        // 	},
        // 	available: true
        // }, {
        // 	id: "cfa888ea-c7cf-4fda-85ad-068395e69131",
        // 	title: "Mens Cotton Hooded Sweatshirt",
        // 	price: 200.00,
        // 	displayImage: "/photos/products/black-hoodie.png",
        // 	variantDetails: {
        // 		color: "Black",
        // 		size: "S"
        // 	},
        // 	available: true
        // }
    ]

    return (
        <div className="py-4 px-4 sm:px-0 flex flex-col space-y-4 min-w-full border-b border-slate-200 max-h-[21.5rem] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
            {cartItems.map((cartItem) => (
                <div className="flex space-x-3 px-3" key={cartItem.id}>
                    <div className="relative">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden border-slate-300 border">
                            <Image
                                src={cartItem.displayImage}
                                layout="fill"
                                // objectFit="cover"
                                loading="eager"
                                priority={true}
                                draggable={false}
                            />
                        </div>
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full ring-1 ring-white bg-sky-400 text-white text-xs flex justify-center items-center">
                            1
                        </span>
                    </div>
                    <div className="w-full flex flex-col justify-center space-y-0.5">
                        <div className="flex flex-row justify-between">
                            <h1 className="font-medium">{cartItem.title}</h1>
                            <h1 className="font-semibold">${cartItem.price}</h1>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-sm text-slate-500">{cartItem.variantDetails.color}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ItemsList
