import { withAuth } from 'components/auth/AuthRoute'

const Main: React.FC = () => {
  return <div>Welcome to Red Bell Real Estate!</div>
}

export default withAuth(Main)
