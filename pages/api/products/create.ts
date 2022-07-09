import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/utils/prisma"
import type { Response } from "@/pages/api/products/types"


export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}

	const { title, price, images, inventoryCount } = req.body
	const product = await prisma.product.create({ data: { title, price, images, inventoryCount } })
	return res.status(200).json({ success: true, product })
}