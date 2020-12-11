export * from './auth'
export * from './user'
export * from './utility'
export * from './account'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleApi = async (route: string, payload?: any) => {
  const fetchResponse = payload
    ? await fetch(`${process.env.api}${route}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    : await fetch(`${process.env.api}${route}`)
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
