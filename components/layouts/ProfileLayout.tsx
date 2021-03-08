import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import { profileRoutes } from 'utils'

interface Props {
  children: React.ReactNode
  label: string
  className: string
}

function ProfileLayout({ children, label, className }: Props) {
  return (
    <div id="main">
      <div className={`content ${className}`}>
        <Breadcrumbs
          parentPath="/profile"
          parents={[{ path: '/profile', name: 'User Profile' }]}
          routes={profileRoutes}
          label={'Account'}
          current={label}
        />
        {children}
      </div>
    </div>
  )
}

export default withAuth(ProfileLayout)
