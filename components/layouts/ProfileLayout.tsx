import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { profileRoutes } from 'utils'

interface Props {
  children: React.ReactNode
  label: string
  className: string
}

function ProfileLayout({ children, label, className }: Props) {
  return (
    <Sidebar routes={profileRoutes} label="Account" parentPath="/">
      <div className={`container ${className}`}>
        <Breadcrumbs current={label} />
        {children}
      </div>
    </Sidebar>
  )
}

export default withAuth(ProfileLayout)
