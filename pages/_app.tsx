import { AppProps } from 'next/app'
import 'styles/index.scss'
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
