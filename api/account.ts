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

interface FilterDefaultSet {
  sqft?: number
  sqft_min?: number
  sqft_max?: number
  sqft_percent?: number
  comparable_retail: boolean
  comparable_distressed: boolean
  time_going_back: number
  comps_subdivision: boolean
  restrict_comps: number
}

export const getFilterDefaults = async (
  userid: string
): Promise<FilterDefaults> => {
  const defaults = await handleApi(`/user/filter-defaults/${userid}`)
  return defaults
}

export const setFilterDefaults = async (
  form: FilterDefaultSet
): Promise<string> => {
  const data = await handleApi('/user/filter-defaults-set', form)
  return data
}

export const getFilterDefaultsSquareFt = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  const data = await handleApi(`/user/filter-defaults-sqft/${userid}`)
  return data
}

export const getFilterDefaultsSquareFtPercent = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  const data = await handleApi(`/user/filter-defaults-sqft-percent/${userid}`)
  return data
}

export const getFilterDefaultsRestrict = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  const data = await handleApi(`/user/filter-defaults-restrict-comps/${userid}`)
  return data
}

export const getFilterDefaultsTime = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  const data = await handleApi(`/user/filter-defaults-time/${userid}`)
  return data
}

interface Department {
  department_id: number
}
interface SubjectProperty {
  property_id: number
}

export const getDefaultSearchDepartments = async (
  form: UserId
): Promise<FilterDefaultOption[]> => {
  const data = await handleApi('/user/departments', form)
  return data
}

export const setDefaultSearchDepartment = async (
  form: Department
): Promise<any> => {
  const data = await handleApi('/user/departmentset', form)
  return data
}

export const getSubjectPropertyDefaults = async (
  form: UserId
): Promise<FilterDefaultOption[]> => {
  const data = await handleApi('/user/subjectproperties', form)
  return data
}

export const setSubjectPropertyDefault = async (
  form: SubjectProperty
): Promise<any> => {
  const data = await handleApi('/user/subjectpropertyset', form)
  return data
}
