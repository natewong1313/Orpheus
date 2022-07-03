import React from "react"
import Image from "next/image"
import { CgClose } from "react-icons/cg"

const CartItem = ({ cartItem }) => {
	return (
		<div className="flex flex-row items-center space-x-4 w-full md:pr-8">
			{/* Product image */}
			<div className="relative h-32 w-32 rounded-md overflow-hidden">
				<Image
					src={cartItem.displayImage}
					layout="fill"
					loading="eager"
					priority={true}
					draggable={false}
				/>
			</div>
			<div className="flex flex-col space-y-1 w-full">
				<div className="flex justify-between w-full space-x-2">
					<h1 className="font-medium">{cartItem.title}</h1>
					<h1 className="font-bold flex flex-row items-center">
						{/*<span className="font-medium">Total: </span>*/}
						$14.99
						{/*<span className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"><RiCloseCircleFill*/}
						{/*	size={20}/></span>*/}
					</h1>
				</div>
				{/*<div>*/}
				{/*	<p*/}
				{/*		className="text-sm text-gray-500 font-medium">*/}
				{/*		{cartItem.variantDetails.color}<span className="text-gray-300"> / </span>*/}
				{/*		{cartItem.variantDetails.size}</p>*/}
				{/*</div>*/}
				<div>
					<p className="text-sm font-medium text-gray-500">
						$14.99
						<span className="text-gray-300"> | </span>
						{cartItem.available ? <span className="text-emerald-500">In Stock</span> :
							<span className="text-red-500">Out of Stock</span>}
					</p>
				</div>
				<div className="pt-3 flex flex-row space-x-2 items-center">
					{/* Size select */}
					<div>
						<select
							className="block pl-3 pr-10 py-2 text-sm font-medium text-gray-500 rounded-lg border-gray-300 focus:outline-none focus:ring-blue-200 focus:border-blue-200"
						>
							{["Small", "Medium", "Large", "XLarge"].map(sz => <option key={sz}>{sz}</option>)}
						</select>
					</div>
					{/* Color select*/}
					{/*<div>*/}
					{/*	<select*/}
					{/*		className="block pl-3 pr-10 py-2 text-sm font-medium text-gray-500 rounded-lg border-gray-300 focus:outline-none focus:ring-blue-200 focus:border-blue-200"*/}
					{/*	>*/}
					{/*		{["Black", "White"].map(clr => <option key={clr}>{clr}</option>)}*/}
					{/*	</select>*/}
					{/*</div>*/}
					{/* Quantity select */}
					<div>
						<select
							className="block pl-3 pr-10 py-2 text-sm font-medium text-gray-500 rounded-lg border-gray-300 focus:outline-none focus:ring-blue-200 focus:border-blue-200"
						>
							{[1, 2, 3, 4, 5].map(sz => <option key={sz}>{sz}</option>)}
						</select>
					</div>
					{/*<button className="text-red-600 hover:text-red-700">*/}
					{/*	<MdDeleteForever size={24}/>*/}
					{/*</button>*/}
					{/*<div className="w-full text-right">*/}
					{/*	<button className="text-red-500 text-sm font-medium hover:text-red-700">Remove*/}
					{/*	</button>*/}
					{/*</div>*/}
				</div>
			</div>
			<div className="mb-auto">
				<button className="text-gray-400 p-1 rounded-full hover:bg-slate-100">
					<CgClose size={20}/>
				</button>
			</div>
		</div>
	)
}

export default CartItem
