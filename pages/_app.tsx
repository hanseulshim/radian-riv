import Layout from 'components/layouts/Layout'
import { AuthProvider } from 'context/auth/AuthProvider'
import { TrendingProvider } from 'context/TrendingProvider'
import { OrderProvider } from 'context/OrderProvider'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import 'styles/index.scss'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TrendingProvider>
        <OrderProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </OrderProvider>
      </TrendingProvider>
    </AuthProvider>
  )
}

export default App
