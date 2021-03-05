import { defaultAuth, useAuth } from 'context/auth/AuthProvider'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

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
    <div className="flex items-center dropdown-container">
      <img
        id="profile-logo"
        className="w-6 h-6 ml-2 cursor-pointer"
        alt="profile"
        src={`${process.env.baseUrl}/images/profile.svg`}
        onClick={openMenu}
      />
      {showMenu && (
        <ul className="dropdown -left-105" style={{ width: 150 }}>
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
