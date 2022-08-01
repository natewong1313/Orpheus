import React from "react"
import Link from "next/link"
import type { NavItem } from "@/components/global/Navbar/types"

type Props = {
    navItem: NavItem
}
const MobileNavItem = ({ navItem }: Props) => {
    return (
        <Link href={navItem.href}>
            <a className="py-4 w-full font-medium text-gray-500 hover:text-black border-b border-b-gray-200">
                {navItem.name}
            </a>
        </Link>
    )
}

export default MobileNavItem
