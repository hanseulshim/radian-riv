import Layout from 'components/Layout'
import { AppProps } from 'next/app'
import 'styles/index.scss'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
