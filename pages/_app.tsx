import Layout from 'components/layouts/Layout'
import { AuthProvider } from 'context/auth/AuthProvider'
import { TrendingProvider } from 'context/TrendingProvider'
import { ValueProductProvider } from 'context/ValueProductProvider'
import { AppProps } from 'next/app'
import 'styles/index.scss'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TrendingProvider>
        <ValueProductProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ValueProductProvider>
      </TrendingProvider>
    </AuthProvider>
  )
}

export default App
