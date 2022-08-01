import type { NextApiRequest, NextApiResponse } from "next"
import { formatCartResponse, getCart, getCartId } from "@/pages/api/cart/utils"
import type { Response } from "@/pages/api/cart/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    const cartId = await getCartId(req, res)
    const cart = await getCart(cartId)
    return res.status(200).json({ success: true, cart: formatCartResponse(cart) })
}
