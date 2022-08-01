import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { formatCartResponse, getCart, getCartId, updateCheckoutTotal } from "@/pages/api/cart/utils"
import type { Response } from "@/pages/api/cart/types"

const RequestBody = z.object({
    productId: z
        .string({
            required_error: "productId is required",
            invalid_type_error: "productId is not of type string"
        })
        .min(1, { message: "productId cannot be empty" }),
    quantity: z
        .number({
            required_error: "quantity is required",
            invalid_type_error: "quantity is not of type integer"
        })
        .positive({ message: "quantity must be > 0" })
})
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    // Validate request body
    let productId, quantity
    try {
        ;({ productId, quantity } = RequestBody.parse(req.body))
    } catch (e) {
        return res.status(400).json({ success: false, message: e.issues[0].message })
    }

    if (quantity < 1) {
        return res.status(400).json({ success: false, message: "Quantity must be greater than 0" })
    }

    const cartId = await getCartId(req, res)
    const cart = await getCart(cartId)
    // Check if item is in cart
    const cartItem = cart.cartItems.find((item) => item.productId === productId)
    if (!cartItem) {
        return res.status(400).json({ success: false, message: "Product not in cart" })
    }

    await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity }
    })
    const updatedCart = await getCart(cartId)
    await updateCheckoutTotal(updatedCart)
    return res.status(200).json({
        success: true,
        cart: formatCartResponse(updatedCart)
    })
}
