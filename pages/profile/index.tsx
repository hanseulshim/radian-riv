import { submitProfile } from 'api'
import { useAuth } from 'context/auth/AuthProvider'
import { useTrending } from 'context/TrendingProvider'
import CustomSelect from 'components/common/CustomSelect'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { validateForm, profileRoutes } from 'utils'
import Breadcrumbs from 'components/common/Breadcrumbs'

const defaultState = {
  name_first: '',
  name_last: '',
  title: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  phone_mobile: '',
  phone_home: ''
}

export default function Profile() {
  const {
    auth: { user },
    setAuth
  } = useAuth()
  const { stateList } = useTrending()
  const [profile, setProfile] = useState({
    name_first: '',
    name_last: '',
    title: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone_mobile: '',
    phone_home: ''
  })
  const [department, setDepartment] = useState('')
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState({
    label: user.state,
    value: user.state
  })

  useEffect(() => {
    setProfile({
      name_first: user.name_first === null ? '' : user.name_first,
      name_last: user.name_last === null ? '' : user.name_last,
      title: user.title === null ? '' : user.title,
      address: user.address === null ? '' : user.address,
      city: user.city === null ? '' : user.city,
      state: user.state === null ? '' : user.state,
      zip: user.zip === null ? '' : user.zip,
      phone_mobile: user.phone_mobile === null ? '' : user.phone_mobile,
      phone_home: user.phone_home === null ? '' : user.phone_home
    })
    setDepartment(user.department === null ? '' : user.department)
  }, [user])

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
          state: selectedState.label
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
    setStates(stateList.map(state => ({ ...state, label: state.value })))
  }, [stateList])

  return (
    <div id="main">
      <div className="content profile">
        <Breadcrumbs
          parentPath="/"
          routes={profileRoutes}
          label={'Account'}
          current={'User Profile'}
        />
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
                  value={department}
                  error={null}
                  disabled
                  onChange={() => {}}
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
            <button className="btn" type="submit">
              Update My Profile
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}
