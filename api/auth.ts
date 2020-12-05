import Cookies from 'js-cookie'
import { handleApi } from './index'

interface Login {
  username: string
  pwd: string
}
export const submitLogin = async (form: Login): Promise<void> => {
  const auth = await handleApi('/auth/login', form)
  Cookies.set('auth', auth)
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

export const submitRegister = async (form: Register): Promise<string> => {
  const message = await handleApi('/auth/register', form)
  return message
}

interface Profile {
  name_first: string
  name_last: string
  title: string
  address: string
  city: string
  state: string
  zip: string
  department: string
  phone_mobile: string
  phone_home: string
}

export const submitProfile = async (form: Profile): Promise<string> => {
  const message = await handleApi('/user/update', form)
  const authCookies = Cookies.get('auth')
  const auth = JSON.parse(authCookies)
  Cookies.set('auth', { ...auth, user: { ...form } })
  return message
}

interface ChangePassword {
  userid_ssid: string
  pwd: string
}

export const submitChangePassword = async (
  form: ChangePassword
): Promise<string> => {
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
  const message = await handleApi('/auth/pwdchange', form)
  return message
}

interface Question {
  questionid: number
  question_text: string
}
export const getSecurityQuestions = async (): Promise<Question[]> => {
  const questions = await handleApi('/auth/questions')
  return questions
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

export const setSecurityQuestions = async (
  form: SecurityQuestions
): Promise<string> => {
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
  const message = await handleApi('/auth/questionsset', form)
  return message
}
