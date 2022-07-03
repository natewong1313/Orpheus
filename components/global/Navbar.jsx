import React, { useState, Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import Link from "next/link"
import Image from "next/image"
import { RiShoppingBagLine, RiMenuLine, RiCloseLine } from "react-icons/ri"
import { HiChevronDown, HiPlus, HiMinus } from "react-icons/hi"
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
	const [showMobileNav, setShowMobileNav] = useState(false)
	return (
		<header className="py-4 border-b border-b-gray-200">
			<div className="max-w-6xl 2xl:max-w-7xl mx-auto px-6 md:px-4 xl:px-0">
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
						<Link href="/cart">
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
			<MobileNav showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav}/>
		</header>
	)
}

const MobileNav = ({ showMobileNav, setShowMobileNav }) => {
	return (
		<Transition.Root show={showMobileNav} as={Fragment}>
			<Dialog as="div" className="relative z-20 md:hidden" onClose={setShowMobileNav}>
				{/* Background shadow */}
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-30"/>
				</Transition.Child>
				<div className="fixed inset-0 flex z-40">
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						{/* Nav Panel */}
						<Dialog.Panel className="w-full max-w-xs sm:max-w-sm bg-white">
							<div className="flex flex-col pt-5">
								{/* Nav panel header */}
								<div className="flex border-b border-b-gray-200 px-4 pb-4 justify-between">
									<Link href="/">
										<a className="">
											<Image src={OrpheusLogo} width={34} height={34} loading="eager" priority={true}/>
										</a>
									</Link>
									{/* Close Button */}
									<div className="">
										<button className="p-1" onClick={() => setShowMobileNav(false)}>
											<RiCloseLine size={30}/>
										</button>
									</div>
								</div>
								{/* Nav items */}
								<div className="px-6 py-4 flex flex-col text-lg">
									{NavItems.map(navItem =>
										navItem.subcategories.length > 0 ?
											<MobileNavbarItemWithSubcategory navItem={navItem} key={navItem.href}/> :
											<MobileNavbarItem navItem={navItem} key={navItem.href}/>
									)}
								</div>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

const NavbarItem = ({ navItem }) => {
	return (
		<Link href={navItem.href}>
			<a className="font-medium text-gray-500 hover:text-black">
				{navItem.name}
			</a>
		</Link>
	)
}

const MobileNavbarItem = ({ navItem }) => {
	return (
		<Link href={navItem.href}>
			<a className="py-4 w-full font-medium text-gray-500 hover:text-black border-b border-b-gray-200">
				{navItem.name}
			</a>
		</Link>
	)
}

const NavbarItemWithSubcategory = ({ navItem }) => {
	return (
		<>
			<div className="group">
				{/* Nav item title*/}
				<div className="cursor-pointer flex items-center space-x-1 text-gray-500 group-hover:text-black">
					<span className="font-medium text-sm">
						{navItem.name}
					</span>
					<HiChevronDown size={18}/>
				</div>
				{/* Subcategory list shown on hover */}
				<div className="absolute z-50 hidden group-hover:block">
					<div
						className="mt-7 w-auto max-w-sm h-auto ml-0 border border-gray-200 border-t-transparent rounded-b-lg bg-white"
					>
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

const MobileNavbarItemWithSubcategory = ({ navItem }) => {
	const [showSubCategories, setShowSubCategories] = useState(false)
	return (
		<>
			<div className="py-4 w-full group border-b border-b-gray-200">
				{/* Toggle subcategory visibility button */}
				<button
					className={`w-full flex items-center justify-between space-x-1 ${showSubCategories ? "text-black" : "text-gray-500"} group-hover:text-black`}
					onClick={() => setShowSubCategories(!showSubCategories)}
				>
					<span className="font-medium">
						{navItem.name}
					</span>
					{showSubCategories ?
						<HiMinus size={20}/> : <HiPlus size={20}/>
					}
				</button>
				{/* Subcategory list */}
				<Transition
					show={showSubCategories}
					enter="transition-opacity duration-75"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="pt-4 pl-4">
						<div className="flex flex-col space-y-6">
							{navItem.subcategories.map(subCategory =>
								<Link href={subCategory.href} key={subCategory.href}>
									<a className="text-gray-500 font-medium hover:text-black">
										{subCategory.name}
									</a>
								</Link>
							)}
						</div>
					</div>
				</Transition>
			</div>
		</>
	)
}

export default Navbar
