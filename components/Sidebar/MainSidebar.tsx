import React, { useState } from 'react'
import Link from 'next/link'
import WebsiteSupport from './WebsiteSupport'

type Props = {
  children?: React.ReactNode
}

export default function MainSidebar({ children }: Props) {
  const routes = [
    {
      label: 'Home',
      value: 'Home',
      path: '/',
      parentPath: ''
    },
    {
      label: 'Trending',
      value: 'Trending',
      path: '/trending',
      parentPath: '/'
    },
    {
      label: 'Radian Interactive Value',
      value: 'Radian Interactive Value',
      path: '/value-products',
      parentPath: '/'
    }
  ]
  const [websiteSupport, setWebsiteSupport] = useState(false)

  return (
    <div id="main">
      <div className="bg-prussian-blue text-white w-300 flex flex-col justify-between">
        <div className="flex flex-col">
          {routes.map((route, index) => (
            <Link href={route.path} key={index}>
              <a
                className={`bg-sidebar-${index} py-6 px-8 relative font-bold hover:underline route-link`}
              >
                {route.label === 'Home' && (
                  <img
                    src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                    className="absolute left-3 top-8"
                  />
                )}
                <span>{route.label}</span>
              </a>
            </Link>
          ))}
        </div>
        <div className="flex justify-between text-xs py-6 px-14">
          <a target="_blank" href={`${process.env.baseUrl}/Faq.pdf`}>
            Help Doc
          </a>
          <div className="font-bold">|</div>
          <a onClick={() => setWebsiteSupport(true)}>Website Support</a>
        </div>
      </div>
      {children}
      {websiteSupport && (
        <WebsiteSupport closeModal={() => setWebsiteSupport(false)} />
      )}
    </div>
  )
}
