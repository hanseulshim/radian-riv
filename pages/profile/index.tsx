import { getStates, submitProfile } from 'api'
import { useAuth } from 'context/auth/AuthProvider'
import CustomSelect from 'components/common/CustomSelect'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import ProfileLayout from 'components/layouts/ProfileLayout'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { validateForm } from 'utils'

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

export default function Profile() {
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
  const [alert, setAlert] = useState(null)
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

  const onUpdate = async () => {
    setAlert(null)
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
        setAlert({ type: 'success', message })
        const authCookies = Cookies.get('auth')
        setAuth(JSON.parse(authCookies))
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    setError(errorCopy)
  }

  useEffect(() => {
    const stateFetch = async () => {
      //TODO: Add try/catch
      const states = await getStates()
      setStates(states.map(state => ({ ...state, label: state.value })))
    }
    stateFetch()
  }, [])

  return (
    <ProfileLayout label="User Profile" className="profile">
      <h1>User Profile</h1>
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
        <Form id="profile" onSubmit={onUpdate} alert={alert}>
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
                  <CustomSelect
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
          <button className="btn btn-primary" type="submit">
            Update My Profile
          </button>
        </Form>
      </div>
    </ProfileLayout>
  )
}
