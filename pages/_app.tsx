import Layout from 'components/layouts/Layout'
import { AuthProvider } from 'context/auth/AuthProvider'
import { TrendingProvider } from 'context/trending/TrendingProvider'
import { AppProps } from 'next/app'
import 'styles/index.scss'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TrendingProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TrendingProvider>
    </AuthProvider>
  )
}

export default App
