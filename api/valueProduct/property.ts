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
  yrBuilt: number
  proximity: number
  listDate: string
  listPrice: number
  coeDate: string
  soldPrice: number
  actDom: number
  dom: number
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
      'yrBuilt',
      'proximity',
      'listDate',
      'listPrice',
      'coeDate',
      'soldPrice',
      'actDom',
      'dom',
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
  ordersId: number
): Promise<CompPropertyInterface[]> => {
  return generateOrders()
}
export const getListedProperties = async (
  ordersId: number
): Promise<CompPropertyInterface[]> => {
  return generateOrders()
}
export const getContractProperties = async (
  ordersId: number
): Promise<CompPropertyInterface[]> => {
  return generateOrders()
}
