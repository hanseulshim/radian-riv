export interface IOrders {
  orderID: number
  loanNum: string
  poolId: number
  poolName: string // from lookup table
  confidenceRatio: number
  radius: number
  monthsBack: number
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
  dnaSource: number
  dnaSourceValue: string // from lookup table
  subdivision: string // need mapping
}
