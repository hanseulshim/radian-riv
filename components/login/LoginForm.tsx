import { useState } from 'react'
import Input from 'components/common/Input'
interface Props {
  showPasswordModal: () => void
  showRegisterModal: () => void
}

const LoginForm: React.FC<Props> = ({
  showPasswordModal,
  showRegisterModal
}) => {
  const [login, setLogin] = useState({ username: '', pwd: '' })

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Logged in!')
  }

  return (
    <div className="login-form form">
      <form onSubmit={onLogin}>
        <Input
          label="Login"
          value={login.username}
          onChange={e => setLogin({ ...login, username: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          value={login.pwd}
          onChange={e => setLogin({ ...login, pwd: e.target.value })}
        />
        <button className="btn btn-primary login-button" type="submit">
          Login
        </button>
      </form>
      <button className="btn btn-link" onClick={() => showPasswordModal()}>
        Forgot Password
      </button>
      <span>or</span>
      <button
        className="btn btn-secondary btn-small"
        onClick={showRegisterModal}
      >
        Register for free
      </button>
    </div>
  )
}

export default LoginForm
