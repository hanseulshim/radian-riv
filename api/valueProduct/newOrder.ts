import { Option } from '../index'
import {
  getPropertyTypes,
  getMonthsBack,
  IResults,
  generateProps,
  getOrderedByUsers,
  getClients,
  getProductTypes,
  getPools
} from '..'
import faker from 'faker'
export interface ISingleOrderForm {
  loanNum: string
  zip: string
  address: string
  city: string
  propertyTypeId: string
  state: string
  monthsBack: string
  bed: string
  bath: string
  sqft: string
  lotSize: string
  garage: string
  yrBuilt: string
  asOfDate: string
  contactName: string
  contactPhone: string
  clientName: string
}

export interface IGreenForm {
  orderedByUserId: string
  clientId: string
  productTypeId: number
  poolId: number
  poolName: string
  billable: boolean
  fee: string
  comment: string
}

export const submitSingleOrder = async (
  form: ISingleOrderForm & { state: string },
  greenForm: IGreenForm
): Promise<string> => {
  const param = { ...form, ...greenForm }
  // const data = await handleApi('/value/singleorder', param)
  return 'Success'
}

export interface INewOrderOptions {
  orderedByUsers: Option[]
  clients: Option[]
  productTypes: Option[]
  pools: Option[]
}

export const newOrderOptions = async (): Promise<INewOrderOptions> => {
  // const data = await handleApi('/value/neworderoptions')
  const orderedByUsers = await getOrderedByUsers()
  const clients = await getClients()
  const productTypes = await getProductTypes()
  const pools = await getPools()
  return {
    orderedByUsers,
    clients,
    productTypes,
    pools
  }
}

export interface ISingleOrderOptions {
  restrictComps: Option[]
  monthsBack: Option[]
}

export const getSingleOrderOptions = async () => {
  const restrictComps = await getPropertyTypes()
  const monthsBack = await getMonthsBack()
  return {
    restrictComps,
    monthsBack
  }
}

export const uploadBulkOrder = async (file: File, greenForm: IGreenForm) => {
  const param = { ...file, ...greenForm }
  // const data = await handleApi('/value/bulkorder')
  return 'Success'
}

export type NewOrderSuggestionsInterface = Pick<
  IResults,
  | 'mlsListNo'
  | 'address'
  | 'city'
  | 'state'
  | 'zip'
  | 'bed'
  | 'bath'
  | 'sqft'
  | 'garage'
  | 'lotSize'
  | 'yrBuilt'
>

export const getSingleOrderPropertiesTable = async (
  form: ISingleOrderForm & { state: string }
): Promise<NewOrderSuggestionsInterface[]> => {
  // const data = await handleApi('/value/singleorderproperties')
  const propertiesLength = faker.random.number({ min: 2, max: 15 })
  const data: NewOrderSuggestionsInterface[] = []
  for (let i = 1; i <= propertiesLength; i++) {
    const obj: NewOrderSuggestionsInterface = generateProps([
      'mlsListNo',
      'address',
      'city',
      'state',
      'zip',
      'bed',
      'bath',
      'sqft',
      'garage',
      'lotSize',
      'yrBuilt'
    ])
    data.push(obj)
  }
  return data
}
