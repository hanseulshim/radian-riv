import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
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
      {children}
      <Footer />
    </div>
  )
}
