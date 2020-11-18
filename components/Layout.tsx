import * as React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC = (props: Props) => {
  return (
    <div id="layout">
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${process.env.baseUrl}/favicon.ico`}
        />
      </Head>
      <Header />
      <div id="main">{props.children}</div>
      <Footer />
    </div>
  )
}

export default Layout
