import { generateProps } from '.'
export interface CompPhotoPropertyInterface {
  id: string
  address: string
  subdivision: string
  schoolDistrict: string
  bed: number
  bath: number
  agSqft: number
  totalSqft: number
  aveSqft: number
  year: number
  basement: string
  pool: string
  waterfront: string
  concessions: number
  coeDate: string
  listDate: string
  actDom: number
  totDom: number
  listPrice: number
  soldPrice: number
  listingNumber: string
  exportMls: boolean
  distressed: boolean
  targetDistance: number
  description: string
  photos: string[]
  rank: number
  checked: boolean
}

const generateOrders = (): CompPhotoPropertyInterface[] => {
  const data: CompPhotoPropertyInterface[] = []
  for (let i = 1; i <= 15; i++) {
    const obj: CompPhotoPropertyInterface = generateProps([
      'id',
      'address',
      'subdivision',
      'schoolDistrict',
      'bed',
      'bath',
      'agSqft',
      'totalSqft',
      'aveSqft',
      'year',
      'basement',
      'pool',
      'waterfront',
      'concessions',
      'coeDate',
      'listDate',
      'actDom',
      'totDom',
      'listPrice',
      'soldPrice',
      'listingNumber',
      'distressed',
      'exportMls',
      'description',
      'targetDistance',
      'photos',
      'checked'
    ])
    obj.rank = i
    data.push(obj)
  }
  return data
}

export const getSoldCompProperties = async (
  orderId: string
): Promise<CompPhotoPropertyInterface[]> => {
  return generateOrders()
}
export const getListedCompProperties = async (
  orderId: string
): Promise<CompPhotoPropertyInterface[]> => {
  return generateOrders()
}
export const getContractCompProperties = async (
  orderId: string
): Promise<CompPhotoPropertyInterface[]> => {
  return generateOrders()
}
