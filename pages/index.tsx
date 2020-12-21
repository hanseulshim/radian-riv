import { withAuth } from 'components/auth/AuthRoute'

function Main() {
  return (
    <div className="container">
      <div>Welcome to Red Bell Real Estate!</div>
    </div>
  )
}

export default withAuth(Main)
