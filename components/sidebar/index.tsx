import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const routes = [
  {
    label: 'User Profile',
    link: '/user-profile'
  }
]

const Sidebar: React.FC = () => {
  const router = useRouter()
  return (
    <div id="sidebar">
      {router.pathname !== '/' && (
        <div className="go-back">
          <Link href="/">
            <a>
              <img
                src={`${process.env.baseUrl}/images/icon_arrow_left.svg`}
                alt="back"
              />
              <span>Back</span>
            </a>
          </Link>
        </div>
      )}
      {routes.map(route => {
        return (
          <Link href={route.link} key={route.label}>
            <a
              className={`
                route-link ${router.pathname === route.link ? ' active' : ''}
              `}
            >
              {route.label}
              {router.pathname === route.link && (
                <img
                  src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                  className="label-icon"
                />
              )}
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
