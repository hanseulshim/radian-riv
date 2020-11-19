import React, { useState, useEffect, createContext, useContext } from 'react'
import Cookies from 'js-cookie'

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
  const [auth, setAuth] = useState<AuthType>(null)
  const [isLoading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
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
