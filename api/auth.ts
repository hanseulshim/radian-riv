import Cookies from 'js-cookie'
import { handleApi } from './index'

interface Login {
  username: string
  pwd: string
}
export const submitLogin = async (form: Login): Promise<void> => {
  const { token, userid_ssid } = await handleApi('/auth/login', form)
  const user = await handleApi(`/user/${userid_ssid}`)
  const auth = {
    token,
    user
  }
  Cookies.set('auth', auth)
}

interface ResetPassword {
  username: string
  email: string
}

export const submitResetPassword = async (
  form: ResetPassword
): Promise<string> => {
  const data = await handleApi('/auth/reset', form)
  return data
}

interface Question {
  questionid: number
  question_text: string
}

export const getUserQuestion = async (
  userid_ssid: string
): Promise<Question> => {
  const data = await handleApi(`/auth/question/${userid_ssid}`)
  return data
}

interface Answer {
  userid_ssid: string
  question_id: number
  answer: string
}

export const submitAnswer = async (form: Answer): Promise<string> => {
  const data = await handleApi('/auth/answer', form)
  return data
}

interface Register {
  name_first: string
  name_last: string
  username: string
  email: string
  phone_mobile: string
}

export const submitRegister = async (form: Register): Promise<string> => {
  const data = await handleApi('/auth/register', form)
  return data
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
  const data = await handleApi('/auth/pwd-change', form)
  return data
}
