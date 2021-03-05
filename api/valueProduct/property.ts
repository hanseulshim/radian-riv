import { generateProps } from '.'
export interface CompPropertyInterface {
  id: string
  address: string
  city: string
  zip: string
  bed: number
  bath: number
  sqft: number
  garage: number
  lotSize: number
  year: number
  targetDistance: number
  listDate: string
  listPrice: number
  coeDate: string
  soldPrice: number
  actDom: number
  totDom: number
  sqftPrice: number
  listPriceSqft: number
  valuationPercent: number
  rank: number
  checked: boolean
}

const generateOrders = (): CompPropertyInterface[] => {
  const data: CompPropertyInterface[] = []
  for (let i = 1; i <= 15; i++) {
    const obj: CompPropertyInterface = generateProps([
      'id',
      'address',
      'checked',
      'city',
      'zip',
      'bed',
      'bath',
      'sqft',
      'garage',
      'lotSize',
      'year',
      'targetDistance',
      'listDate',
      'listPrice',
      'coeDate',
      'soldPrice',
      'actDom',
      'totDom',
      'sqftPrice',
      'listPriceSqft',
      'valuationPercent'
    ])
    obj.rank = i
    data.push(obj)
  }
  return data
}

export const getSoldProperties = async (
  orderId: string
): Promise<CompPropertyInterface[]> => {
  return generateOrders()
}
export const getListedProperties = async (
  orderId: string
): Promise<CompPropertyInterface[]> => {
  return generateOrders()
}
export const getContractProperties = async (
  orderId: string
): Promise<CompPropertyInterface[]> => {
  return generateOrders()
}
