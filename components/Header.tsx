import { useAuth } from 'context/auth/AuthProvider'
import ProfileMenu from 'components/common/ProfileMenu'

export default function Header() {
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
            <ProfileMenu />
          </div>
        )}
      </div>
      <div className="header-spacer primary-background">
        <h2>Radian Interactive Value</h2>
      </div>
    </div>
  )
}
