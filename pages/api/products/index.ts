import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"
import type { Response } from "@/pages/api/products/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method !== "GET") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}

	const products = await prisma.product.findMany()
	return res.status(200).json({ success: true, products })
}