import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import type { Response } from "@/pages/api/products/types"

const RequestBody = z.object({
    id: z
        .string({
            required_error: "id is required",
            invalid_type_error: "id is not of type string"
        })
        .min(1, { message: "id cannot be empty" })
        .optional(),
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title is not of type string"
        })
        .min(1, { message: "title cannot be empty" })
        .optional(),
    description: z
        .string({
            required_error: "description is required",
            invalid_type_error: "description is not of type string"
        })
        .min(1, { message: "description cannot be empty" })
        .optional(),
    price: z
        .number({
            required_error: "price is required",
            invalid_type_error: "price is not of type integer"
        })
        .min(1, { message: "price must be >= 1" })
        .optional(),
    images: z
        .array(
            z.string({
                required_error: "images are required",
                invalid_type_error: "images are not of type string array"
            })
        )
        .optional(),
    inventoryCount: z
        .number({
            required_error: "inventoryCount is required",
            invalid_type_error: "inventoryCount is not of type integer"
        })
        .min(0, { message: "inventoryCount must be >= 0" })
        .optional()
})
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (!["POST", "PUT"].includes(req.method)) {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    let id
    let data = null
    try {
        ;({ id, ...data } = RequestBody.parse(req.body))
    } catch (e) {
        return res.status(400).json({ success: false, message: e.issues[0].message })
    }

    try {
        const product = await prisma.product.update({
            where: { id },
            data
        })
        if (product !== null) {
            return res.status(200).json({ success: true, product })
        }
    } catch (e) {
        if (e instanceof Prisma.PrismaClientValidationError) {
            return res.status(400).json({ success: false, message: "Invalid field" })
        }
    }
    return res.status(400).json({ success: false, message: "Product not found" })
}
