import * as React from 'react'
import { useAuth } from 'components/auth/AuthProvider'

const Header: React.FC = () => {
  const {
    auth: { user, token }
  } = useAuth()

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
            />
          </div>
        )}
      </div>
      <div className="header-spacer primary-background">
        <h2>Radian Interactive Value</h2>
        <h6 className="font-weight-normal">Need slogan to go here</h6>
      </div>
    </div>
  )
}

export default Header
