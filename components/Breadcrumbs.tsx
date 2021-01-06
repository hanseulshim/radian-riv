import React from 'react'
import Link from 'next/link'
type Props = {
  current: string
  parents?: {
    path: string
    name: string
  }[]
}
export default function Breadcrumbs({ current, parents = [] }: Props) {
  return (
    <div id="breadcrumbs">
      <Link href={'/'}>
        <a>Home</a>
      </Link>
      {parents.map(parent => (
        <React.Fragment key={parent.name}>
          <span>/</span>
          <Link href={parent.path}>
            <a>{parent.name}</a>
          </Link>
        </React.Fragment>
      ))}
      <div>
        <span>/</span>
        {current}
      </div>
    </div>
  )
}
