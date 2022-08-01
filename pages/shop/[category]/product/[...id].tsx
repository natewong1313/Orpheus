import React from "react"
import useSWR from "swr"
import { useRouter } from "next/router"
import type { Product } from "@prisma/client"
import Navbar from "@/components/global/Navbar"
import Footer from "@/components/global/Footer"
import Breadcrumbs from "@/components/pages/product/Breadcrumbs"
import ProductDetails from "@/components/pages/product/ProductDetails"
import ProductImageGallery from "@/components/pages/product/ProductImageGallery"

const ProductPage = () => {
    const router = useRouter()
    let { category, id } = router.query
    category = category?.toString()
    if (id?.length > 1) id = id[0]
    if (!id) {
        return null
    }

    let product: Product
    const { data, error } = useSWR(
        `/api/products/${id}`,
        (...args) => fetch(...args).then((res) => res.json()),
        { revalidateOnFocus: false }
    )
    if (!error && data) {
        product = data.product as Product
    }

    const pages = [
        { name: "Shop", href: "/shop/all" },
        { name: category && category[0].toUpperCase() + category.slice(1), href: `/shop/${category}` },
        { name: product?.title, href: "#" }
    ]

    return (
        <div className="min-h-full relative">
            <Navbar />
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto py-4 md:py-8 px-4 sm:px-6 md:px-8 pb-20">
                {/* Breadcrumbs */}
                <Breadcrumbs pages={pages} />
                {/* Product info */}
                <div className="mt-4 grid md:grid-cols-2 gap-x-8 gap-y-8">
                    {/* Product images */}
                    <ProductImageGallery product={product} />
                    {/* Product details */}
                    <ProductDetails product={product} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage
