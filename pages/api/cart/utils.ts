import type { NextApiRequest, NextApiResponse } from "next"
import { getCookie, setCookie } from "cookies-next"
import prisma from "@/lib/prisma"
import loadStripePrivate from "@/lib/stripe/loadStripePrivate"
import type { Response } from "@/pages/api/cart/types"

export async function getCartId(req: NextApiRequest, res: NextApiResponse<Response>) {
	let cartId
	const cartCookie = getCookie("cart", { req, res })
	if (isValidCartCookie(cartCookie)) {
		cartId = cartCookie as string

		const cart = await prisma.cart.findFirst({
			where: { id: cartId }
		})
		if (cart !== null) {
			return cartId
		}
	}
	cartId = await createNewCart()
	setCookie("cart", cartId, { req, res })
	return cartId
}

export async function getCart(cartId: string) {
	return await prisma.cart.findUnique({
		where: { id: cartId },
		include: {
			cartItems: {
				include: {
					product: true
				}
			}
		}
	})
}

const stripe = loadStripePrivate()
async function createNewCart() {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 100,
		currency: "usd",
		automatic_payment_methods: { enabled: true }
	})
	const cart = await prisma.cart.create({ data: {paymentIntentId: paymentIntent.id} })
	return cart.id
}

function isValidCartCookie(cartCookie: string | boolean) {
	return (cartCookie !== undefined && cartCookie !== null && typeof cartCookie === "string")
}