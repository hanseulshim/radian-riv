import { submitChangePassword } from 'api'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import ProfileLayout from 'components/layouts/ProfileLayout'
import { useState } from 'react'
import { validateForm } from 'utils'

const defaultState = {
  pwd: '',
  confirmPwd: ''
}

export default function ChangePassword() {
  const [changePassword, setChangePassword] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)
  const [pwdStrength, setPwdStrength] = useState('Password not entered')
  const [pwdClass, setPwdClass] = useState('strength-0')

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    const pwd = e.target.value
    let strength = 0
    let label = 'Password not entered'
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setChangePassword({ ...changePassword, [key]: e.target.value })

    if (key === 'pwd') {
      if (pwd.length >= 8) {
        strength++
      }
      if (/[A-Z]/.test(pwd)) {
        strength++
      }
      if (/[a-z]/.test(pwd)) {
        strength++
      }
      if (/[0-9]/.test(pwd)) {
        strength++
      }
      if (/[!@#$]/.test(pwd)) {
        strength++
      }

      switch (strength) {
        case 1:
          label = 'Very Weak'
          break
        case 2:
          label = 'Weak'
          break
        case 3:
          label = 'Better'
          break
        case 4:
          label = 'Medium'
          break
        case 5:
          label = 'Strong'
          break
      }

      setPwdStrength(label)
      setPwdClass(`strength-${strength}`)
    }
  }

  const onUpdate = async () => {
    setAlert(null)
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(changePassword)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const message = await submitChangePassword(changePassword.pwd)
        setAlert({ type: 'success', message })
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    setError(errorCopy)
  }

  return (
    <ProfileLayout label="Change Password" className="change-password">
      <h1>Change Password</h1>
      <div className="form">
        <Form id="change-password" onSubmit={onUpdate} alert={alert}>
          <div className="form-group">
            <Input
              label="New Password"
              type="password"
              value={changePassword.pwd}
              error={error.pwd}
              onChange={e => handleInput(e, 'pwd')}
            />
            <span className="pwd-label">Password Strength:</span>
            <div className={`${pwdClass} pwd-strength`}>{pwdStrength}</div>
            <Input
              label="Confirm Password"
              type="password"
              value={changePassword.confirmPwd}
              error={error.confirmPwd}
              onChange={e => handleInput(e, 'confirmPwd')}
            />
          </div>
          <button className="btn" type="submit">
            Confirm Password
          </button>
        </Form>

        <div className="password-requirements">
          <h3>Password Requirements:</h3>
          <div>* Password must be at least 8 characters(s) long</div>
          <div>* Password must contain an uppercase character</div>
          <div>* Password must contain a lowercase character</div>
          <div>* Password must contain a numeric character</div>
          <div>* Password must contain a special character (ex: !,@,#,$)</div>
          <div>
            * Password must NOT have been used within the last 25 passwords
          </div>
        </div>
      </div>
    </ProfileLayout>
  )
}
