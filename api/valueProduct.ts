import { Option } from 'api'
import faker from 'faker'

export interface PropertyInterface {
  actDom: number
  address: string
  agSqft: number
  area: string
  areaParameter: string
  asOfDate: string
  basement: string
  bath: number
  bed: number
  calculatedPrice: number
  changeDate: string
  city: string
  coeDate: string
  coePrice: number
  coe2Date: string
  coe2Price: number
  compsGoingBack: string
  concessions: number
  cumulativeListDays: number
  daysFromFlip: number
  description: string
  distressed: boolean
  distressedMarket: number
  dnaSource: string
  exportMls: boolean
  garage: number
  geoAccuracy: string
  id: string
  lat: number
  listingDate: string
  listingNumber: string
  listingSheetSelected: boolean
  listingPrice: number
  listingPricePerSqft: number
  lng: number
  lock: boolean
  loanNumber: string
  lotSize: number
  marketArea: string
  mlsName: string
  mlsComments: string
  order: number
  pool: string
  photos: string[]
  poolName: string
  propertyType: string
  reo: boolean
  retailMarket: number
  rivDate: string
  saleType: string
  schoolDistrict: string
  showMls: boolean
  soldPrice: number
  source: string
  sqft: number
  sqftPrice: number
  state: string
  status: string
  subdivision: string
  summaryComments: string
  targetDistance: number
  totalSqft: number
  totDom: number
  units: number
  valuationPercent: number
  waterfront: string
  yearBuilt: number
  zip: string
}

export const getPropertyInfo = async (
  propertyId: string
): Promise<PropertyInterface> => {
  const properties = generateProperties(1)
  properties[0].id = propertyId
  return properties[0]
}

interface DaysTable {
  days: string
  '0-90': number
  '91-180': number
  '180-270': number
  '271-365': number
}

const daysData = () => [
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

export const getMarketAnalysisDays = async (
  propertyId: string
): Promise<DaysTable[]> => {
  return daysData()
}

export const getFilteredMarketAnalysisDays = async (
  propertyId: string
): Promise<DaysTable[]> => {
  return daysData()
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

interface SoldDaysTable {
  category: string
  active: number
  pending: number
  '0-90': number
  '91-180': number
  '180-270': number
  '271-365': number
}

export const getMarketAnalysisSoldDays = async (
  propertyId: string
): Promise<SoldDaysTable[]> => {
  return soldData()
}
export const getFilteredMarketAnalysisSoldDays = async (
  propertyId: string
): Promise<SoldDaysTable[]> => {
  return soldData()
}

export interface MarketListings {
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

export const getMarketAnalysisListings = async (
  propertyId: string
): Promise<MarketListings> => {
  return listings()
}

export const getFilteredMarketAnalysisListings = async (
  propertyId: string
): Promise<MarketListings> => {
  return listings()
}

export interface FilteredMarketAnalysisFilters {
  minSqft: number
  maxSqft: number
  minYrBlt: number
  maxYrBlt: number
  propertyType: string
  minBed: number
  maxBed: number
  comparableType: string
}

export const getFilteredMarketAnalysisFilters = async (
  propertyId: string
): Promise<FilteredMarketAnalysisFilters> => {
  return {
    minSqft: faker.random.number({ min: 2000, max: 3000 }),
    maxSqft: faker.random.number({ min: 4000, max: 5000 }),
    minYrBlt: faker.random.number({ min: 1950, max: 1999 }),
    maxYrBlt: faker.random.number({ min: 2000, max: 2020 }),
    propertyType: 'Default',
    minBed: faker.random.number({ min: 1, max: 3 }),
    maxBed: faker.random.number({ min: 4, max: 6 }),
    comparableType: 'All'
  }
}

interface FilteredMarketAnalysisDepressedMarketGrid {
  category: string
  listingsCount: number
  listingsPercent: number
  pendingsCount: number
  pendingsPercent: number
  soldsCount: number
  soldsPercent: number
}

export const getFilteredMarketAnalysisDepressedMarketGrid = async (
  propertyId: string
): Promise<FilteredMarketAnalysisDepressedMarketGrid[]> => {
  return [
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
}

export interface MedianSalePriceInterface {
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
  propertyId: string
): Promise<MedianSalePriceInterface> => {
  return {
    oneMonth: [
      {
        contractDate: 'Jan-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      }
    ],
    twoMonths: [
      {
        contractDate: 'Dec - Jan-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan - Feb-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb - Mar-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar - Apr-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr - May-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May - Jun-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun - Jul-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul - Aug-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug - Sep-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep - Oct-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct - Nov-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov - Dec-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec - Jan-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan - Feb-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb - Mar-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar - Apr-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr - May-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May - Jun-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun - Jul-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul - Aug-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug - Sep-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep - Oct-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct - Nov-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov - Dec-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      }
    ],
    threeMonths: [
      {
        contractDate: 'Nov - Jan-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec - Feb-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan - Mar-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb - Apr-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar - May-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr - Jun-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May - Jul-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun - Aug-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul - Sep-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug - Oct-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep - Nov-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct - Dec-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov - Jan-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec - Feb-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan - Mar-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb - Apr-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar - May-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr - Jun-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May - Jul-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun - Aug-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul - Sep-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug - Oct-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep - Nov-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct - Dec-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      }
    ]
  }
}

const generatePropertyPhotos = (): string[] => {
  const data = []
  const property = faker.random.arrayElement([
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Boyds/20841/1665-MDMC682440-20191007-14410-Foolish-Pleasure',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Boyds/20841/1665-MDMC676350-20190901-18410-Polynesian-Lane',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Boyds/20841/1665-MDMC686430-20191107-18500-Crossview-Road',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC689800-20200105-18318-Bailiwick-Place',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Boyds/20841/1665-MDMC688114-20191122-18214-Endora-Circle',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC684706-20191023-13855-Bailiwick-Terrace',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC623212-20190311-2-Sanderling-Court',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC676344-20190921-13525-Sanderling-Place',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-1006570122-20180924-19061-Highstream-Drive',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC672942-20190806-18878-Mcfarlin-Drive'
  ])
  for (let i = 0; i < 20; i++) {
    data.push(`${property}-${i}.jpg`)
  }
  return data
}

export const generateProperties = (num = 15): PropertyInterface[] => {
  const data: PropertyInterface[] = []
  for (let i = 1; i <= num; i++) {
    data.push({
      actDom: faker.random.number({ min: 5, max: 300 }),
      address: faker.address.streetAddress(),
      agSqft: faker.random.number({ min: 2000, max: 5000 }),
      area: 'Default',
      areaParameter: null,
      asOfDate: faker.date
        .between('2020-01-01', '2020-12-31')
        .toLocaleDateString(),
      basement: faker.random.arrayElement(['Yes', 'Full', 'No']),
      bath: faker.random.number({ min: 2, max: 3 }),
      bed: faker.random.number({ min: 4, max: 5 }),
      calculatedPrice: faker.random.number({ min: 500000, max: 700000 }),
      city: faker.address.city(),
      changeDate: faker.date
        .between('2020-01-01', '2020-12-31')
        .toLocaleDateString(),
      coeDate: faker.date
        .between('2020-01-01', '2020-12-31')
        .toLocaleDateString(),
      coePrice: faker.random.number({ min: 500000, max: 600000 }),
      coe2Date: faker.date
        .between('2020-01-01', '2020-12-31')
        .toLocaleDateString(),
      coe2Price: faker.random.number({ min: 500000, max: 600000 }),
      compsGoingBack: '3 months',
      concessions: faker.random.number({ min: 10000, max: 20000 }),
      cumulativeListDays: faker.random.number(200),
      daysFromFlip: faker.random.number({ min: 10, max: 50 }),
      description: faker.lorem.paragraph(5),
      distressed: faker.random.boolean(),
      distressedMarket: +faker.finance.amount(0.4, 0.9, 4),
      dnaSource: 'User',
      exportMls: false,
      garage: faker.random.number(2),
      geoAccuracy: 'PREMISE LEVEl. Excellent',
      id: `${faker.random.number({
        min: 20000000,
        max: 50000000
      })}-${faker.random.number({ min: 1, max: 9 })}`,
      lat: +faker.address.latitude(39.050498, 39.057319),
      listingDate: faker.date
        .between('2020-01-01', '2020-12-31')
        .toLocaleDateString(),
      listingNumber: `MDMC${faker.random.number({ min: 645679, max: 698371 })}`,
      listingSheetSelected: false,
      listingPrice: faker.random.number({ min: 500000, max: 600000 }),
      listingPricePerSqft: faker.random.number({ min: 2000, max: 5000 }),
      lng: +faker.address.longitude(-77.224241, -77.243871),
      lock: faker.random.boolean(),
      loanNumber: 'test',
      lotSize: +faker.finance.amount(0, 1, 2),
      marketArea: 'Radian Interactive Value Default - 1 mile',
      mlsName: faker.company.companyName(),
      mlsComments: faker.lorem.paragraph(10),
      order: i,
      pool: faker.random.arrayElement(['Community', 'None']),
      poolName: 'DEFAULT',
      photos: generatePropertyPhotos(),
      propertyType: faker.random.arrayElement([
        'Single Family',
        'Multi Family',
        'Duplex'
      ]),
      reo: faker.random.boolean(),
      retailMarket: +faker.finance.amount(0.4, 0.9, 4),
      rivDate: faker.date
        .between('2020-01-01', '2020-12-31')
        .toLocaleDateString(),
      saleType: faker.random.arrayElement(['Retail', 'Commercial']),
      schoolDistrict: `${faker.address.county()} County Public Schools`,
      showMls: faker.random.boolean(),
      soldPrice: faker.random.number({ min: 500000, max: 600000 }),
      source: faker.random.arrayElement([
        'User',
        'Appraisal',
        'MLS',
        'Estimated',
        'Public Record APM: 17-0155-003-005-3'
      ]),
      sqft: faker.random.number({ min: 2000, max: 5000 }),
      sqftPrice: +faker.finance.amount(100, 300, 2),
      subdivision: `${faker.commerce.productMaterial()} ${faker.commerce.product()} Village`,
      summaryComments: faker.lorem.paragraph(5),
      state: faker.address.stateAbbr(),
      status: faker.random.arrayElement([
        'Sold',
        'Under Contract',
        'Price Change',
        'Listed'
      ]),
      targetDistance: +faker.finance.amount(0.4, 0.9, 2),
      totalSqft: faker.random.number({ min: 2000, max: 5000 }),
      totDom: faker.random.number({ min: 5, max: 300 }),
      units: faker.random.number({ min: 1, max: 5 }),
      valuationPercent: +faker.finance.amount(0, 1, 2),
      waterfront: 'Water Oriented: No',
      yearBuilt: faker.random.number({ min: 1980, max: 2010 }),
      zip: faker.address.zipCode('#####')
    })
  }
  return data
}

export const getSoldProperties = async (
  propertyId: string
): Promise<PropertyInterface[]> => {
  return generateProperties()
}
export const getListedProperties = async (
  propertyId: string
): Promise<PropertyInterface[]> => {
  return generateProperties()
}
export const getContractProperties = async (
  propertyId: string
): Promise<PropertyInterface[]> => {
  return generateProperties()
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
  flipSold: PropertyInterface[]
  flipForSale: PropertyInterface[]
  flipRented: PropertyInterface[]
  flipForRent: PropertyInterface[]
}

export const getFlipAnalysis = async (
  propertyId: string
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
    flipSold: generateProperties(5),
    flipForSale: generateProperties(5),
    flipRented: generateProperties(5),
    flipForRent: generateProperties(5)
  }
}
interface ExportForm {
  subjectPhotosType: string
  subjectListingSheets: boolean
  comparableType: string
  selectedCompPhotosType: string | null
  selectedCompListingSheets: boolean
  allCompPhotosType: string | null
  allCompListingSheets: boolean
  uncheckedManualComparables: boolean
}

export const exportPdf = async (
  emailList: string[],
  exportForm: ExportForm
): Promise<string> => {
  return 'Request Submitted!'
}

export const getListingHistory = async (
  propertyId: string
): Promise<PropertyInterface[]> => {
  return generateProperties(10)
}
export const getPropertyTypeOptions = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'Single Family',
      value: 'Single Family'
    },
    {
      label: 'Multi Family',
      value: 'Multi Family'
    },
    {
      label: 'Duplex',
      value: 'Duplex'
    }
  ]
  return options
}

export const getMonthsBackOptions = async (): Promise<Option[]> => {
  const options = [
    {
      label: '3 months',
      value: '3 months'
    },
    {
      label: '6 months',
      value: '6 months'
    },
    {
      label: '12 months',
      value: '12 months'
    }
  ]
  return options
}

export interface PropertyCharacteristics {
  source: string
  bed: number
  bath: number
  sqft: number
  units: number
  garage: number
  lotSize: number
  yearBuilt: number
}

export const getPropertyCharacteristicsSources = async (): Promise<
  PropertyCharacteristics[]
> => {
  const sources = [
    {
      source: 'MLS',
      bed: null,
      bath: 3,
      sqft: null,
      units: 4,
      garage: 2,
      lotSize: 2.5,
      yearBuilt: 1995
    },
    {
      source: 'Public Record APM: 17-0155-003-005-3',
      bed: 4,
      bath: 3,
      sqft: 2100,
      units: 4,
      garage: 2,
      lotSize: 2.5,
      yearBuilt: 1995
    },
    {
      source: 'Estimated',
      bed: 4,
      bath: 3,
      sqft: null,
      units: 1,
      garage: null,
      lotSize: 2.5,
      yearBuilt: 1995
    }
  ]

  return sources
}

export const changePropertyCharacteristics = async (
  propertyInfo: PropertyInterface
): Promise<PropertyInterface> => {
  return propertyInfo
}

interface UploadFileInterface {
  filename: string
  file: File
}

export const uploadAdditionalDocuments = async (
  uploadForm: UploadFileInterface
): Promise<string> => {
  return 'File succesfully uploaded.'
}
