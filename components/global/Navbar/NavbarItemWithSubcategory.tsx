import React from "react"
import { HiChevronDown } from "react-icons/hi"
import Link from "next/link"
import type { NavItem } from "@/components/global/Navbar/types"

type Props = {
    navItem: NavItem
}
const NavbarItemWithSubcategory = ({ navItem }: Props) => {
    return (
        <>
            <div className="group">
                {/* Nav item title */}
                <div className="cursor-pointer flex items-center space-x-1 text-gray-500 group-hover:text-black">
                    <span className="font-medium text-sm">{navItem.name}</span>
                    <HiChevronDown size={18} />
                </div>
                {/* Subcategory list shown on hover */}
                <div className="absolute z-50 hidden group-hover:block">
                    <div className="mt-7 w-auto max-w-sm h-auto ml-0 border border-gray-200 border-t-transparent rounded-b-lg bg-white">
                        <ul className="py-2 px-5">
                            {navItem.subcategories.map((subCategory) => (
                                <Link href={subCategory.href} key={subCategory.href}>
                                    <li className="text-gray-500 text-sm font-medium hover:text-black py-2 cursor-pointer">
                                        {subCategory.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarItemWithSubcategory
