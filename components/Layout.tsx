import * as React from 'react'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC = (props: Props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
