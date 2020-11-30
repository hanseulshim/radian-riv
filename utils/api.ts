import { AuthType } from 'components/auth/AuthProvider'
import Cookies from 'js-cookie'

//TODO #7 remove once API is set in place
const testAuth = {
  user: {
    userid_ssid: '16252-5',
    roleid: 0,
    clientcode: 'client',
    departmentid: 0,
    username: 'kingalls@boostlabs.com',
    email: 'kingalls@boostlabs.com',
    name_last: 'Ingalls',
    name_middle: 'Nivek',
    name_first: 'Kevin',
    address: '123 Fake Street',
    city: 'Atlanta',
    state: 'GA',
    zip: '55555',
    phone_home: '215-555-1872',
    phone_mobile: '484-555-0980',
    phone_office: '123-555-0980',
    phone_fax: '242-555-0980',
    title: 'AVE User'
  },
  token: 'bcf62b2c-c739-42aa-958d-7a9930ca7fff',
  redirect: 'string',
  status: 0,
  message: 'string'
}

interface Login {
  username: string
  pwd: string
}
export const submitLogin = (form: Login): AuthType => {
  if (form.username !== 'test') {
    throw new Error('Username is not valid')
  } else if (form.pwd !== 'test') {
    throw new Error('Password is not valid')
  }

  return testAuth
}

interface ResetPassword {
  username: string
  email: string
}

export const submitResetPassword = (form: ResetPassword): string => {
  if (form.username === 'error') {
    throw new Error('Error in username')
  } else if (form.email === 'error@boostlabs.com') {
    throw new Error('Error in email')
  }

  return 'Password reset!'
}

interface Register {
  name_first: string
  name_last: string
  username: string
  email: string
  phone_mobile: string
}

export const submitRegister = (form: Register): string => {
  if (form.name_first === 'error') {
    throw new Error('Error in registering user')
  }

  return 'User created!'
}

interface Profile {
  userid_ssid: string
  roleid: number
  clientcode: string
  departmentid: number
  username: string
  email: string
  name_last: string
  name_middle: string
  name_first: string
  address: string
  city: string
  state: string
  zip: string
  phone_home: string
  phone_mobile: string
  phone_office: string
  phone_fax: string
  title: string
}

export const submitProfile = (form: Profile): string => {
  if (form.name_first === 'error') {
    throw new Error('Error in updating user')
  }
  const authCookies = Cookies.get('auth')
  const auth = JSON.parse(authCookies)
  Cookies.set('auth', { ...auth, user: { ...form } })
  return 'Profile updated!'
}
