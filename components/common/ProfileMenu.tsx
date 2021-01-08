import { defaultAuth, useAuth } from 'components/auth/AuthProvider'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function ProfileMenu() {
  const isCancelled = useRef(false)
  const [showMenu, setShowMenu] = useState(false)
  const { setAuth } = useAuth()

  const handleClick = useCallback(() => {
    if (!isCancelled.current) {
      setShowMenu(false)
    }
  }, [setShowMenu])

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', handleClick)
    } else {
      document.removeEventListener('click', handleClick)
    }
  }, [showMenu])

  useEffect(() => {
    return () => {
      isCancelled.current = true
    }
  }, [])

  const logout = () => {
    Cookies.remove('auth')
    setAuth(defaultAuth)
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
