import { NextApiRequest, NextApiResponse } from "next"
import { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import type { Response } from "@/pages/api/products/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (!["POST", "PUT"].includes(req.method)) {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}

	const { id, ...data } = req.body

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