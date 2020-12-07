import Cookies from 'js-cookie'
import { handleApi } from './index'
import { squareFootages, timeIntervals, compTypes } from 'utils/constants'

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
  const data = await handleApi('/user/update', form)
  const authCookies = Cookies.get('auth')
  const auth = JSON.parse(authCookies)
  Cookies.set('auth', { ...auth, user: { ...form } })
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
  const data = await handleApi('/auth/pwdchange', form)
  return data
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
  const data = await handleApi('/auth/questionsset', form)
  return data
}

interface filterItem {
  label: string
  value: string | number
}

interface FilterDefaults {
  sqFt?: filterItem
  min?: number
  max?: number
  percent?: number
  retail: boolean
  distressed: boolean
  timeGoingBack: filterItem
  onlySubdivisionComps: boolean
  restrictComps: filterItem
}
export const getFilterDefaults = async (): Promise<FilterDefaults> => {
  // const defaults = await handleApi('/auth/getFilterDefaults')
  const defaults = {
    sqFt: {
      label: '1,000 Sq Ft',
      value: 1
    },
    min: null,
    max: null,
    percent: null,
    retail: true,
    distressed: true,
    timeGoingBack: {
      label: '3 months',
      value: 1
    },
    onlySubdivisionComps: false,
    restrictComps: {
      label: 'Single Family',
      value: 2
    }
  }
  return defaults
}

export const setFilterDefaults = async (
  form: FilterDefaults
): Promise<string> => {
  const data = await handleApi('/auth/setFilterDefaults', form)
  return data
}

interface DefaultFilterOptions {
  squareFootages: filterItem[]
  timeIntervals: filterItem[]
  compTypes: filterItem[]
}
export const getFilterDefaultOptions = async (): Promise<DefaultFilterOptions> => {
  // const data = await handleApi('/utility/squarefootages')
  // return data
  const data = {
    squareFootages,
    timeIntervals,
    compTypes
  }
  return data
}
