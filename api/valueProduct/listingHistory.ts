import { generateProps, IResults } from './'

export type IHistoricalListingProperty = Pick<
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

export type IHistoricalListing = Pick<
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

interface IListingHistory {
  property: IHistoricalListingProperty
  listingHistory: IHistoricalListing[]
}

export const getHistoricalListing = async (
  resultsId: number,
  ordersId: number
): Promise<IListingHistory> => {
  const property: IHistoricalListingProperty = generateProps([
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
  const listingHistory: IHistoricalListing[] = []
  for (let i = 1; i <= 6; i++) {
    const obj: IHistoricalListing = generateProps([
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
    listingHistory.push(obj)
  }
  return { property, listingHistory }
}
