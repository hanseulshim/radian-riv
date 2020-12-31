import Sidebar from './Sidebar'

type Props = {
  children?: React.ReactNode
  group?: string
}

export default function SidebarLayout({ children, group = 'root' }: Props) {
  return (
    <div id="main">
      <Sidebar group={group} />
      {children}
    </div>
  )
}
