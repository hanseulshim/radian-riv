import { Option } from '../index'
import { getPropertyTypes, getMonthsBack, IResults, generateProps } from '..'
import faker from 'faker'
export interface ISingleOrderForm {
  loanNum: string
  zip: string
  address: string
  city: string
  propertyTypeId: string
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
  return {
    orderedByUsers: [
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
    ],
    clients: [
      {
        value: '46240-1',
        label: 'Boost Labs'
      }
    ],
    productTypes: [
      {
        value: 0,
        label: 'Radian Interactive Value'
      },
      {
        value: 1,
        label: 'Rental Analysis'
      }
    ],
    pools: [
      {
        value: 0,
        label: 'Pool 1'
      }
    ]
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
  form: ISingleOrderForm
): Promise<NewOrderSuggestionsInterface[]> => {
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
