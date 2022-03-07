import type { AppProps } from 'next/app'

import '../global.css'
import { AppContextProvider } from '@/store'

const QogitaApp = ({Component, pageProps}: AppProps): JSX.Element => (
	<AppContextProvider>
		<Component {...pageProps} />
	</AppContextProvider>
)

export default QogitaApp
