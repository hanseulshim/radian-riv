export * from './auth'
export * from './user'
export * from './utility'
import Cookies from 'js-cookie'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleApi = async (
  route: string,
  payload?: any,
  noToken: boolean = false
) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Accept', 'application/json')
  const authCookies = Cookies.get('auth')
  let auth = null
  if (authCookies) {
    auth = JSON.parse(authCookies)
    if (noToken) {
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
