export * from './auth'
export * from './user'
export * from './utility'
export * from './trending'
export * from './valueProduct'
import Cookies from 'js-cookie'
export interface Option {
  label: string
  value: string
}

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
  try {
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

    if (
      fetchResponse.status === 401 &&
      !window.location.pathname.includes('login')
    ) {
      Cookies.remove('auth')
      window.location.href = `${process.env.rootUrl}/login`
      throw new Error('Unauthenticated')
    } else {
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
      } else if (status === -1) {
        throw new Error(message)
      }
      return data ? data : message ? message : 'Success'
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
