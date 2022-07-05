import React from "react"
import Head from "next/head"

type Props = {
	children: JSX.Element | JSX.Element[]
}
const Layout = ({ children }: Props) => {
	return (
		<div>
			<Head>
				<title>Orpheus</title>
			</Head>
			<>{children}</>
		</div>
	)
}

export default Layout
