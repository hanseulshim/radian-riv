import { handleApi } from './index'

interface State {
  label: string
  value: string
}
export const getStates = async (): Promise<State[]> => {
  const data = await handleApi('/utility/states')
  return data
}

interface County {
  label: string
  value: string
}
export const getCounties = async (state: string): Promise<County[]> => {
  const data = await handleApi(`/utility/states/${state}/counties`)
  return data
}
