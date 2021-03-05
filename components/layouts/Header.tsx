import React from 'react'
import { useAuth } from 'context/auth/AuthProvider'
import ProfileMenu from 'components/common/ProfileMenu'

export default function Header() {
  const {
    auth: { user, token }
  } = useAuth()

  return (
    <div id="header">
      <img src={`${process.env.baseUrl}/images/header-logo.svg`} alt="logo" />
      <h5>Radian Interactive Value</h5>
      <div className="profile-row">
        {token && (
          <>
            <span>
              Hello {user.name_first} {user.name_last}
            </span>
            <ProfileMenu />
          </>
        )}
      </div>
    </div>
  )
}
