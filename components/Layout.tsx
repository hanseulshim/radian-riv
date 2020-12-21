import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from 'components/auth/AuthProvider'
import Sidebar from 'components/sidebar'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const {
    auth: { token }
  } = useAuth()

  return (
    <div id="layout">
      <Head>
        <title>Radian RIV</title>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${process.env.baseUrl}/favicon.ico`}
        />
      </Head>
      <Header />
      <div id="main">
        {token && <Sidebar />}
        {children}
      </div>
      <Footer />
    </div>
  )
}
