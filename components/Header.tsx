import * as React from 'react'
import { useAuth, defaultAuth } from 'components/auth/AuthProvider'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const Header: React.FC = () => {
  const router = useRouter()
  const {
    auth: { user, token },
    setAuth
  } = useAuth()

  const logout = () => {
    Cookies.remove('auth')
    setAuth(defaultAuth)
    router.push('/login')
  }

  return (
    <div id="header">
      <div className="header-spacer header-row">
        <img src={`${process.env.baseUrl}/images/header-logo.svg`} alt="logo" />
        {token && (
          <div className="profile-row">
            <span>
              Hello {user.name_first} {user.name_last}
            </span>
            <img
              id="profile"
              alt="profile"
              src={`${process.env.baseUrl}/images/profile.svg`}
              onClick={logout}
            />
          </div>
        )}
      </div>
      <div className="header-spacer primary-background">
        <h2>Radian Interactive Value</h2>
      </div>
    </div>
  )
}

export default Header
