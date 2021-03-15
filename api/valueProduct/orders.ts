import { generateProps } from '.'

export interface IOrders {
  ordersId: number
  loanNum: string
  poolId: number
  poolName: string // from lookup table
  confidenceRatio: number
  radius: number
  monthsBack: number
  monthsBackId: number
  asOfDate: string
  locked: boolean
  imageUrl: string
  address: string
  city: string
  state: string
  zip: number
  bed: number
  estBed: boolean
  bath: number
  estBath: boolean
  sqftPrice: number // need mapping - do we calculate? or is there another table?
  sqft: number
  estSqft: boolean
  lotSize: number
  garage: number
  estGarage: boolean
  yrBuilt: number
  estYrBuilt: boolean
  propertyTypeId: number
  propertyType: string // from lookup table
  calculatedPrice: number // need mapping
  asIsSalePrice: number // need mapping
  quickSalePrice: number // need mapping
  lat: number
  lng: number // long - radian needs to remap
  geoAccuracy: string // need mapping
  reo: boolean // listed as int in DB - also exists in prod but not UAT
  orderDate: string
  completeDate: string
  initialCompleteDate: string
  dnaSource: number
  dnaSourceValue: string // from lookup table
  subdivision: string // need mapping
  orderByIdUser: string
  orderByUser: string
  status: number
  reconcileStatusId: number
  reconcileStatus: string
  productType: string
  client: string
  units: number
}

export const getOrder = async (orderId: number): Promise<IOrders> => {
  const orders = generateOrders(1)
  orders[0].ordersId = orderId
  return orders[0]
}

const generateOrders = (num = 15): IOrders[] => {
  const data: IOrders[] = []
  for (let i = 1; i <= num; i++) {
    const obj: IOrders = generateProps([
      'ordersId',
      'loanNum',
      'poolId',
      'poolName',
      'confidenceRatio',
      'radius',
      'monthsBack',
      'monthsBackId',
      'asOfDate',
      'locked',
      'imageUrl',
      'address',
      'city',
      'state',
      'zip',
      'bed',
      'estBed',
      'bath',
      'estBath',
      'sqftPrice',
      'sqft',
      'estSqft',
      'lotSize',
      'garage',
      'estGarage',
      'yrBuilt',
      'estYrBuilt',
      'propertyTypeId',
      'propertyType',
      'calculatedPrice',
      'asIsSalePrice',
      'quickSalePrice',
      'lat',
      'lng',
      'geoAccuracy',
      'reo',
      'orderDate',
      'completeDate',
      'initialCompleteDate',
      'dnaSource',
      'dnaSourceValue',
      'subdivision',
      'orderByIdUser',
      'orderByUser',
      'status',
      'reconcileStatusId',
      'reconcileStatus',
      'productType',
      'client'
    ])
    data.push(obj)
  }
  return data
}

// export interface IOrders {
//   id: string // ordersID
//   loanNum: string // loanNum
//   poolName: string // from lookup table
//   retailMarket: number // need mapping - is it confidenceRatio?
//   distressedMarket: number // need mapping - is it confidence Ratio?
//   marketArea: string // radius
//   monthsBack: string // monthsBack
//   asOfDate: string // asOfDate
//   lock: boolean // locked
//   photo: string // imageUrl
//   address: string // address
//   city: string // city
//   state: string // state
//   zip: string // zip
//   dnaSource: string // dnaSource
//   bed: number // bed
//   estBed: boolean // estBed
//   bath: number // bath
//   estBath: boolean // estBath
//   sqftPrice: number // need mapping - do we calculate? or is there another table?
//   sqft: number // sqft
//   estSqft: boolean // estSqft
//   lotSize: number // lotSize
//   lotSizeEstimate: boolean // need mapping - there is NO estLotSize - is this an actual editable field? if it is then do we not need to track if it's an estimate?
//   garage: number // garage
//   estGarage: boolean // estGarage
//   year: number //yrBuilt
//   estYrBuilt: boolean // estYrBuilt
//   propertyType: string // from lookup table
//   propertyTypeEstimate: boolean // need mapping - doesn't exist in table - is this an actual editable field? if it is then do we not need to track if it's an estimate?
//   calculatedPrice: number // need mapping
//   asIsSalePrice: number // need mapping
//   quickSalePrice: number // need mapping
//   lat: number // lat
//   lng: number // long
//   geoAccuracy: string // need mapping
//   reo: boolean // reo
//   rivDate: string // need confirmation - is it orderDate?
//   subdivision: string // need mapping
// }
