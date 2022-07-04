import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { RiShoppingBagLine, RiMenuLine } from "react-icons/ri"
import OrpheusLogo from "@/public/photos/orpheus.png"
import MobileNavPopover from "@/components/global/Navbar/MobileNavPopover"
import NavbarItem from "@/components/global/Navbar/NavbarItem"
import NavbarItemWithSubcategory from "@/components/global/Navbar/NavbarItemWithSubcategory"
import type { NavItem } from "@/components/global/Navbar/types"

const NavItems: NavItem[] = [
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
	const [showMobileNav, setShowMobileNav] = useState(false)
	return (
		<header className="py-4 border-b border-b-gray-200 bg-white">
			<div className="px-4 sm:px-6 md:px-8">
				{/* Left Side */}
				<div className="relative flex justify-between items-center">
					{/* Mobile nav toggle */}
					<button className="md:hidden" onClick={() => setShowMobileNav(true)}>
						<RiMenuLine size={28}/>
					</button>
					<div className="flex space-x-12">
						{/* Logo Element */}
						<Link href="/">
							<a className="flex flex-row space-x-3 items-center">
								<Image src={OrpheusLogo} width={34} height={34} loading="eager" priority={true}/>
								<h1 className="font-gilroy font-bold text-xl">Orpheus</h1>
							</a>
						</Link>
						{/* Nav Items */}
						<div className="hidden md:flex items-center space-x-7 text-sm">
							{NavItems.map(navItem =>
								navItem.subcategories.length > 0 ?
									<NavbarItemWithSubcategory navItem={navItem} key={navItem.href}/> :
									<NavbarItem navItem={navItem} key={navItem.href}/>
							)}
						</div>
					</div>
					{/* Right Side */}
					<div className="flex">
						<Link href="/index">
							<a className="inline-block relative py-1.5 text-gray-600">
								<RiShoppingBagLine size={32}/>
								{/* Cart items count */}
								{cartItems.length > 0 && <span
									className="absolute top-0 -right-2 block py-0.5 px-1.5 text-xs rounded-full ring-2 ring-white bg-sky-500 text-white">
									{cartItems.length}
								</span>}
							</a>
						</Link>
					</div>
				</div>
			</div>
			<MobileNavPopover showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} navItems={NavItems}/>
		</header>
	)
}

export default Navbar
