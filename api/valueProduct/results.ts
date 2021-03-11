export interface IResults {
  resultsId: number
  ordersId: number
  compType: number
  compTypeValue: string
  address: string
  zip: number
  bed: number
  bath: number
  sqft: number
  garage: number
  yrBuilt: number
  propType: number
  proximity: number
  listDate: string
  listPrice: number
  soldDate: number
  soldPrice: number
  lat: number
  lng: number // LONG in DB - radian needs to recast
  imageUrl: string
  mlsComments: string
  mlsListing: string
  lotSize: string
  mlsName: string
  isSubject: boolean
  assetId: number
  city: string
  state: string
  dom: number
  actDom: number
  schDisc: string
  pool: number
  subdivision: string
  waterfront: string
  pooldetails: string
  mlsListNo: string
}
