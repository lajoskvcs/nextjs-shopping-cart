import type { AppProps } from 'next/app'

import '../global.css'
import { AppContextProvider } from '@/store'
import Layout from '@/components/Layout'

const QogitaApp = ({Component, pageProps}: AppProps): JSX.Element => (
	<AppContextProvider>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</AppContextProvider>
)

export default QogitaApp
