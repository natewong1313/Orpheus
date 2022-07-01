import React from "react"
import Head from "next/head"

const Layout = ({ children }) => {
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
