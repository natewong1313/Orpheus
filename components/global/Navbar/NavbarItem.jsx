import React from "react"
import Link from "next/link"

const NavbarItem = ({ navItem }) => {
	return (
		<Link href={navItem.href}>
			<a className="font-medium text-gray-500 hover:text-black">
				{navItem.name}
			</a>
		</Link>
	)
}

export default NavbarItem
