import React, { useState } from "react"
import useSWR from "swr"
import type { Product as ProductType } from "@prisma/client"
import Navbar from "@/components/global/Navbar"
import Footer from "@/components/global/Footer"
import Product from "@/components/pages/shop/ProductPreview"

const ShopPage = () => {
    let products: ProductType[]
    const [sortBy, setSortBy] = useState("newToOld")

    const { data, error } = useSWR(
        `/api/products?sortBy=${sortBy}`,
        (...args) => fetch(...args).then((res) => res.json()),
        { revalidateOnFocus: false, revalidateIfStale: false }
    )
    if (!error && data) {
        products = data.products as ProductType[]
    }

    return (
        <div className="min-h-full relative">
            <Navbar />
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto py-4 px-4 sm:px-6 md:px-8 pb-20">
                {/* Header */}
                <div className="pt-2 pb-6 flex justify-between">
                    <h1 className="font-semibold text-2xl">Shop all</h1>
                    <div className="flex items-center space-x-2">
                        <h1 className="min-w-fit text-slate-500 text-sm">Sort by:</h1>
                        <select
                            className="block w-44 py-2 px-3 rounded-md text-sm shadow-sm shadow-slate-50 focus:ring-blue-200 focus:border-blue-200 border border-slate-200"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newToOld">Date, new to old</option>
                            <option value="oldToNew">Date, old to new</option>
                            <option value="aToZ">Alphabetically, A-Z</option>
                            <option value="zToA">Alphabetically, Z-A</option>
                            <option value="lowToHigh">Price, low to high</option>
                            <option value="highToLow">Price, high to low</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-grow space-x-4">
                    <div className="flex-none md:w-60">Filters</div>
                    <div className="flex-1 ">
                        {/* Products grid */}
                        <div className="grid grid-cols-3 gap-y-6 gap-x-4 pb-6">
                            {products &&
                                products.map((product) => (
                                    <Product category="All" product={product} key={product.id} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ShopPage
