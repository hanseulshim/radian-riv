import { handleApi } from './index'
import { Option } from 'api'

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

//TODO Switch this to real API
export const getZipcodes = async (state: Option): Promise<Option[]> => {
  // const data = await handleApi(`/utility/states/${state}/${county}/zipcodes`)
  const zips = [
    { label: '12345', value: '12345' },
    { label: '23456', value: '23456' },
    { label: '34567', value: '34567' },
    { label: '45678', value: '45678' },
    { label: '56789', value: '56789' }
  ]
  return zips
}

//TODO Switch this to real API
interface PropertyType {
  label: string
  value: string
}
export const getPropertyTypes = async (): Promise<PropertyType[]> => {
  // const data = await handleApi(`/utility/states/${state}/${county}/zipcodes`)
  const types = [
    { label: 'Single Family Property', value: 'Single Family Property' },
    { label: 'Condo', value: 'Condo' },
    { label: 'Apartment', value: 'Apartment' }
  ]
  return types
}

//TODO Switch this to real API
interface MSA {
  label: string
  value: string
}
export const getMSA = async (): Promise<MSA[]> => {
  // const data = await handleApi(`/utility/states/${state}/${county}/zipcodes`)
  const types = [
    { label: 'MSA one', value: 'MSA one' },
    { label: 'MSA two', value: 'MSA two' },
    { label: 'MSA three', value: 'MSA three' }
  ]
  return types
}
