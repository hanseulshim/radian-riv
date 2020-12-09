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

interface UserQuestion {
  userid_ssid: string
}

export const getUserQuestion = async (
  form: UserQuestion
): Promise<Question> => {
  const data = await handleApi('/auth/question', form)
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
