import { handleApi, fakeApi } from './index'
import { Option } from 'api'
import faker from 'faker'

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

export const getAboutUs = async (): Promise<any[]> => {
  // const data = await handleApi(`/utility/aboutus`)
  const data = []
  for (let i = 0; i < 50; i++) {
    data.push({
      State: faker.address.stateAbbr(),
      'Broker Name': faker.name.findName(),
      License: faker.vehicle.vin(),
      Office: `${faker.address.streetAddress()} ${faker.address.secondaryAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode(
        '#####'
      )}`
    })
  }
  return data
}

export const formatDate = dateString => {
  return dateString.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
