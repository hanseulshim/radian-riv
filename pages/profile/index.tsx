import React, { useState } from 'react'
import { withAuth } from 'components/auth/AuthRoute'
import Input from 'components/common/Input'
import { validateForm } from 'utils/validation'
import { submitProfile } from 'utils/api'
import Cookies from 'js-cookie'
import { useAuth, defaultAuth } from 'components/auth/AuthProvider'

const Profile: React.FC = () => {
  const {
    auth: { user },
    setAuth
  } = useAuth()
  const [profile, setProfile] = useState({ ...user })
  const [error, setError] = useState({ ...defaultAuth.user })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setProfile({ ...profile, [key]: e.target.value })
  }

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    const errorCopy = { ...defaultAuth.user }
    const errorObj = validateForm(profile)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const message = submitProfile(profile)
        setSuccessMessage(message)
        const authCookies = Cookies.get('auth')
        setAuth(JSON.parse(authCookies))
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    setError(errorCopy)
  }

  return (
    <div className="container profile">
      <h1>Profile</h1>
      <div className="info-container">
        <div>
          <span className="bold">Username:</span>
          <span>{profile.username}</span>
        </div>
        <div>
          <span className="bold">Email:</span>
          <span>{profile.email}</span>
        </div>
      </div>
      <div className="form">
        <form onSubmit={e => onUpdate(e)}>
          <div className="form-row">
            <div className="form-group">
              <Input
                label="First Name"
                value={profile.name_first}
                error={error.name_first}
                onChange={e => handleInput(e, 'name_first')}
              />
              <Input
                label="Last Name"
                value={profile.name_last}
                error={error.name_last}
                onChange={e => handleInput(e, 'name_last')}
              />
              <Input
                label="Title"
                value={profile.title}
                error={error.title}
                onChange={e => handleInput(e, 'title')}
              />
            </div>
            <div className="form-group">
              <Input
                label="Address"
                value={profile.address}
                error={error.address}
                onChange={e => handleInput(e, 'address')}
              />
              <Input
                label="City"
                value={profile.city}
                error={error.city}
                onChange={e => handleInput(e, 'city')}
              />
              <div className="form-row">
                <Input
                  label="State"
                  value={profile.state}
                  error={error.state}
                  onChange={e => handleInput(e, 'state')}
                />
                <Input
                  label="Zip"
                  value={profile.zip}
                  error={error.zip}
                  onChange={e => handleInput(e, 'zip')}
                />
              </div>
            </div>
            <div className="form-group">
              <Input
                label="Department"
                value={profile.clientcode}
                error={error.clientcode}
                onChange={e => handleInput(e, 'clientcode')}
              />
              <Input
                label="Cell Phone"
                value={profile.phone_mobile}
                error={error.phone_mobile}
                onChange={e => handleInput(e, 'phone_mobile')}
              />
              <Input
                label="Home Phone"
                value={profile.phone_home}
                error={error.phone_home}
                onChange={e => handleInput(e, 'phone_home')}
              />
            </div>
          </div>
          <span
            className={successMessage ? 'success-message' : 'error-message'}
          >
            {successMessage || errorMessage}
          </span>
          <button className="btn btn-primary" type="submit">
            Update My Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default withAuth(Profile)
