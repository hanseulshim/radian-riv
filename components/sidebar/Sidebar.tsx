import Link from 'next/link'
import { useRouter } from 'next/router'
import routes from 'utils/routes'

type Props = {
  group: string
}

export default function Sidebar({ group }: Props) {
  const { pathname } = useRouter()
  const parent = group === 'root'
  const filteredRoutes = routes.filter(route => route.group === group)
  const activeRoute = filteredRoutes.find(route => route.path === pathname)
  const parentRoute = routes.find(route => route.id === activeRoute.parentId)
  return (
    <div id="sidebar">
      <div className="side-bar-content">
        {!parent && (
          <>
            <Link href={parentRoute.path}>
              <a className="go-back">
                <img
                  src={`${process.env.baseUrl}/images/icon_arrow_left_white.svg`}
                  alt="back"
                />
                Back
              </a>
            </Link>
            <div className="route-link active">
              {group}
              <img
                src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                className="label-icon"
              />
            </div>
          </>
        )}
        <div className="route-container">
          {filteredRoutes.map((route, index) => (
            <Link href={route.path} key={route.id}>
              <a className={`${parent ? `route-${index} ` : ''}route-link`}>
                {activeRoute.id === route.id && (
                  <img
                    src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                    className="label-icon"
                  />
                )}
                <span>{route.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebar-footer">
        <a>Help Doc</a>
        <div style={{ fontWeight: 'bold' }}>|</div>
        <a>Website Support</a>
      </div>
    </div>
  )
}
