import React from "react"
import { Html, Head, Main, NextScript } from "next/document"

const Document = () => {
	return (
		<Html className="h-full">
			<Head>
				<title>Orpheus</title>
			</Head>
			<body className="h-full">
                <Main/>
                <NextScript />
            </body>
		</Html>
	)
}

export default Document