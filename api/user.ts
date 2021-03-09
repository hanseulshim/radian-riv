import Cookies from 'js-cookie'
import { handleApi } from './index'
import { Option } from './index'

interface Profile {
  name_first: string
  name_last: string
  title: string
  address: string
  city: string
  state: string
  zip: string
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

interface FilterDefaults {
  sqft?: Option
  sqft_min?: number
  sqft_max?: number
  sqft_percent?: Option
  comparable_retail: boolean
  comparable_distressed: boolean
  time_going_back: Option
  comps_subdivision: boolean
  restrict_comps: Option
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

export const getFilterDefaults = async (): Promise<FilterDefaults> => {
  const data = await handleApi(`/user/filter-defaults`)
  return {
    sqft: {
      value: data.sqft.Value.toString(),
      label: data.sqft.Label
    },
    sqft_min: data.sqft_min,
    sqft_max: data.sqft_max,
    sqft_percent: data.sqft_percent,
    comparable_retail: data.comparable_retail,
    comparable_distressed: data.comparable_distressed,
    time_going_back: {
      value: data.time_going_back.Value.toString(),
      label: data.time_going_back.Label
    },
    comps_subdivision: data.comps_subdivision,
    restrict_comps: {
      value: data.restrict_comps.Value.toString(),
      label: data.restrict_comps.Label
    }
  }
}

export const setFilterDefaults = async (
  form: FilterDefaultSet
): Promise<string> => {
  const data = await handleApi('/user/filter-defaults-set', form)
  return data
}

export const getFilterDefaultsSquareFt = async (): Promise<Option[]> => {
  const data = await handleApi('/user/filter-defaults-sqft')
  return data.sqft.map(option => ({ label: option.Label, value: option.Value }))
}

export const getFilterDefaultsSquareFtPercent = async (): Promise<Option[]> => {
  const data = await handleApi('/user/filter-defaults-sqft-percent')
  return data.sqft.map(option => ({ label: option.Label, value: option.Value }))
}

export const getFilterDefaultsRestrict = async (): Promise<Option[]> => {
  const data = await handleApi('/user/filter-defaults-restrict-comps')
  return data.restrictComps.map(option => ({
    label: option.Label,
    value: option.Value
  }))
}

export const getFilterDefaultsTime = async (): Promise<Option[]> => {
  const data = await handleApi('/user/filter-defaults-time')
  return data.filterTime.map(option => ({
    label: option.Label,
    value: option.Value
  }))
}

export const getSubjectPropertyDefault = async (): Promise<Option> => {
  const data = await handleApi('/user/subject-property')
  return {
    label: data.Label as string,
    value: data.Value as string
  }
}

export const getSubjectPropertyDefaults = async (): Promise<Option[]> => {
  const data = await handleApi('/user/subject-properties')
  return data.subjectProperties.map(option => ({
    label: option.Label,
    value: option.Value
  }))
}

export const setSubjectPropertyDefault = async (
  subject_property_id: number
): Promise<any> => {
  const data = await handleApi('/user/subject-properties-set', {
    subject_property_id
  })
  return data
}
