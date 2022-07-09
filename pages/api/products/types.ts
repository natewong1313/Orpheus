import { Product } from "@prisma/client"

export type Response = {
	success: boolean
	message?: string
	product?: Product
}