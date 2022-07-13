import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"
import type { Response } from "@/pages/api/products/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method !== "DELETE") {
		return res.status(405).json({ success: false, message: "Request method not allowed" })
	}

	try {
		await prisma.product.delete({
			where: { id: req.body.id }
		})
		return res.status(200).json({ success: true })
	} catch (e) {
		if (e.code === "P2025") {
			return res.status(400).json({ success: false, message: "Product not found" })
		} else {
			throw(e)
		}
	}
}