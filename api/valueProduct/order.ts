import { generateProps } from '.'

export interface OrderInterface {
  id: string // ordersID
  loanNumber: string // loanNum
  poolName: string // from lookup table
  retailMarket: number // need mapping - is it confidenceRatio?
  distressedMarket: number // need mapping - is it confidence Ratio?
  marketArea: string // radius
  compsBack: string // monthsBack
  asOfDate: string // asOfDate
  lock: boolean // locked
  photo: string // imageUrl
  address: string // address
  city: string // city
  state: string // state
  zip: string // zip
  dnaSource: string // dnaSource
  bed: number // bed
  bedEstimate: boolean // estBed
  bath: number // bath
  bathEstimate: boolean // estBath
  sqftPrice: number // need mapping - do we calculate? or is there another table?
  sqft: number // sqft
  sqftEstimate: boolean // estSqft
  lotSize: number // lotSize
  lotSizeEstimate: boolean // need mapping - there is NO estLotSize - is this an actual editable field? if it is then do we not need to track if it's an estimate?
  garage: number // garage
  garageEstimate: boolean // estGarage
  year: number //yrBuilt
  yearEstimate: boolean // estYrBuilt
  propertyType: string // from lookup table
  propertyTypeEstimate: boolean // need mapping - doesn't exist in table - is this an actual editable field? if it is then do we not need to track if it's an estimate?
  calculatedPrice: number // need mapping
  asIsSalePrice: number // need mapping
  quickSalePrice: number // need mapping
  lat: number // lat
  lng: number // long
  geoAccuracy: string // need mapping
  reo: boolean // reo
  rivDate: string // need confirmation - is it orderDate?
  subdivision: string // need mapping
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
