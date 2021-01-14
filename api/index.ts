export * from './auth'
export * from './user'
export * from './utility'
export * from './trending'
import Cookies from 'js-cookie'
import data from './data'

export interface Option {
  label: string
  value: string
}

import fakeData from './data'
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleApi = async (
  route: string,
  payload?: any,
  noToken: boolean = false,
  token: string = ''
) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Accept', 'application/json')
  const authCookies = Cookies.get('auth')
  let auth = null
  if (token) {
    myHeaders.append('Authorization', `Bearer ${token}`)
  } else if (authCookies) {
    auth = JSON.parse(authCookies)
    if (!noToken) {
      myHeaders.append('Authorization', `Bearer ${auth.token}`)
    }
  }
  const fetchResponse = payload
    ? await fetch(`${process.env.api}${route}`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload)
      })
    : await fetch(`${process.env.api}${route}`, {
        method: 'GET',
        headers: myHeaders
      })
  const {
    success,
    status,
    message,
    data
  }: {
    success: boolean
    status: number
    message: string
    data: any
  } = await fetchResponse.json()
  if (!success) {
    throw new Error('Request was not successful')
  } else if (status !== 1) {
    throw new Error(message)
  }
  return data ? data : message
}

export const fakeApi = async (route: string, throwError: boolean = false) => {
  if (throwError) {
    throw new Error(`Error in route: ${route}`)
  }
  let returnObj: any
  if (
    route === '/auth/answer' ||
    route === '/auth/register' ||
    route === '/auth/pwdchange' ||
    route === '/user/questionsset' ||
    route === '/user/update' ||
    route === '/user/filter-defaults-set' ||
    route === '/user/department-set' ||
    route === '/user/subject-properties-set'
  ) {
    return 'Request Successful'
  } else if (route.includes('counties')) {
    return fakeData.counties
  } else if (route.includes('zips')) {
    return fakeData.zips
  } else if (route.includes('propertytypes')) {
    return fakeData.types
  } else if (route.includes('msas')) {
    return fakeData.msas
  } else if (route.includes('filter-defaults/')) {
    return fakeData.filterDefaults
  } else if (route.includes('filter-defaults-sqft')) {
    return fakeData.filterDefaultsSqft
  } else if (route.includes('filter-defaults-sqft-percent')) {
    return fakeData.filterDefaultsSqftPercent
  } else if (route.includes('filter-defaults-restrict-comps')) {
    return fakeData.filterDefaultsRestrictComps
  } else if (route.includes('filter-defaults-time')) {
    return fakeData.filterDefaultsTime
  } else if (route.includes('departments')) {
    return fakeData.departments
  } else if (route.includes('department/')) {
    return fakeData.department
  } else if (route.includes('subject-property')) {
    return fakeData.subjectProperty
  } else if (route.includes('subject-properties')) {
    return fakeData.subjectProperties
  } else if (route.includes('questions')) {
    return fakeData.questions
  } else {
    returnObj = fakeData[route]
  }
  if (!returnObj) {
    throw new Error(`Invalid Route: ${route}`)
  }
  return returnObj
}
