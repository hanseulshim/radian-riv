import { useState } from 'react'
import Input from 'components/common/Input'
import { validateForm } from 'utils/validation'
import { submitResetPassword } from 'utils/api'

interface Props {
  closeModal: () => void
}

const defaultState = {
  username: '',
  email: ''
}

const ResetPassword: React.FC<Props> = ({ closeModal }) => {
  const [resetPassword, setResetPassword] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(resetPassword)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const message = submitResetPassword(resetPassword)
        setSuccessMessage(message)
        setTimeout(() => {
          closeModal()
        }, 3000)
      } catch (e) {
        setErrorMessage(e.message)
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
    setResetPassword({ ...resetPassword, [key]: e.target.value })
  }

  return (
    <div className="reset-password modal-container">
      <div className="form">
        <h3 className="form-title">Reset Password</h3>
        <img
          src={`${process.env.baseUrl}/images/icon_x.svg`}
          className={'close-form'}
          onClick={closeModal}
        />
        <form onSubmit={e => onReset(e)}>
          <Input
            label="User Name"
            value={resetPassword.username}
            error={error.username}
            onChange={e => handleInput(e, 'username')}
            required
          />
          <Input
            label="Email on file"
            value={resetPassword.email}
            error={error.email}
            onChange={e => handleInput(e, 'email')}
            required
          />
          <span
            className={successMessage ? 'success-message' : 'error-message'}
          >
            {successMessage || errorMessage}
          </span>
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
          <p className="info">
            For security purposes you are required to reset your password every
            120 days.
          </p>
          <p className="info">
            If you do not receive an email with instructions on how to reset
            your password, please send an email to{' '}
            <a href="mailto:vow@redbellre.com">vow@redbellre.com</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
