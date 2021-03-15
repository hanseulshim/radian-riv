import { generateProps, IResults } from './'

export type HistoricalListingPropertyInterface = Pick<
  IResults,
  | 'address'
  | 'bath'
  | 'bed'
  | 'garage'
  | 'listDate'
  | 'lotSize'
  | 'mlsComments'
  | 'mlsName'
  | 'financeTypeValue'
  | 'sqft'
  | 'yrBuilt'
  | 'zip'
  | 'imageUrls'
>

export const getHistoricalListingProperty = async (
  resultsId: number,
  ordersId: number
): Promise<HistoricalListingPropertyInterface> => {
  const obj: HistoricalListingPropertyInterface = generateProps([
    'address',
    'bath',
    'bed',
    'garage',
    'listDate',
    'lotSize',
    'mlsComments',
    'mlsName',
    'financeTypeValue',
    'sqft',
    'yrBuilt',
    'zip',
    'imageUrls'
  ])
  return obj
}

export type HistoricalListingInterface = Pick<
  IResults,
  | 'resultsId'
  | 'changeDate'
  | 'coeDate'
  | 'cumulativeListDays'
  | 'exportMls'
  | 'listDate'
  | 'mlsListNo'
  | 'listPrice'
  | 'mlsComments'
  | 'mlsName'
  | 'imageUrls'
  | 'financeTypeValue'
  | 'showMls'
  | 'soldPrice'
  | 'compTypeValue'
> & {
  selected: boolean
}

export const getHistoricalListingHistory = async (
  resultsId: number,
  orderId: number
): Promise<HistoricalListingInterface[]> => {
  const data: HistoricalListingInterface[] = []
  for (let i = 1; i <= 6; i++) {
    const obj: HistoricalListingInterface = generateProps([
      'resultsId',
      'changeDate',
      'coeDate',
      'cumulativeListDays',
      'exportMls',
      'listDate',
      'mlsListNo',
      'listPrice',
      'mlsComments',
      'mlsName',
      'imageUrls',
      'financeTypeValue',
      'showMls',
      'soldPrice',
      'compTypeValue'
    ])
    obj.selected = false
    data.push(obj)
  }
  return data
}
