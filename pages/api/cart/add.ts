import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"
import { getCart, getCartId } from "@/pages/api/cart/utils"
import type { Response } from "@/pages/api/cart/types"
import type { CartItem, Product } from "@prisma/client"

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

	const cartItem: CartItem & {product: Product} = cart.cartItems.find((item) => item.productId === productId)
	if (cartItem) {
		if (cartItem.quantity + 1 > cartItem.product.inventoryCount) {
			return res.status(400).json({ success: false, message: "Quantity exceeds inventory availability" })
		}
		await prisma.cartItem.update({
			where: { id: cartItem.id },
			data: { quantity: cartItem.quantity + 1 }
		})
	} else {
		try {
			await prisma.cartItem.create({
				data: {
					cart: { connect: { id: cartId } },
					product: { connect: { id: productId } },
					quantity
				}
			})
		} catch (e) {
			if (e.code === "P2025") {
				return res.status(400).json({ success: false, message: "Product not found" })
			} else {
				throw (e)
			}
		}
	}

	// const updatedCart = await getCart(cartId)
	return res.status(200).json({
		success: true
	})
}