import { useState } from 'react'
import Input from 'components/common/Input'
import { validateForm } from 'utils/validation'
import { submitLogin } from 'api'
import Form from 'components/common/Form'

interface Props {
  showPasswordModal: () => void
  showRegisterModal: () => void
}

const defaultState = { username: '', pwd: '' }

export default function LoginForm({
  showPasswordModal,
  showRegisterModal
}: Props) {
  const [login, setLogin] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)

  const onLogin = async () => {
    setAlert(null)
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(login)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        await submitLogin(login)
        window.location.href = `${process.env.rootUrl}`
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
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
      <Form id="login" onSubmit={onLogin} alert={alert}>
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
      </Form>
      <button
        id="reset-password-button"
        className="btn btn-link"
        onClick={() => showPasswordModal()}
      >
        Reset Your Password
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
