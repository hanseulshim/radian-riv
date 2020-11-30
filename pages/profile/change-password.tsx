import React, { useState } from 'react'
import { withAuth } from 'components/auth/AuthRoute'
import Input from 'components/common/Input'
import { validateForm } from 'utils/validation'
import { submitProfile } from 'utils/api'

const defaultState = {
  pwd: '',
  confirmPwd: ''
}

const ChangePassword: React.FC = () => {
  const [changePassword, setChangePassword] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setChangePassword({ ...changePassword, [key]: e.target.value })
  }

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(changePassword)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        console.log('done')
        // const message = submitProfile(changePassword)
        // setSuccessMessage(message)
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    setError(errorCopy)
  }

  return (
    <div className="container change-password">
      <h1>Change Password</h1>
      <div className="form">
        <form onSubmit={e => onUpdate(e)}>
          <div className="form-group">
            <Input
              label="New Password"
              value={changePassword.pwd}
              error={error.pwd}
              onChange={e => handleInput(e, 'pwd')}
            />
            <Input
              label="Confirm Password"
              value={changePassword.confirmPwd}
              error={error.confirmPwd}
              onChange={e => handleInput(e, 'confirmPwd')}
            />
          </div>
          <span
            className={successMessage ? 'success-message' : 'error-message'}
          >
            {successMessage || errorMessage}
          </span>
          <button className="btn btn-primary" type="submit">
            Confirm Password
          </button>
        </form>
        <div className="password-requirements">
          <h3>Password Requirements:</h3>
          <div>**Password must be at least 8 characters(s) long</div>
          <div>**Password must contain an uppercase character</div>
          <div>**Password must contain an lowercase character</div>
          <div>**Password must contain a numeric character</div>
          <div>
            **Password must contain a special character (example: !,@,#,$)
          </div>
          <div>**New password and confirm password must match</div>
          <div>
            **Password must NOT have been used within the last 25 passwords
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(ChangePassword)
