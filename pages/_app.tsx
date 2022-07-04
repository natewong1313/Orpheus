import type { AppProps } from "next/app"
import "@/styles/globals.css"
import Layout from "@/components/global/Layout"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
