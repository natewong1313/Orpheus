import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"
import type { Response } from "@/pages/api/products/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Request method not allowed" })
    }

    const { sortBy } = req.query

    const products = await prisma.product.findMany()
    if (sortBy) {
        switch (sortBy) {
            case "newToOld":
                products.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                break
            case "oldToNew":
                products.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
                break
            case "aToZ":
                products.sort((a, b) => a.title.localeCompare(b.title))
                break
            case "zToA":
                products.sort((a, b) => b.title.localeCompare(a.title))
                break
            case "lowToHigh":
                products.sort((a, b) => a.price - b.price)
                break
            case "highToLow":
                products.sort((a, b) => b.price - a.price)
                break
        }
    }
    return res.status(200).json({ success: true, products })
}
