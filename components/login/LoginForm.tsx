import { useState } from 'react'
import Input from 'components/common/Input'
import { validateForm } from 'utils/validation'

interface Props {
  showPasswordModal: () => void
  showRegisterModal: () => void
}

const defaultState = { username: '', pwd: '' }

const LoginForm: React.FC<Props> = ({
  showPasswordModal,
  showRegisterModal
}) => {
  const [login, setLogin] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(login)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      alert('Logged in!')
    }
    setError(errorCopy)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setLogin({ ...login, [key]: e.target.value })
  }

  return (
    <div className="login-form form">
      <form onSubmit={onLogin}>
        <Input
          label="Username"
          value={login.username}
          error={error.username}
          onChange={e => handleInput(e, 'username')}
        />
        <Input
          label="Password"
          type="password"
          value={login.pwd}
          error={error.pwd}
          onChange={e => handleInput(e, 'pwd')}
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
