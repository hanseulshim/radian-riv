import { generateProps } from './'
import { Option } from '../index'
import faker from 'faker'
import { handleApi } from '..'

export interface SingleOrderForm {
  orderedBy: Option
  client: Option
  productType: Option
  poolName: Option
  poolNameInput: string
  orderType: string
  billable: boolean
  fee: string
  loanNumber: string
  zip: string
  address: string
  city: string
  state: Option
  restrictComps: Option
  compsBack: Option
  bed: string
  bath: string
  sqft: string
  lotSize: string
  garage: string
  year: string
  asOfDate: string
  contactName: string
  contactPhone: string
  clientName: string
  file: File
  comment: string
}

export type NewOrderSuggestionsInterface = Pick<
  IOrders,
  | 'mlsNumber'
  | 'address'
  | 'city'
  | 'state'
  | 'zip'
  | 'bed'
  | 'bath'
  | 'sqft'
  | 'garage'
  | 'lotSize'
  | 'year'
>

export const getSingleOrderPropertiesTable = async (
  form: SingleOrderForm
): Promise<NewOrderSuggestionsInterface[]> => {
  const propertiesLength = faker.random.number({ min: 2, max: 15 })
  const data: NewOrderSuggestionsInterface[] = []
  for (let i = 1; i <= propertiesLength; i++) {
    const obj: NewOrderSuggestionsInterface = generateProps([
      'mlsNumber',
      'address',
      'city',
      'state',
      'zip',
      'bed',
      'bath',
      'sqft',
      'garage',
      'lotSize',
      'year'
    ])
    data.push(obj)
  }
  return data
}

export const submitSingleOrder = async (
  form: SingleOrderForm
): Promise<string> => {
  return 'Success'
}

export const getProductTypes = async (): Promise<Option[]> => {
  // const data = await handleApi('/value/producttypes')
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

export const getOrderedByUsers = async (): Promise<Option[]> => {
  // const data = await handleApi('/value/orderedbyusers')
  return [
    {
      value: 0,
      label: 'Kevin Ingalls'
    },
    {
      value: 1,
      label: 'John Oneil'
    },
    {
      value: 2,
      label: 'Scott Cashon'
    },
    {
      value: 3,
      label: 'Hanseul Shim'
    }
  ]
}
