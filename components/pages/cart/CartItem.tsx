import React from "react"
import Image from "next/image"
import { CgClose } from "react-icons/cg"
import { BsQuestionLg } from "react-icons/bs"
import type { CartItem as CartItemType } from "@/pages/api/cart/types"
import type { Response } from "@/pages/api/cart/types"

type Props = {
	cartItem: CartItemType
}
const CartItem = ({ cartItem }: Props) => {
	const { product, quantity } = cartItem

	const onChangeQuantity = async (e) => {
		const response = await fetch("/api/cart/update", {
			method: "POST",
			headers: {
				"accept": "application/json",
				"content-type": "application/json"
			},
			body: JSON.stringify({
				productId: product.id,
				quantity: parseInt(e.target.value)
			})
		})
		const { success }: Response = await response.json()
		if (success) {
			window.location.reload()
		}
	}
	const onDeleteItemBtnClick = async () => {
		const response = await fetch("/api/cart/delete", {
			method: "DELETE",
			headers: {
				"accept": "application/json",
				"content-type": "application/json"
			},
			body: JSON.stringify({ productId: product.id })
		})
		const { success }: Response = await response.json()
		if (success) {
			window.location.reload()
		}
	}

	return (
		<div className="flex flex-row items-center space-x-4 w-full">
			{/* Product image */}
			<div className="relative h-32 w-40 rounded-md overflow-hidden">
				{product.images.length > 0 ?
					<Image
						src={product.images[0]}
						objectFit="fill"
						layout="fill"
						loading="eager"
						priority={true}
						draggable={false}
					/> :
					<div className="bg-slate-200 h-full flex items-center justify-center">
						<BsQuestionLg size={48} className="text-gray-400"/>
					</div>
				}
			</div>
			<div className="flex flex-col space-y-1 w-full">
				<div className="flex justify-between w-full space-x-2">
					<h1 className="font-medium">{product.title}</h1>
					<h1 className="font-semibold flex flex-row items-center">${product.price * quantity}</h1>
				</div>
				<div>
					<p className="text-sm text-slate-500">
						${product.price}
						<span className="text-slate-300"> | </span>
						{product.inventoryCount > 0 ? <span className="text-emerald-500">In Stock</span> :
							<span className="text-red-500">Out of Stock</span>}
					</p>
				</div>
				<div className="pt-3 flex flex-row space-x-2 items-center">
					{/*/!* Size select *!/*/}
					{/*<div>*/}
					{/*	<select*/}
					{/*		className="block pl-3 pr-10 py-2 text-sm font-medium text-slate-500 rounded-lg border-slate-200 shadow-sm shadow-slate-50 focus:outline-none focus:ring-blue-200 focus:border-blue-200"*/}
					{/*	>*/}
					{/*		{["Small", "Medium", "Large", "XLarge"].map(sz => <option key={sz}>{sz}</option>)}*/}
					{/*	</select>*/}
					{/*</div>*/}
					{/* Quantity select */}
					<div>
						<select
							className="block pl-3 pr-10 py-2 text-sm font-medium text-slate-500 rounded-lg border-slate-200 shadow-sm shadow-slate-50 focus:outline-none focus:ring-blue-200 focus:border-blue-200"
							defaultValue={quantity}
							onChange={onChangeQuantity}
						>
							{Array.from(Array(product.inventoryCount).keys()).map(qty => <option key={qty + 1}>{qty + 1}</option>)}
						</select>
					</div>
				</div>
			</div>
			<div className="mb-auto">
				<button
					className="text-slate-400 p-1 rounded-full hover:bg-slate-100"
					onClick={onDeleteItemBtnClick}
				>
					<CgClose size={20}/>
				</button>
			</div>
		</div>
	)
}

export default CartItem
