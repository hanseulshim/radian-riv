import Cookies from 'js-cookie'
import { handleApi, fakeApi } from './index'

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
  // const data = await handleApi('/user/update', form)
  const data = await fakeApi('/user/update')
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
  // const data = await handleApi('/user/questionsset', form)
  const data = await fakeApi('/user/questionsset')
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
  // const data = await handleApi(`/user/filter-defaults/${userid}`)
  const data = await fakeApi(`/user/filter-defaults/${userid}`)
  return data
}

export const setFilterDefaults = async (
  form: FilterDefaultSet
): Promise<string> => {
  // const data = await handleApi('/user/filter-defaults-set', form)
  const data = await fakeApi('/user/filter-defaults-set')
  return data
}

export const getFilterDefaultsSquareFt = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  // const data = await handleApi(`/user/filter-defaults-sqft/${userid}`)
  const data = await fakeApi(`/user/filter-defaults-sqft/${userid}`)
  return data
}

export const getFilterDefaultsSquareFtPercent = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  // const data = await handleApi(`/user/filter-defaults-sqft-percent/${userid}`)
  const data = await fakeApi(`/user/filter-defaults-sqft-percent/${userid}`)
  return data
}

export const getFilterDefaultsRestrict = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  // const data = await handleApi(`/user/filter-defaults-restrict-comps/${userid}`)
  const data = await fakeApi(`/user/filter-defaults-restrict-comps/${userid}`)
  return data
}

export const getFilterDefaultsTime = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  // const data = await handleApi(`/user/filter-defaults-time/${userid}`)
  const data = await fakeApi(`/user/filter-defaults-time/${userid}`)
  return data
}

interface Department {
  userid_ssid: string
  department_id: number
}
interface SubjectProperty {
  userid_ssid: string
  subject_property_id: number
}

export const getDefaultSearchDepartments = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  // const data = await handleApi(`/user/departments/${userid}`)
  const data = await fakeApi(`/user/departments/${userid}`)
  return data
}

export const getDefaultSearchDepartment = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  // const data = await handleApi(`/user/department/${userid}`)
  const data = await fakeApi(`/user/department/${userid}`)
  return data
}

export const setDefaultSearchDepartment = async (
  form: Department
): Promise<any> => {
  // const data = await handleApi('/user/department-set', form)
  const data = await fakeApi('/user/department-set')
  return data
}

export const getSubjectPropertyDefault = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  // const data = await handleApi(`/user/subject-property/${userid}`)
  const data = await fakeApi(`/user/subject-property/${userid}`)
  return data
}

export const getSubjectPropertyDefaults = async (
  userid: string
): Promise<FilterDefaultOption[]> => {
  // const data = await handleApi(`/user/subject-properties/${userid}`)
  const data = await fakeApi(`/user/subject-properties/${userid}`)
  return data
}

export const setSubjectPropertyDefault = async (
  form: SubjectProperty
): Promise<any> => {
  // const data = await handleApi('/user/subject-properties-set', form)
  const data = await fakeApi('/user/subject-properties-set')
  return data
}
