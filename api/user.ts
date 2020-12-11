import Cookies from 'js-cookie'
import { handleApi } from './index'

interface Question {
  value: number
  label: string
}
export const getSecurityQuestions = async (): Promise<Question[]> => {
  const questions = await handleApi('/user/questions')
  return questions
}

interface Profile {
  userid_ssid: string
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
  const data = await handleApi('/user/update', form)
  const authCookies = Cookies.get('auth')
  const { token, user } = JSON.parse(authCookies)
  Cookies.set('auth', { token, user: { ...user, ...form } })
  return data
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
  const data = await handleApi('/user/questions-set', form)
  return data
}
