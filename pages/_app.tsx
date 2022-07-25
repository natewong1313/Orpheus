import React from "react"
import type { AppProps } from "next/app"
import "@/styles/globals.css"
import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextNProgress
				color="#0ea5e9"
				startPosition={0.4}
				stopDelayMs={100}
				height={3}
				showOnShallow={true}
				nonce={undefined}
				options={{ showSpinner: false }}
			/>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp