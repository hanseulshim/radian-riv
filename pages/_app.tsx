import Layout from 'components/Layout'
import { AuthProvider } from 'components/auth/AuthProvider'

import { AppProps } from 'next/app'
import 'styles/index.scss'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default App
