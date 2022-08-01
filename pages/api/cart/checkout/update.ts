import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { getCart, getCartId } from "@/pages/api/cart/utils"
import { formatCheckoutResponse } from "@/pages/api/cart/checkout/utils"
import type { Response } from "@/pages/api/cart/checkout/types"
import loadStripePrivate from "@/lib/stripe/loadStripePrivate"

const stripe = loadStripePrivate()

const RequestBody = z.object({
    couponCode: z
        .string({ invalid_type_error: "couponCode is not of type string" })
        .min(1, { message: "couponCode cannot be empty" })
        .optional(),
    shippingAddress: z
        .object({
            firstName: z.string().min(1),
            lastName: z.string().min(1),
            emailAddress: z.string().min(1),
            address1: z.string().min(1),
            address2: z.string().nullable().optional(),
            city: z.string().min(1),
            state: z.string().min(1),
            zipCode: z.string().min(1),
            countryName: z.string().min(1)
        })
        .optional(),
    shippingMethod: z
        .string({ invalid_type_error: "shippingMethod is not of type string" })
        .min(1, { message: "shippingMethod cannot be empty" })
        .optional()
})
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    // Validate request body
    let couponCode, shippingAddress, shippingMethod
    try {
        ;({ couponCode, shippingAddress, shippingMethod } = RequestBody.parse(req.body))
    } catch (e) {
        if (e.issues.path[0] === "shippingAddress") {
            return res.status(400).json({ success: false, message: "Invalid address" })
        }
        return res.status(400).json({ success: false, message: e.issues[0].message })
    }

    const cartId = await getCartId(req, res)
    const cart = await getCart(cartId)

    if (shippingAddress) {
        await prisma.checkoutSession.update({
            where: { id: cart.checkoutSession.id },
            data: {
                shippingAddress: {
                    create: shippingAddress
                }
            }
        })
        await stripe.paymentIntents.update(cart.checkoutSession.paymentIntentId, {
            receipt_email: shippingAddress.emailAddress,
            shipping: {
                name: shippingAddress.firstName + " " + shippingAddress.lastName,
                address: {
                    country: shippingAddress.countryName,
                    line1: shippingAddress.address1,
                    line2: shippingAddress.address2,
                    city: shippingAddress.city,
                    postal_code: shippingAddress.zipCode,
                    state: shippingAddress.state
                }
            }
        })
    } else if (shippingMethod) {
        await prisma.checkoutSession.update({
            where: { id: cart.checkoutSession.id },
            data: { shippingMethod }
        })
        await stripe.paymentIntents.update(cart.checkoutSession.paymentIntentId, {
            metadata: { shippingMethod }
        })
    } else {
        return res.status(400).json({ success: false, message: "Invalid update field" })
    }

    const updatedCart = await getCart(cartId)
    return res.status(200).json({
        success: true,
        checkout: await formatCheckoutResponse(updatedCart)
    })
}
