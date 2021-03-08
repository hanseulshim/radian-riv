import React, { useState } from 'react'
import WebsiteSupport from './WebsiteSupport'
import Link from 'next/link'
import { Route } from 'utils/routes'
import { useRouter } from 'next/router'

interface Props {
  parentPath: string
  xPosition: number
  toggleMenu: () => void
  label: string
  routes: Route[]
}

export default function SidebarNew({
  label,
  parentPath,
  xPosition,
  toggleMenu,
  routes
}: Props) {
  const [websiteSupport, setWebsiteSupport] = useState(false)
  const { asPath } = useRouter()
  const activeIndex = routes.findIndex(route => route.path === asPath)
  return (
    <div
      className="flex flex-col justify-between bg-prussian-blue text-white absolute h-full top-0 left-0 w-300 z-50 duration-500"
      style={{ transform: `translatex(${xPosition}px)` }}
    >
      <div className="flex justify-between py-6 px-10">
        <Link href={parentPath}>
          <a className="flex">
            <img
              className="mr-2"
              src={`${process.env.baseUrl}/images/icon_arrow_left_white.svg`}
              alt="back"
            />
            <span className="text-sm">Back</span>
          </a>
        </Link>
        <img
          className="cursor-pointer"
          onClick={toggleMenu}
          src={`${process.env.baseUrl}/images/close_sidebar.svg`}
          alt="back"
        />
      </div>
      <div className="px-10 font-bold">
        {label}
        <div className="mt-4 w-200 -ml-10 relative border border-robins-egg">
          <img
            src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
            className="absolute -right-1 -top-1.5"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-auto">
        {routes.map((route, index) => (
          <Link href={route.path} key={index}>
            <a className="route-link px-10 py-6 relative hover:underline">
              {activeIndex === index && (
                <img
                  src={`${process.env.baseUrl}/images/nav_circle_icon.svg`}
                  className="absolute top-7 left-4"
                />
              )}
              <span className="font-bold">{route.label}</span>
            </a>
          </Link>
        ))}
      </div>
      <div className="flex justify-center text-xs py-4 space-x-4">
        <a target="_blank" href={`${process.env.baseUrl}/Faq.pdf`}>
          Help Doc
        </a>
        <div style={{ fontWeight: 'bold' }}>|</div>
        <a onClick={() => setWebsiteSupport(true)}>Website Support</a>
      </div>
      {websiteSupport && (
        <WebsiteSupport closeModal={() => setWebsiteSupport(false)} />
      )}
    </div>
  )
}
