import React, { useState } from 'react'
import Link from 'next/link'
import Sidebar from 'components/Sidebar'
import { Route } from 'utils/routes'

type Props = {
  label: string
  current: string
  parentPath: string
  parents?: {
    path: string
    name: string
  }[]
  routes: Route[]
}
export default function Breadcrumbs({
  current,
  label,
  parentPath,
  parents = [],
  routes = []
}: Props) {
  const width = 310
  const [xPosition, setX] = useState<number>(-width)

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0)
    } else {
      setX(-width)
    }
  }

  return (
    <>
      <div className="flex mb-4 space-x-2">
        <img
          id="sidebar"
          className="mr-4 cursor-pointer"
          alt="hamburger"
          src={`${process.env.baseUrl}/images/hamburger.svg`}
          onClick={toggleMenu}
        />
        <Link href={'/'}>
          <a className="underline text-patina">Home</a>
        </Link>
        {parents.map(({ name, path }) => (
          <React.Fragment key={name}>
            <span>/</span>
            <Link href={path}>
              <a className="underline text-patina">{name}</a>
            </Link>
          </React.Fragment>
        ))}
        <span>/</span>
        <span>{current}</span>
      </div>
      <Sidebar
        routes={routes}
        label={label}
        parentPath={parentPath}
        xPosition={xPosition}
        toggleMenu={toggleMenu}
      />
    </>
  )
}
