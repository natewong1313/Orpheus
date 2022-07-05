import type { AppProps } from "next/app"
import "@/styles/globals.css"
import Layout from "@/components/global/Layout"
import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<NextNProgress
				color="#0ea5e9"
				startPosition={0.4}
				stopDelayMs={100}
				height={2}
				showOnShallow={true}
				nonce={undefined}
				options={{ showSpinner: false }}
			/>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
