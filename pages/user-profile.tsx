import { withAuth } from 'components/auth/AuthRoute'

const UserProfile: React.FC = () => {
  return <div>User profile</div>
}

export default withAuth(UserProfile)
