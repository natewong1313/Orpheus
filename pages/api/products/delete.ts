import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import prisma from "@/lib/prisma"
import type { Response } from "@/pages/api/products/types"

const RequestBody = z.object({
    id: z
        .string({
            required_error: "id is required",
            invalid_type_error: "id is not of type string"
        })
        .min(1, { message: "id cannot be empty" })
})
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    // Validate request body
    let id = null
    try {
        ;({ id } = RequestBody.parse(req.body))
    } catch (e) {
        return res.status(400).json({ success: false, message: e.issues[0].message })
    }

    try {
        await prisma.product.delete({ where: { id } })
        return res.status(200).json({ success: true })
    } catch (e) {
        if (e.code === "P2025") {
            return res.status(400).json({ success: false, message: "Product not found" })
        } else {
            throw e
        }
    }
}
