import Cookies from 'js-cookie'
import { handleApi } from './index'

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

interface FilterDefaultOption {
  label: string
  value: string | number
}

interface FilterDefaults {
  sqft?: FilterDefaultOption
  sqft_min?: number
  sqft_max?: number
  sqft_percent?: FilterDefaultOption
  comparable_retail: boolean
  comparable_distressed: boolean
  time_going_back: FilterDefaultOption
  comps_subdivision: boolean
  restrict_comps: FilterDefaultOption
}
export const getFilterDefaults = async (
  userid_ssid: string
): Promise<FilterDefaults> => {
  const defaults = await handleApi('/user/filterdefaults', userid_ssid)
  return defaults
}

export const setFilterDefaults = async (
  form: FilterDefaults
): Promise<string> => {
  const data = await handleApi('/auth/setFilterDefaults', form)
  return data
}

export const getFilterDefaultsSquareFt = async (): Promise<
  FilterDefaultOption[]
> => {
  const data = await handleApi('/utility/filterdefaultssqft')
  return data
}

export const getFilterDefaultsSquareFtPercent = async (): Promise<
  FilterDefaultOption[]
> => {
  const data = await handleApi('/utility/filterdefaultssqftpercent')
  return data
}

export const getFilterDefaultsTime = async (): Promise<
  FilterDefaultOption[]
> => {
  const data = await handleApi('/utility/filterdefaultstime')
  return data
}

export const getFilterDefaultsRestrict = async (): Promise<
  FilterDefaultOption[]
> => {
  const data = await handleApi('/utility/filterdefaultsrestrict')
  return data
}
