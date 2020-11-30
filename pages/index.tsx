import { withAuth } from 'components/auth/AuthRoute'
import Link from 'next/link'

const Main: React.FC = () => {
  return (
    <div>
      <div>Welcome to Red Bell Real Estate!</div>
      <Link href="/profile">Profile</Link>
    </div>
  )
}

export default withAuth(Main)
