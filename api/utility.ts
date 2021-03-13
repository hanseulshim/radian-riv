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

export const getMonthsBack = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/monthsBack')
  return [
    {
      value: 0,
      label: '3 Months'
    },
    {
      value: 1,
      label: '6 Months'
    },
    {
      value: 2,
      label: '12 Months'
    },
    {
      value: 3,
      label: '24 Months'
    },
    {
      value: 4,
      label: '36 Months'
    }
  ]
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

export const getOrderedByUsers = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/orderedbyusers')
  return [
    {
      value: '25996-1',
      label: 'Kevin Ingalls'
    },
    {
      value: '26002-1',
      label: 'John Oneil'
    },
    {
      value: '26005-1',
      label: 'Scott Cashon'
    },
    {
      value: '26001-1',
      label: 'Hanseul Shim'
    }
  ]
}

export const getClients = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/clients')
  return [
    {
      value: '46240-1',
      label: 'Boost Labs'
    },
    {
      value: '46241-1',
      label: 'Coost Labs'
    }
  ]
}

export const getProductTypes = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/producttypes')
  return [
    {
      value: 0,
      label: 'Radian Interactive Value'
    },
    {
      value: 1,
      label: 'Rental Analysis'
    }
  ]
}

export const getPools = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/pools')
  return [
    {
      value: 0,
      label: 'Pool 1'
    },
    {
      value: 1,
      label: 'Pool 2'
    },
    {
      value: 2,
      label: 'Pool 3'
    },
    {
      value: 3,
      label: 'Pool 4'
    },
    {
      value: 4,
      label: 'Pool 5'
    }
  ]
}

export const getDepartments = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/departments')
  return [
    {
      value: 0,
      label: 'All'
    },
    {
      value: 1,
      label: 'Department 1'
    },
    {
      value: 2,
      label: 'Department 2'
    }
  ]
}

export const getRivStatuses = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/rivstatus')
  return [
    {
      value: 0,
      label: 'All'
    },
    {
      value: 1,
      label: '60 days'
    },
    {
      value: 2,
      label: '90 days'
    }
  ]
}

export const getReconcileStatuses = async (): Promise<Option[]> => {
  // const data = await handleApi('/utility/reconcilestatuses')
  return [
    {
      label: 'All',
      value: 'All'
    },
    {
      label: 'Status 2',
      value: 'Status 2'
    },
    {
      label: 'Status 3',
      value: 'Status 3'
    }
  ]
}
