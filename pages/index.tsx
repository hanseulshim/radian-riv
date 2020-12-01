import { withAuth } from 'components/auth/AuthRoute'

const Main: React.FC = () => {
  return (
    <div className="container">
      <div>Welcome to Red Bell Real Estate!</div>
    </div>
  )
}

export default withAuth(Main)
