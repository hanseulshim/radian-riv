import { generateProps } from '.'

export interface OrderInterface {
  id: string
  loanNumber: string
  poolName: string
  retailMarket: number
  distressedMarket: number
  marketArea: string
  compsBack: string
  asOfDate: string
  lock: boolean
  photo: string
  address: string
  city: string
  state: string
  zip: string
  dnaSource: string
  bed: number
  bedEstimate: boolean
  bath: number
  bathEstimate: boolean
  sqftPrice: number
  sqft: number
  sqftEstimate: boolean
  lotSize: number
  lotSizeEstimate: boolean
  garage: number
  garageEstimate: boolean
  year: number
  yearEstimate: boolean
  propertyType: string
  propertyTypeEstimate: boolean
  calculatedPrice: number
  asIsSalePrice: number
  quickSalePrice: number
  lat: number
  lng: number
  geoAccuracy: string
  reo: boolean
  rivDate: string
  subdivision: string
}

export const getOrder = async (orderId: string): Promise<OrderInterface> => {
  const orders = generateOrders(1)
  orders[0].id = orderId
  return orders[0]
}

const generateOrders = (num = 15): OrderInterface[] => {
  const data: OrderInterface[] = []
  for (let i = 1; i <= num; i++) {
    const obj: OrderInterface = generateProps([
      'address',
      'asOfDate',
      'bath',
      'bathEstimate',
      'bed',
      'bedEstimate',
      'calculatedPrice',
      'city',
      'compsBack',
      'distressedMarket',
      'dnaSource',
      'garage',
      'garageEstimate',
      'geoAccuracy',
      'id',
      'lat',
      'lng',
      'lock',
      'loanNumber',
      'lotSize',
      'lotSizeEstimate',
      'marketArea',
      'poolName',
      'propertyType',
      'propertyTypeEstimate',
      'reo',
      'retailMarket',
      'rivDate',
      'sqft',
      'sqftEstimate',
      'subdivision',
      'state',
      'year',
      'yearEstimate',
      'zip',
      'sqftPrice',
      'asIsSalePrice',
      'quickSalePrice',
      'photo'
    ])
    data.push(obj)
  }
  return data
}
