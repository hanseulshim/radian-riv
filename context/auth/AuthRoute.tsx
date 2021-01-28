import React from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useAuth } from './AuthProvider'

const withAuthRedirect = <CP, IP = CP>({
  WrappedComponent,
  expectedAuth,
  location
}: {
  WrappedComponent: NextPage<CP, IP>
  expectedAuth: boolean
  location: string
}): NextPage<CP, IP> => {
  const WithAuthRedirectWrapper: NextPage<CP, IP> = props => {
    const router = useRouter()
    const { isLoading, auth } = useAuth()
    if (isLoading) {
      return <p>Loading...</p>
    }
    if (typeof window !== 'undefined' && expectedAuth !== !!auth.token) {
      router.push(location)
      return <></>
    }
    return <WrappedComponent {...props} />
  }

  return WithAuthRedirectWrapper
}

export function withAuth<P>(
  WrappedComponent: NextPage<P>,
  location = '/login'
): NextPage<P> {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true
  })
}

export function withoutAuth<P>(
  WrappedComponent: NextPage<P>,
  location = '/'
): NextPage<P> {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: false
  })
}
