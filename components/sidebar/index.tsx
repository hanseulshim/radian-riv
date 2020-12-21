import Link from 'next/link'
import { useRouter } from 'next/router'

const routes = [
  {
    label: 'My Account',
    link: '/profile',
    subroutes: [
      {
        label: 'Profile',
        link: ''
      },
      {
        label: 'Change Password',
        link: '/password'
      },
      {
        label: 'Change Security Questions',
        link: '/security-questions'
      },
      {
        label: 'Change Filter Defaults',
        link: '/filter-defaults'
      }
    ]
  }
]

export default function Sidebar() {
  const { pathname } = useRouter()
  const activeRoute = routes.find(
    route => pathname !== '/' && pathname.includes(route.link)
  )
  return (
    <div id="sidebar">
      {pathname !== '/' && (
        <Link href="/">
          <a className="go-back">
            <img
              src={`${process.env.baseUrl}/images/icon_arrow_left_white.svg`}
              alt="back"
            />
            <div>Back</div>
          </a>
        </Link>
      )}
      {pathname === '/' &&
        routes.map(route => (
          <Link href={route.link} key={route.label}>
            <a className="route-link">
              <span>{route.label}</span>
            </a>
          </Link>
        ))}
      {activeRoute && (
        <>
          <div className="route-link active">
            {activeRoute.label}
            <img
              src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
              className="label-icon"
            />
          </div>
          {activeRoute.subroutes.map(subroute => {
            const path = `${activeRoute.link}${subroute.link}`
            return (
              <Link href={path} key={subroute.label}>
                <a className="subroute-link">
                  <span>{subroute.label}</span>
                  {path === pathname && (
                    <img
                      src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                      className="label-icon"
                    />
                  )}
                </a>
              </Link>
            )
          })}
        </>
      )}
    </div>
  )
}
