import { handleApi } from './index'

interface State {
  label: string
  value: string
}
export const getStates = async (): Promise<State[]> => {
  const data = await handleApi('/utility/states')
  return data
}
