import React from 'react'
import Cookies from 'js-cookie'
import { NextPageContext } from 'next'
import { redirectToLogin } from 'utils/redirect'

interface User {
  user: {
    userid_ssid: string
    roleid: number
    clientcode: string
    departmentid: number
    username: string
    email: string
    name_last: string
    name_first: string
    address: string
    city: string
    state: string
    zip: string
    phone_home: string
    phone_mobile: string
    title: string
  }
  token: string
  redirect: string
  status: number
  message: string
}

interface Props {
  user?: User
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
const privateRoute = (WrappedComponent: any) => {
  return class Page extends React.Component<Props> {
    static async getInitialProps(ctx: NextPageContext) {
      const user = Cookies.get('user')
      if (!user) {
        redirectToLogin(ctx.res)
      }

      return { user }
    }

    render() {
      const { user, ...rest } = this.props
      return <WrappedComponent user={user} {...rest} />
    }
  }
}

export default privateRoute
