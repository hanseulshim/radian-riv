import { generateProps, IResults } from '.'
export type CompPhotoPropertyInterface = Pick<
  IResults,
  | 'resultsId'
  | 'address'
  | 'subdivision'
  | 'schDisc'
  | 'bed'
  | 'bath'
  | 'agSqft'
  | 'totalSqft'
  | 'sqft'
  | 'yrBuilt'
  | 'basement'
  | 'pool'
  | 'waterfront'
  | 'concessions'
  | 'coeDate'
  | 'listDate'
  | 'actDom'
  | 'dom'
  | 'listPrice'
  | 'soldPrice'
  | 'mlsListNo'
  | 'exportMls'
  | 'distressed'
  | 'proximity'
  | 'mlsComments'
  | 'imageUrls'
  | 'rank'
  | 'checked'
>

const generateOrders = (): CompPhotoPropertyInterface[] => {
  const data: CompPhotoPropertyInterface[] = []
  for (let i = 1; i <= 15; i++) {
    const obj: CompPhotoPropertyInterface = generateProps([
      'resultsId',
      'address',
      'subdivision',
      'schDisc',
      'bed',
      'bath',
      'agSqft',
      'totalSqft',
      'sqft',
      'yrBuilt',
      'basement',
      'pool',
      'waterfront',
      'concessions',
      'coeDate',
      'listDate',
      'actDom',
      'dom',
      'listPrice',
      'soldPrice',
      'mlsListNo',
      'exportMls',
      'distressed',
      'proximity',
      'mlsComments',
      'imageUrls',
      'checked'
    ])
    obj.rank = i
    data.push(obj)
  }
  return data
}

export const getSoldCompProperties = async (
  ordersId: number
): Promise<CompPhotoPropertyInterface[]> => {
  return generateOrders()
}
export const getListedCompProperties = async (
  ordersId: number
): Promise<CompPhotoPropertyInterface[]> => {
  return generateOrders()
}
export const getContractCompProperties = async (
  ordersId: number
): Promise<CompPhotoPropertyInterface[]> => {
  return generateOrders()
}
