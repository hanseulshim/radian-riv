import { generateProps } from './'
import { Option } from '../index'
import faker from 'faker'

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

export interface NewOrderSuggestionsInterface {
  mlsNumber: string
  address: string
  city: string
  state: string
  zip: string
  bed: string
  bath: string
  sqft: string
  garage: string
  lotSize: string
  year: string
}

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
