import React, { useEffect, useState } from 'react'
import { withAuth } from 'components/auth/AuthRoute'
import Input from 'components/common/Input'
import { validateForm } from 'utils/validation'
import { submitProfile, getStates } from 'api'
import Cookies from 'js-cookie'
import { useAuth } from 'components/auth/AuthProvider'
import Select from 'components/common/Select'

interface State {
  label: string
  value: string
}

const defaultState = {
  name_first: '',
  name_last: '',
  title: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  department: '',
  phone_mobile: '',
  phone_home: ''
}

const Profile: React.FC = () => {
  const {
    auth: { user },
    setAuth
  } = useAuth()
  const [profile, setProfile] = useState({
    name_first: user.name_first,
    name_last: user.name_last,
    title: user.title,
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zip,
    department: user.department,
    phone_mobile: user.phone_mobile,
    phone_home: user.phone_home
  })
  const [error, setError] = useState({ ...defaultState })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [states, setStates] = useState<State[]>([])
  const [selectedState, setSelectedState] = useState({
    label: user.state,
    value: user.state
  })

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setProfile({ ...profile, [key]: e.target.value })
  }

  const onUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(profile)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const message = await submitProfile({
          ...profile,
          state: selectedState.label,
          userid_ssid: user.userid_ssid
        })
        setSuccessMessage(message)
        const authCookies = Cookies.get('auth')
        setAuth(JSON.parse(authCookies))
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    setError(errorCopy)
  }

  useEffect(() => {
    const stateFetch = async () => {
      const states = await getStates()
      setStates(states.map(state => ({ label: state.code, value: state.code })))
    }
    stateFetch()
  }, [])

  return (
    <div className="container profile">
      <h1>Profile</h1>
      <div className="info-container">
        <div>
          <span className="bold">Username:</span>
          <span>{user.username}</span>
        </div>
        <div>
          <span className="bold">Email:</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="form">
        <form onSubmit={onUpdate}>
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
                <div className="select-container">
                  <Select
                    label="State"
                    options={states}
                    value={selectedState}
                    onChange={state => setSelectedState(state)}
                  />
                </div>
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
                value={profile.department}
                error={error.department}
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
