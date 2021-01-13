import Cookies from 'js-cookie'
import { handleApi } from './index'

interface Login {
  username: string
  pwd: string
}
export const submitLogin = async (form: Login): Promise<void> => {
  const { token } = await handleApi('/auth/login', form, true)
  const user = await handleApi(`/user/get`, null, true, token)
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
  const data = await handleApi('/auth/reset', form, true)
  return data
}

interface Answer {
  username: string
  email: string
  question_num: number
  answer: string
}

export const submitAnswer = async (form: Answer): Promise<string> => {
  const data = await handleApi('/auth/answer', form, true)
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
  const data = await handleApi('/auth/register', form, true)
  return data
}
