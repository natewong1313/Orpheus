import type { NextApiRequest, NextApiResponse } from "next"
import { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import type { Response } from "@/pages/api/products/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.query.id as string
            }
        })
        if (product !== null) {
            return res.status(200).json({ success: true, product })
        }
    } catch (e) {
        if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
            throw e
        }
    }
    return res.status(400).json({ success: false, message: "Product not found" })
}
