import * as React from 'react'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC = (props: Props) => {
  return (
    <div id="layout">
      <Header />
      <div id="main">{props.children}</div>
      <Footer />
    </div>
  )
}

export default Layout
