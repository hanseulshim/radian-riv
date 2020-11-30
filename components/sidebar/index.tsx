import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const routes = [
  {
    label: 'My Account',
    link: '/my-account',
    subroutes: [
      {
        label: 'User Profile',
        link: '/user-profile'
      },
      {
        label: 'Change Password',
        link: '/change-password'
      },
      {
        label: 'Change Security Questions',
        link: '/change-security-questions'
      },
      {
        label: 'Change Filter Defaults',
        link: '/change-filter-defaults'
      }
    ]
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
                src={`${process.env.baseUrl}/images/icon_arrow_left_white.svg`}
                alt="back"
              />
              <span>Back</span>
            </a>
          </Link>
        </div>
      )}
      {routes.map(route => {
        const activeRoute = router.pathname.includes(route.link)
        return (
          <>
            <Link
              href={`${route.link}${
                route.subroutes ? route.subroutes[0].link : ''
              }`}
              key={route.label}
            >
              <a
                className={`
                route-link ${activeRoute && ' active'}
              `}
              >
                {route.label}
                {activeRoute && (
                  <img
                    src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                    className="label-icon"
                  />
                )}
              </a>
            </Link>
            {activeRoute &&
              route.subroutes.map(subroute => {
                return (
                  <Link
                    href={`${route.link}${subroute.link}`}
                    key={subroute.label}
                  >
                    <a
                      className={`subroute-link ${
                        router.pathname.includes(subroute.link) && ' active'
                      }`}
                    >
                      {router.pathname.includes(subroute.link) && (
                        <img
                          src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                          alt="logo"
                        />
                      )}

                      {subroute.label}
                    </a>
                  </Link>
                )
              })}
          </>
        )
      })}
    </div>
  )
}

export default Sidebar
