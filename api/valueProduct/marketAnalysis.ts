import faker from 'faker'
import { generateProps, IResults } from '.'

export type IMarketAnalysis = Pick<
  IResults,
  'sqft' | 'yrBuilt' | 'propTypeValue'
> & {
  area: string
  areaParameter: string
}

export interface IDaysData {
  days: string
  '0-90': number
  '91-180': number
  '180-270': number
  '271-365': number
}

export interface ISoldDaysData {
  category: string
  active: number
  pending: number
  '0-90': number
  '91-180': number
  '180-270': number
  '271-365': number
}

export interface IMarketListings {
  activeListings: number
  pendings: number
  finalListPrice: {
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }
  originalListPrice: {
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }
}
interface MarketAnalysisInterfaceData {
  subjectProperty: IMarketAnalysis
  daysData: IDaysData[]
  soldDaysData: ISoldDaysData[]
  marketListings: IMarketListings
}

export const getMarketAnalysisData = async (
  ordersId: number
): Promise<MarketAnalysisInterfaceData> => {
  const subjectProperty = generateProps([
    'sqft',
    'yrBuilt',
    'propTypeValue',
    'area',
    'areaParameter'
  ])
  // const data = await handleApi('/value/marketanalysis')
  return {
    subjectProperty,
    daysData: daysData(),
    soldDaysData: soldData(),
    marketListings: listings()
  }
}

export type IFilteredMarketAnalysisFilters = Pick<
  IResults,
  'propTypeValue' | 'sqft' | 'yrBuilt' | 'compTypeValue'
> & {
  minSqft: number
  maxSqft: number
  minYear: number
  maxYear: number
  minBed: number
  maxBed: number
  area: string
  areaParameter: string
}

interface IFilteredMarketAnalysisDepressedMarketGrid {
  category: string
  listingsCount: number
  listingsPercent: number
  pendingsCount: number
  pendingsPercent: number
  soldsCount: number
  soldsPercent: number
}

interface IFilteredMarketAnalysisData {
  subjectProperty: IFilteredMarketAnalysisFilters
  daysData: IDaysData[]
  soldDaysData: ISoldDaysData[]
  depressedMarket: IFilteredMarketAnalysisDepressedMarketGrid[]
  marketListings: IMarketListings
}

export const getFilteredMarketAnalysisData = async (
  ordersId: number
): Promise<IFilteredMarketAnalysisData> => {
  // const data = await handleApi('/value/filteredmarketanalysis')
  const subjectProperty: IFilteredMarketAnalysisFilters = generateProps([
    'minSqft',
    'maxSqft',
    'minYear',
    'maxYear',
    'minBed',
    'maxBed',
    'compTypeValue',
    'sqft',
    'propTypeValue',
    'area',
    'areaParameter',
    'yrBuilt'
  ])
  return {
    subjectProperty,
    daysData: daysData(),
    soldDaysData: soldData(),
    depressedMarket: depressedMarket(),
    marketListings: listings()
  }
}

export interface IMedianSalePrice {
  oneMonth: {
    contractDate: string
    numberPendings: number
    numberSales: number
    medianValue: number
  }[]
  twoMonths: {
    contractDate: string
    numberSales: number
    medianValue: number
  }[]
  threeMonths: {
    contractDate: string
    numberSales: number
    medianValue: number
  }[]
}

export const getMedianSalePrice = async (
  ordersId: number
): Promise<IMedianSalePrice> => {
  // const data = await handleApi('/value/mediansaleprice')
  return {
    oneMonth: medianSaleData(),
    twoMonths: medianSaleData(),
    threeMonths: medianSaleData()
  }
}

const daysData = () => {
  return [
    {
      days: 'Total # of Sales (Solds)',
      '0-90': faker.random.number({ min: 10, max: 25 }),
      '91-180': faker.random.number({ min: 10, max: 25 }),
      '180-270': faker.random.number({ min: 10, max: 25 }),
      '271-365': faker.random.number({ min: 10, max: 25 })
    },
    {
      days: 'Absorption Rate (Sales per Month)',
      '0-90': +faker.finance.amount(3, 8, 2),
      '91-180': +faker.finance.amount(3, 8, 2),
      '180-270': +faker.finance.amount(3, 8, 2),
      '271-365': +faker.finance.amount(3, 8, 2)
    },
    {
      days: 'Inventory (Listings & Pendings)',
      '0-90': faker.random.number({ min: 10, max: 25 }),
      '91-180': faker.random.number({ min: 10, max: 25 }),
      '180-270': faker.random.number({ min: 10, max: 25 }),
      '271-365': faker.random.number({ min: 10, max: 25 })
    },
    {
      days: 'Months Supply',
      '0-90': +faker.finance.amount(0.2, 0.8, 2),
      '91-180': +faker.finance.amount(0.2, 0.8, 2),
      '180-270': +faker.finance.amount(0.2, 0.8, 2),
      '271-365': +faker.finance.amount(0.2, 0.8, 2)
    }
  ]
}
const soldData = () => [
  {
    category: 'Low',
    active: faker.random.number({ max: 4000, min: 2000 }),
    pending: null,
    '0-90': faker.random.number({ max: 4000, min: 1500 }),
    '91-180': faker.random.number({ max: 4000, min: 1500 }),
    '180-270': faker.random.number({ max: 4000, min: 1500 }),
    '271-365': faker.random.number({ max: 4000, min: 1500 })
  },
  {
    category: 'High',
    active: faker.random.number({ max: 4000, min: 2000 }),
    pending: null,
    '0-90': faker.random.number({ max: 4000, min: 1500 }),
    '91-180': faker.random.number({ max: 4000, min: 1500 }),
    '180-270': faker.random.number({ max: 4000, min: 1500 }),
    '271-365': faker.random.number({ max: 4000, min: 1500 })
  },
  {
    category: 'Median',
    active: faker.random.number({ max: 4000, min: 2000 }),
    pending: null,
    '0-90': faker.random.number({ max: 4000, min: 1500 }),
    '91-180': faker.random.number({ max: 4000, min: 1500 }),
    '180-270': faker.random.number({ max: 4000, min: 1500 }),
    '271-365': faker.random.number({ max: 4000, min: 1500 })
  },
  {
    category: 'Average',
    active: faker.random.number({ max: 4000, min: 2000 }),
    pending: null,
    '0-90': faker.random.number({ max: 4000, min: 1500 }),
    '91-180': faker.random.number({ max: 4000, min: 1500 }),
    '180-270': faker.random.number({ max: 4000, min: 1500 }),
    '271-365': faker.random.number({ max: 4000, min: 1500 })
  },
  {
    category: 'Median DOM',
    active: faker.random.number({ max: 40, min: 10 }),
    pending: null,
    '0-90': faker.random.number({ max: 40, min: 10 }),
    '91-180': faker.random.number({ max: 40, min: 10 }),
    '180-270': faker.random.number({ max: 40, min: 10 }),
    '271-365': faker.random.number({ max: 40, min: 10 })
  }
]
const listings = () => ({
  activeListings: faker.random.number(6),
  pendings: faker.random.number(3),
  finalListPrice: {
    '0-90': +faker.finance.amount(0.9, 1, 4),
    '91-180': +faker.finance.amount(0.9, 1, 4),
    '180-270': +faker.finance.amount(0.9, 1, 4),
    '271-365': +faker.finance.amount(0.9, 1, 4)
  },
  originalListPrice: {
    '0-90': +faker.finance.amount(0.9, 1, 4),
    '91-180': +faker.finance.amount(0.9, 1, 4),
    '180-270': +faker.finance.amount(0.9, 1, 4),
    '271-365': +faker.finance.amount(0.9, 1, 4)
  }
})
const depressedMarket = () => [
  {
    category: 'Retail',
    listingsCount: faker.random.number(10),
    listingsPercent: +faker.finance.amount(0, 1, 4),
    pendingsCount: faker.random.number(5),
    pendingsPercent: +faker.finance.amount(0, 1, 4),
    soldsCount: faker.random.number(100),
    soldsPercent: +faker.finance.amount(0, 1, 4)
  },
  {
    category: 'Short Sale',
    listingsCount: faker.random.number(10),
    listingsPercent: +faker.finance.amount(0, 1, 4),
    pendingsCount: faker.random.number(5),
    pendingsPercent: +faker.finance.amount(0, 1, 4),
    soldsCount: faker.random.number(100),
    soldsPercent: +faker.finance.amount(0, 1, 4)
  },
  {
    category: 'REO',
    listingsCount: faker.random.number(10),
    listingsPercent: +faker.finance.amount(0, 1, 4),
    pendingsCount: faker.random.number(5),
    pendingsPercent: +faker.finance.amount(0, 1, 4),
    soldsCount: faker.random.number(100),
    soldsPercent: +faker.finance.amount(0, 1, 4)
  }
]
const medianSaleData = () => {
  const data = []

  for (let i = 0; i < 12; i++) {
    const date = new Date()
    date.setMonth(i)
    date.setDate(1)
    const contractDate = `${date.toLocaleString('en-US', {
      month: 'short'
    })}-${date.toLocaleString('en-US', { year: '2-digit' })}`
    data.push({
      contractDate,
      numberPendings: faker.random.number(5),
      numberSales: faker.random.number(20),
      medianValue: faker.random.number({ min: 300000, max: 700000 })
    })
  }
  return data
}

export type IFlipProperty = Pick<
  IResults,
  | 'resultsId'
  | 'address'
  | 'city'
  | 'zip'
  | 'bed'
  | 'bath'
  | 'sqft'
  | 'garage'
  | 'lotSize'
  | 'yrBuilt'
  | 'proximity'
  | 'lat'
  | 'lng'
> & {
  coe1SoldDate: string
  coe1SoldPrice: number
  coe2SoldDate: string
  coe2SoldPrice: number
  daysFromFlip: number
  rank: number
}

export interface FlipAnalysisInterface {
  flipSoldAnalysis: {
    report: string
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }[]
  flipRentedAnalysis: {
    report: string
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }[]
  flipSold: IFlipProperty[]
  flipForSale: IFlipProperty[]
  flipRented: IFlipProperty[]
  flipForRent: IFlipProperty[]
}

export const getFlipAnalysis = async (
  ordersId: number
): Promise<FlipAnalysisInterface> => {
  const flipSoldAnalysis = [
    'Number of Sold Flips',
    'Average Sold Price',
    'Avg. % Change of Sold Prices',
    'Pre-Flip Low Sold',
    'Pre-Flip High Sold',
    'Post-Flip Low Sold',
    'Post-Flip High Sold',
    'Smallest Price Difference',
    'Largest Price Difference'
  ]
  const flipRentAnalysis = [
    'Number of Rental Flips',
    'Average Sold Price',
    'Avg Cap Ex',
    'Avg Rent per SqFt',
    'Low Rent',
    'High Rent',
    'Avg Gross Rent Multiplier',
    'Lowest GRM',
    'Highest GRM'
  ]
  const generateFlip = (report: string) => {
    return report.includes('Number')
      ? faker.random.number(5)
      : report.includes('%') || report.includes('Cap')
      ? +faker.finance.amount(0.1, 0.4, 4)
      : report.includes('Difference') || report.includes('GRM')
      ? faker.random.number({ min: 10000, max: 100000 })
      : faker.random.number({ min: 100000, max: 500000 })
  }
  return {
    flipSoldAnalysis: flipSoldAnalysis.map(report => ({
      report,
      '0-90': generateFlip(report),
      '91-180': generateFlip(report),
      '180-270': generateFlip(report),
      '271-365': generateFlip(report)
    })),
    flipRentedAnalysis: flipRentAnalysis.map(report => ({
      report,
      '0-90': generateFlip(report),
      '91-180': generateFlip(report),
      '180-270': generateFlip(report),
      '271-365': generateFlip(report)
    })),
    flipSold: generateProperties(),
    flipForSale: generateProperties(),
    flipRented: generateProperties(),
    flipForRent: generateProperties()
  }
}

const generateProperties = (): IFlipProperty[] => {
  const data: IFlipProperty[] = []
  for (let i = 1; i <= 5; i++) {
    const obj = generateProps([
      'address',
      'bath',
      'bed',
      'city',
      'garage',
      'resultsId',
      'lotSize',
      'sqft',
      'yrBuilt',
      'zip',
      'proximity',
      'coe1SoldDate',
      'coe1SoldPrice',
      'coe2SoldDate',
      'coe2SoldPrice',
      'daysFromFlip',
      'lat',
      'lng'
    ])
    data.push({
      ...obj,
      rank: i
    })
  }
  return data
}
