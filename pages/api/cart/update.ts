import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"
import { getCart, getCartId } from "@/pages/api/cart/utils"
import type { Response } from "@/pages/api/cart/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}

	const { productId, quantity } = req.body
	if (quantity < 1) {
		return res.status(400).json({ success: false, message: "Quantity must be greater than 0" })
	}

	const cartId = await getCartId(req, res)
	const cart = await getCart(cartId)

	const cartItem = cart.cartItems.find((item) => item.productId === productId)
	if (cartItem) {
		await prisma.cartItem.update({
			where: { id: cartItem.id },
			data: { quantity }
		})
		return res.status(200).json({
			success: true
		})
	} else {
		return res.status(400).json({ success: false, message: "Product not in cart" })
	}
}