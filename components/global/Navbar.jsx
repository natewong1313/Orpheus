import React from "react"
import Link from "next/link"
import Image from "next/image"
import { RiShoppingBagLine } from "react-icons/ri"
import { HiChevronDown } from "react-icons/hi"
import OrpheusLogo from "@/public/photos/orpheus.png"

const NavItems = [
	{
		name: "Category #1",
		href: "/category1",
		subcategories: [
			{
				name: "Subcategory #1",
				href: "/subcategory1"
			},
			{
				name: "Subcategory #2",
				href: "/subcategory1"
			},
			{
				name: "Subcategory #3",
				href: "/subcategory1"
			},
			{
				name: "Subcategory #4",
				href: "/subcategory1"
			},
			{
				name: "Subcategory #5",
				href: "/subcategory1"
			}
		]
	},
	{
		name: "Category #2",
		href: "/category2",
		subcategories: []
	},
	{
		name: "Category #3",
		href: "/category3",
		subcategories: []
	}
]

const Navbar = () => {
	const cartItems = [{}, {}]
	return (
		<header className="py-4 border-b border-b-gray-200">
			<div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 xl:px-0">
				{/* Left Side */}
				<div className="relative flex justify-between items-center">
					<div className="flex space-x-12">
						{/* Logo Element */}
						<Link href="/">
							<a className="flex flex-row space-x-3 items-center">
								<Image src={OrpheusLogo} width={34} height={34} loading="eager" priority={true}/>
								<h1 className="font-gilroy font-bold text-xl">Orpheus</h1>
							</a>
						</Link>
						{/* Nav Items */}
						<div className="flex items-center space-x-7">
							{NavItems.map(navItem =>
								navItem.subcategories.length > 0 ?
									<NavbarItemWithSubcategory navItem={navItem} key={navItem.href}/> :
									<NavbarItem navItem={navItem} key={navItem.href}/>
							)}
						</div>
					</div>
					{/* Right Side */}
					<div className="flex">
						<Link href="/cart">
							<a className="inline-block relative py-1.5 text-gray-600">
								<RiShoppingBagLine size={32}/>
								{/* Cart items count */}
								{cartItems.length > 0 && <span
									className="absolute top-0 -right-2 block py-0.5 px-1.5 text-xs font-light rounded-full ring-2 ring-white bg-sky-500 text-white">
									{cartItems.length}
								</span>}
							</a>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

const NavbarItem = ({ navItem }) => {
	return (
		<Link href={navItem.href}>
			<a className="font-medium text-sm text-gray-500 hover:text-black">
				{navItem.name}
			</a>
		</Link>
	)
}

const NavbarItemWithSubcategory = ({ navItem }) => {
	return (
		<>
			<div className="group">
				<div className="cursor-pointer flex items-center space-x-1 text-gray-500 group-hover:text-black">
					<span className="font-medium text-sm">
						{navItem.name}
					</span>
					<HiChevronDown size={18}/>
				</div>
				<div className="absolute z-50 hidden group-hover:block">
					<div
						className="mt-7 w-auto max-w-sm h-auto ml-0 border border-gray-200 border-t-transparent rounded-b-lg bg-white">
						<ul className="py-2 px-5">
							{navItem.subcategories.map(subCategory =>
								<Link href={subCategory.href} key={subCategory.href}>
									<li className="text-gray-500 text-sm font-medium hover:text-black py-2 cursor-pointer">
										{subCategory.name}
									</li>
								</Link>
							)}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
