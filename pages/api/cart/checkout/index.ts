import type { NextApiRequest, NextApiResponse } from "next"
import { getCart, getCartId } from "@/pages/api/cart/utils"
import { formatCheckoutResponse } from "@/pages/api/cart/checkout/utils"
import type { Response } from "@/pages/api/cart/checkout/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    const cartId = await getCartId(req, res)
    const cart = await getCart(cartId)
    if (cart.cartItems.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" })
    }

    return res.status(200).json({
        success: true,
        checkout: await formatCheckoutResponse(cart)
    })
}
