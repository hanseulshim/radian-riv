import * as React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from 'components/auth/AuthProvider'
import Sidebar from 'components/sidebar'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC = (props: Props) => {
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
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
