import { handleApi } from './index'

interface State {
  code: string
  name: string
}
export const getStates = async (): Promise<State[]> => {
  const data = await handleApi('/utility/states')
  return data
}
