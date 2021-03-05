import { generateProps } from './'
export interface HistoricalListingPropertyInterface {
  address: string
  bath: number
  bed: number
  garage: number
  listDate: string
  lotSize: number
  mlsComments: string
  mlsName: string
  saleType: string
  sqft: number
  year: number
  zip: string
  photos: string[]
}

export const getHistoricalListingProperty = async (
  orderId: string,
  propertyId: string
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
    'saleType',
    'sqft',
    'year',
    'zip',
    'photos'
  ])
  return obj
}
export interface HistoricalListingInterface {
  changeDate: string
  coeDate: string
  cumulativeListDays: number
  exportMls: boolean
  id: string
  listDate: string
  listingNumber: string
  listPrice: number
  mlsComments: string
  mlsName: string
  photos: string[]
  saleType: string
  showMls: boolean
  soldPrice: number
  status: string
}

export const getHistoricalListingHistory = async (
  orderId: string,
  propertyId: string
): Promise<HistoricalListingInterface[]> => {
  const data: HistoricalListingInterface[] = []
  for (let i = 1; i <= 6; i++) {
    const obj: HistoricalListingInterface = generateProps([
      'cumulativeListDays',
      'changeDate',
      'coeDate',
      'exportMls',
      'id',
      'listDate',
      'listingNumber',
      'listPrice',
      'mlsComments',
      'mlsName',
      'photos',
      'saleType',
      'showMls',
      'soldPrice',
      'status'
    ])
    data.push(obj)
  }
  return data
}
