import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import prisma from "@/lib/prisma"
import type { Response } from "@/pages/api/products/types"

const RequestBody = z.object({
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title is not of type string"
        })
        .min(1, { message: "title cannot be empty" }),
    description: z
        .string({
            required_error: "description is required",
            invalid_type_error: "description is not of type string"
        })
        .min(1, { message: "description cannot be empty" }),
    price: z
        .number({
            required_error: "price is required",
            invalid_type_error: "price is not of type integer"
        })
        .min(1, { message: "price must be >= 1" }),
    images: z.array(
        z.string({
            required_error: "images are required",
            invalid_type_error: "images are not of type string array"
        })
    ),
    inventoryCount: z
        .number({
            required_error: "inventoryCount is required",
            invalid_type_error: "inventoryCount is not of type integer"
        })
        .min(0, { message: "inventoryCount must be >= 0" })
})
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    // Validate request body
    let title
    let price
    let images
    let inventoryCount = null
    try {
        ;({ title, price, images, inventoryCount } = RequestBody.parse(req.body))
    } catch (e) {
        return res.status(400).json({ success: false, message: e.issues[0].message })
    }

    const product = await prisma.product.create({ data: { title, price, images, inventoryCount } })
    return res.status(200).json({ success: true, product })
}
