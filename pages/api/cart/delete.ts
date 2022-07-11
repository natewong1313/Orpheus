import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"
import { getCart, getCartId } from "@/pages/api/cart/utils"
import type { Response } from "@/pages/api/cart/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method !== "DELETE") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}

	const { productId } = req.body

	const cartId = await getCartId(req, res)
	const cart = await getCart(cartId)

	const cartItem = cart.cartItems.find((item) => item.productId === productId)
	if (cartItem) {
		await prisma.cartItem.delete({
			where: { id: cartItem.id }
		})
		// const updatedCart = await getCart(cartId)
		return res.status(200).json({
			success: true
		})
	} else {
		return res.status(400).json({ success: false, message: "Product not in cart" })
	}
}