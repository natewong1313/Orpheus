import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import Image from "next/image"
import OrpheusLogo from "@/public/photos/orpheus.png"
import { RiCloseLine } from "react-icons/ri"
import MobileNavItem from "@/components/global/Navbar/MobileNavItem"
import MobileNavItemWithSubcategory from "@/components/global/Navbar/MobileNavItemWithSubcategory"
import type { NavItem } from "@/components/global/Navbar/types"

type Props = {
    showMobileNav: boolean
    setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>
    navItems: NavItem[]
}
const MobileNavPopover = ({ showMobileNav, setShowMobileNav, navItems }: Props) => {
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
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
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
                                    <Link href="/components/pages">
                                        <a className="">
                                            <Image
                                                src={OrpheusLogo}
                                                width={34}
                                                height={34}
                                                loading="eager"
                                                priority={true}
                                                draggable={false}
                                            />
                                        </a>
                                    </Link>
                                    {/* Close Button */}
                                    <div className="">
                                        <button className="p-1" onClick={() => setShowMobileNav(false)}>
                                            <RiCloseLine size={30} />
                                        </button>
                                    </div>
                                </div>
                                {/* Nav items */}
                                <div className="px-6 py-4 flex flex-col text-lg">
                                    {navItems.map((navItem) =>
                                        navItem.subcategories.length > 0 ? (
                                            <MobileNavItemWithSubcategory
                                                navItem={navItem}
                                                key={navItem.href}
                                            />
                                        ) : (
                                            <MobileNavItem navItem={navItem} key={navItem.href} />
                                        )
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

export default MobileNavPopover
