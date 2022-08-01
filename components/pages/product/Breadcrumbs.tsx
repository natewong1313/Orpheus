import React from "react"
import Link from "next/link"

type Props = {
    pages: {
        name: string
        href: string
    }[]
}
const Breadcrumbs = ({ pages }: Props) => {
    return (
        <div className="flex items-center space-x-1">
            {pages.map((page, idx) => (
                <div className="flex items-center" key={idx}>
                    {/* Divider */}
                    {idx !== 0 && (
                        <svg
                            className="flex-shrink-0 h-5 w-5 text-slate-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                    )}
                    <Link href={page.href}>
                        <a
                            className={`ml-1 text-sm ${
                                idx === pages.length - 1 ? "font-medium text-slate-500" : "text-slate-400"
                            } hover:text-slate-500`}
                        >
                            {page.name}
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Breadcrumbs
