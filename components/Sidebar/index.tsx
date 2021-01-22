import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Route } from 'utils/routes'
import WebsiteSupport from './WebsiteSupport'

type Props = {
  children?: React.ReactNode
  label?: string
  parentPath?: string
  routes?: Route[]
  parent?: boolean
}

export default function Sidebar({
  children,
  label = '',
  parentPath = '',
  routes = [],
  parent = false
}: Props) {
  const [websiteSupport, setWebsiteSupport] = useState(false)
  const toggleWebsiteSupport = () => {
    setWebsiteSupport(!websiteSupport)
  }
  const { asPath } = useRouter()
  const activeIndex = routes.findIndex(route => route.path === asPath)
  return (
    <div id="main">
      <div id="sidebar">
        <div className="side-bar-content">
          {!parent && (
            <>
              <Link href={parentPath}>
                <a className="go-back">
                  <img
                    src={`${process.env.baseUrl}/images/icon_arrow_left_white.svg`}
                    alt="back"
                  />
                  Back
                </a>
              </Link>
              <div className="route-link active">
                {label}
                <img
                  src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                  className="label-icon"
                />
              </div>
            </>
          )}
          <div className="route-container">
            {routes.map((route, index) => (
              <Link href={route.path} key={index}>
                <a className={`${parent ? `route-${index} ` : ''}route-link`}>
                  {activeIndex === index && (
                    <img
                      src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                      className="label-icon"
                    />
                  )}
                  <span>{route.label}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="sidebar-footer">
          <a target="_blank" href={`${process.env.baseUrl}/Faq.pdf`}>
            Help Doc
          </a>
          <div style={{ fontWeight: 'bold' }}>|</div>
          <a onClick={toggleWebsiteSupport}>Website Support</a>
        </div>
      </div>
      {children}
      {websiteSupport && <WebsiteSupport closeModal={toggleWebsiteSupport} />}
    </div>
  )
}
