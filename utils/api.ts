import { User } from 'components/auth/AuthProvider'
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
    name_first: 'Kevin',
    address: '123 Fake Street',
    city: 'Atlanta',
    state: 'GA',
    zip: '55555',
    phone_home: '215-555-1872',
    phone_mobile: '484-555-0980',
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
export const submitLogin = (form: Login): void => {
  if (form.username !== 'test') {
    throw new Error('Username is not valid')
  } else if (form.pwd !== 'test') {
    throw new Error('Password is not valid')
  }

  Cookies.set('auth', testAuth)
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

export const submitProfile = (form: User): string => {
  if (form.name_first === 'error') {
    throw new Error('Error in updating user')
  }
  const authCookies = Cookies.get('auth')
  const auth = JSON.parse(authCookies)
  Cookies.set('auth', { ...auth, user: { ...form } })
  return 'Profile updated!'
}

interface ChangePassword {
  userid_ssid: string
  pwd: string
}

export const submitChangePassword = (form: ChangePassword): string => {
  const { pwd } = form
  if (pwd.length < 8) {
    throw new Error('Password must be at least 8 characters(s) long')
  } else if (!/[A-Z]/.test(pwd)) {
    throw new Error('Password must contain an uppercase character')
  } else if (!/[a-z]/.test(pwd)) {
    throw new Error('Password must contain a lowercase character')
  } else if (!/[0-9]/.test(pwd)) {
    throw new Error('Password must contain a numeric character')
  } else if (!/[!@#$]/.test(pwd)) {
    throw new Error(
      'Password must contain a special character (example: !,@,#,$)'
    )
  }
  return 'Password Changed'
}

interface Question {
  questionid: number
  question_text: string
}
export const getSecurityQuestions = (): Question[] => {
  return [
    { questionid: 0, question_text: 'Question 1' },
    { questionid: 1, question_text: 'Question 2' },
    { questionid: 2, question_text: 'Question 3' },
    { questionid: 3, question_text: 'Question 4' },
    { questionid: 4, question_text: 'Question 5' }
  ]
}

interface SecurityQuestions {
  userid_ssid: string
  question1id: number
  answer1: string
  question2id: number
  answer2: string
  question3id: number
  answer3: string
}

export const setSecurityQuestions = (form: SecurityQuestions): string => {
  if (
    form.question1id === null ||
    form.question2id === null ||
    form.question3id === null
  ) {
    throw new Error(`Questions can't be blank`)
  }
  if (form.answer1 === 'error') {
    throw new Error('Error with security question')
  }
  return 'Security quesitons set'
}
