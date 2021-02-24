import { handleApi } from './index'
import { Option } from 'api'
import faker from 'faker'

export const getStates = async (): Promise<Option[]> => {
  const data = await handleApi('/utility/states')
  return data.map(({ Code, Name }: { Code: string; Name: string }) => ({
    label: Name.trim(),
    value: Code
  }))
}

export const getCounties = async (state: string): Promise<Option[]> => {
  const data = await handleApi(`/utility/counties/${state}`)
  return data.map(
    ({ CountyId, County }: { CountyId: number; County: string }) => ({
      label: County.trim(),
      value: CountyId.toString()
    })
  )
}

export const getZipcodes = async (state: string): Promise<Option[]> => {
  const data = await handleApi(`/utility/zips/${state}`)
  return data.map(({ Zip }: { Zip: string }) => ({
    label: Zip,
    value: Zip
  }))
}

export const getPropertyTypes = async (): Promise<Option[]> => {
  const data = await handleApi('/utility/propertytypes')
  return data.map(
    ({ PropertyTypId, MSA }: { PropertyTypId: number; MSA: string }) => ({
      label: MSA,
      value: PropertyTypId
    })
  )
}

export const getMsas = async (state: string): Promise<Option[]> => {
  const data = await handleApi(`/utility/msas/${state}`)
  return data.map(({ MSAId, MSA }: { MSAId: number; MSA: string }) => ({
    label: MSA,
    value: MSAId
  }))
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
