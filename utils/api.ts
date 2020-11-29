import { AuthType } from 'components/auth/AuthProvider'

//TODO #7 remove once API is set in place
const testAuth = {
  user: {
    userid_ssid: '16252-5',
    roleid: 0,
    clientcode: 'string',
    departmentid: 0,
    username: 'string',
    email: 'string',
    name_last: 'Doe',
    name_first: 'John',
    address: 'string',
    city: 'string',
    state: 'string',
    zip: 'string',
    phone_home: '215-555-1872',
    phone_mobile: '484-555-0980',
    title: 'string'
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
  confirm_email: string
  phone_mobile: string
}

export const submitRegister = (form: Register): string => {
  if (form.name_first === 'error') {
    throw new Error('Error in registering user')
  }

  return 'User created!'
}
