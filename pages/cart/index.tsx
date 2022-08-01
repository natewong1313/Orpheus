import React from "react"
import Navbar from "@/components/global/Navbar"
import Footer from "@/components/global/Footer"
import EmptyCart from "@/components/pages/cart/EmptyCart"
import OrderSummary from "@/components/pages/cart/OrderSummary"
import CartItemsList from "@/components/pages/cart/CartItemsList"
import { getCart, getCartId } from "@/pages/api/cart/utils"
import type { CartInternal } from "@/pages/api/cart/types"

type Props = {
    cart: CartInternal
}
const CartPage = ({ cart }: Props) => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <>
                    {cart?.cartItems?.length > 0 ? (
                        <div className="text-left grid grid-cols-1 md:flex md:flex-grow pb-6 sm:pb-0">
                            <CartItemsList cartItems={cart.cartItems} />
                            <OrderSummary cartItems={cart.cartItems} />
                        </div>
                    ) : (
                        <div className="text-center flex flex-col items-center mt-16">
                            <EmptyCart />
                        </div>
                    )}
                </>
            </div>
            <Footer />
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const cartId = await getCartId(req, res)
    const cart = await getCart(cartId)

    return { props: { cart: JSON.parse(JSON.stringify(cart)) } }
}

export default CartPage
