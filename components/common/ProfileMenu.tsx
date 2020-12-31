import { useAuth, defaultAuth } from 'components/auth/AuthProvider'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useState, useEffect, useCallback } from 'react'

export default function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false)
  const { setAuth } = useAuth()
  const router = useRouter()

  const handleClick = useCallback(() => {
    setShowMenu(false)
  }, [setShowMenu])

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', handleClick)
    } else {
      document.removeEventListener('click', handleClick)
    }
  }, [showMenu])

  const logout = () => {
    Cookies.remove('auth')
    setAuth(defaultAuth)
    router.push('/login')
  }
  const openMenu = () => {
    setShowMenu(true)
  }

  return (
    <div className="profile-menu">
      <img
        id="profile-logo"
        alt="profile"
        src={`${process.env.baseUrl}/images/profile.svg`}
        onClick={openMenu}
      />
      {showMenu && (
        <ul className="menu-container">
          <Link href="/profile">
            <a>
              <li>Account</li>
            </a>
          </Link>
          <li>Help</li>
          <li onClick={logout}>Logout</li>
        </ul>
      )}
    </div>
  )
}
