import React, { useState } from "react"
import { HiMinus, HiPlus } from "react-icons/hi"
import { Transition } from "@headlessui/react"
import Link from "next/link"
import type { NavItem } from "@/components/global/Navbar/types"

type Props = {
    navItem: NavItem
}
const MobileNavItemWithSubcategory = ({ navItem }: Props) => {
    const [showSubCategories, setShowSubCategories] = useState(false)
    return (
        <>
            <div className="py-4 w-full group border-b border-b-gray-200">
                {/* Toggle subcategory visibility button */}
                <button
                    className={`w-full flex items-center justify-between space-x-1 ${
                        showSubCategories ? "text-black" : "text-gray-500"
                    } group-hover:text-black`}
                    onClick={() => setShowSubCategories(!showSubCategories)}
                >
                    <span className="font-medium">{navItem.name}</span>
                    {showSubCategories ? <HiMinus size={20} /> : <HiPlus size={20} />}
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
                            {navItem.subcategories.map((subCategory) => (
                                <Link href={subCategory.href} key={subCategory.href}>
                                    <a className="text-gray-500 font-medium hover:text-black">
                                        {subCategory.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Transition>
            </div>
        </>
    )
}

export default MobileNavItemWithSubcategory
