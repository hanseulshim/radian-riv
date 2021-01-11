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

interface QuestionInfo {
  question_text: string
  question_num: number
}

export const submitResetPassword = async (
  form: ResetPassword
): Promise<QuestionInfo> => {
  const data = await handleApi('/auth/reset', form)
  return data
}

interface Answer {
  username: string
  email: string
  question_num: number
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
