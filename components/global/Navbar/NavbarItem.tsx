import React from "react"
import Link from "next/link"
import type { NavItem } from "@/components/global/Navbar/types"

type Props = {
    navItem: NavItem
}
const NavbarItem = ({ navItem }: Props) => {
    return (
        <Link href={navItem.href}>
            <a className="font-medium text-gray-500 hover:text-black">{navItem.name}</a>
        </Link>
    )
}

export default NavbarItem
