import React, { useState, useEffect, createContext, useContext } from 'react'
import Cookies from 'js-cookie'

const testAuth = {
  user: {
    userid_ssid: '16252-5',
    roleid: 0,
    clientcode: 'string',
    departmentid: 0,
    username: 'string',
    email: 'string',
    name_last: 'Doe',
    name_first: 'John',
    address: 'string',
    city: 'string',
    state: 'string',
    zip: 'string',
    phone_home: '215-555-1872',
    phone_mobile: '484-555-0980',
    title: 'string'
  },
  token: 'bcf62b2c-c739-42aa-958d-7a9930ca7fff',
  redirect: 'string',
  status: 0,
  message: 'string'
}

const defaultAuth = {
  user: {
    userid_ssid: '',
    roleid: 0,
    clientcode: '',
    departmentid: 0,
    username: '',
    email: '',
    name_last: '',
    name_first: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone_home: '',
    phone_mobile: '',
    title: ''
  },
  token: '',
  redirect: '',
  status: 0,
  message: ''
}

type AuthType = {
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
type AuthContextType = {
  auth: AuthType
  isLoading: boolean
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuth: () => {}
})

export const AuthProvider = ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [auth, setAuth] = useState<AuthType>(defaultAuth)
  const [isLoading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      if (process.env.auth) {
        Cookies.set('auth', testAuth)
      } else {
        Cookies.remove('auth')
      }
      const authCookies = Cookies.get('auth')
      if (authCookies) {
        setAuth(JSON.parse(authCookies))
      }
      setLoading(false)
    }
    initializeAuth()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
