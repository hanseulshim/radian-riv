import Cookies from 'js-cookie'
import { handleApi, fakeApi } from './index'

interface Login {
  username: string
  pwd: string
}
export const submitLogin = async (form: Login): Promise<void> => {
  // const { token } = await handleApi('/auth/login', form, true)
  // const user = await handleApi('/user/get', null, true, token)
  if (form.username !== 'test' || form.pwd !== 'test') {
    throw Error('Incorrect Username or Password')
  }
  const { token } = await fakeApi('/auth/login')
  const user = await fakeApi('/user/get')
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

interface QuestionInfo {
  question_text: string
  question_num: number
}

export const submitResetPassword = async (
  form: ResetPassword
): Promise<QuestionInfo> => {
  // const data = await handleApi('/auth/reset', form, true)
  const data = await fakeApi('/auth/reset')
  return data
}

interface Answer {
  username: string
  email: string
  question_num: number
  answer: string
}

export const submitAnswer = async (form: Answer): Promise<string> => {
  // const data = await handleApi('/auth/answer', form, true)
  const data = await fakeApi('/auth/answer')
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
  // const data = await handleApi('/auth/register', form, true)
  const data = await fakeApi('/auth/register')
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
  // const data = await handleApi('/auth/pwdchange', form)
  const data = await fakeApi('/auth/pwdchange')
  return data
}

interface Question {
  value: number
  label: string
}
export const getSecurityQuestions = async (): Promise<Question[]> => {
  // const questions = await handleApi('/auth/questions')
  const questions = await fakeApi('/auth/questions')
  return questions
}
