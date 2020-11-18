import { withoutAuth } from 'components/auth/AuthRoute'

const Login: React.FC = () => {
  return <p>Login</p>
}

export default withoutAuth(Login)
