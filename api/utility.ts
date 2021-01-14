import { handleApi, fakeApi } from './index'
import { Option } from 'api'

export const getStates = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/states')
  const data = await fakeApi('/utility/states')
  return data
}

export const getCounties = async (state: string): Promise<Option[]> => {
  // const data = await handleApi(`/utility/counties/${state}`)
  const data = await fakeApi(`/utility/counties/${state}`)
  return data
}

export const getZipcodes = async (state: string): Promise<Option[]> => {
  // const data = await handleApi(`/utility/zips/${state}`)
  const data = await fakeApi(`/utility/zips/${state}`)
  return data
}

export const getPropertyTypes = async (state: string): Promise<Option[]> => {
  // const data = await handleApi(`/utility/propertytypes/${state}`)
  const data = await fakeApi(`/utility/propertytypes/${state}`)
  return data
}

export const getMsas = async (state: string): Promise<Option[]> => {
  // const data = await handleApi(`/utility/msas/${state}`)
  const data = await fakeApi(`/utility/msas/${state}`)
  return data
}
